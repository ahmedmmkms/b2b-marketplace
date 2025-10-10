// src/app/core/performance/performance-monitoring.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface PerformanceMetric {
  metricId: string;
  timestamp: Date;
  duration: number; // in milliseconds
  context: string; // e.g., 'search', 'page-load', 'api-call'
  tags?: string[]; // Additional tags for categorization
}

export interface PerformanceReport {
  metricId: string;
  p50: number; // median
  p95: number; // 95th percentile
  p99: number; // 99th percentile
  min: number;
  max: number;
  count: number;
  periodStart: Date;
  periodEnd: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {
  private metrics: PerformanceMetric[] = [];
  private readonly API_ENDPOINT = '/api/performance/metrics'; // Backend endpoint to store metrics
  
  constructor(private http: HttpClient) {}

  /**
   * Measure the performance of a function
   */
  public measure<T>(metricId: string, context: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;

    this.recordMetric({
      metricId,
      timestamp: new Date(),
      duration,
      context
    });

    return result;
  }

  /**
   * Measure async function performance
   */
  public measureAsync<T>(metricId: string, context: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    
    return fn().then(result => {
      const end = performance.now();
      const duration = end - start;

      this.recordMetric({
        metricId,
        timestamp: new Date(),
        duration,
        context
      });

      return result;
    });
  }

  /**
   * Measure Observable performance
   */
  public measureObservable<T>(metricId: string, context: string, observable: Observable<T>): Observable<T> {
    const start = performance.now();
    
    return observable.pipe(
      map(result => {
        const end = performance.now();
        const duration = end - start;

        this.recordMetric({
          metricId,
          timestamp: new Date(),
          duration,
          context
        });

        return result;
      }),
      catchError(error => {
        const end = performance.now();
        const duration = end - start;

        this.recordMetric({
          metricId,
          timestamp: new Date(),
          duration,
          context
        });

        throw error;
      })
    );
  }

  /**
   * Record a performance metric
   */
  public recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);
    
    // Enhanced logging for debugging
    console.log('DEBUG: Recording performance metric:', {
      metricId: metric.metricId,
      duration: metric.duration,
      context: metric.context,
      timestamp: metric.timestamp
    });
    
    // In a real app, we would also send this to a backend service
    this.sendMetricToBackend(metric).subscribe({
      next: (response) => console.log('DEBUG: Performance metric sent successfully', { metricId: metric.metricId, response }),
      error: (error) => console.error('DEBUG: Failed to send performance metric', { metricId: metric.metricId, error })
    });
  }

  /**
   * Send metric to backend service
   */
  private sendMetricToBackend(metric: PerformanceMetric): Observable<any> {
    // In a real implementation, this would send to a performance monitoring backend
    // For now, we'll just return a mock response
    return this.http.post(this.API_ENDPOINT, {
      ...metric,
      timestamp: metric.timestamp.toISOString()
    }).pipe(
      catchError(() => {
        console.error('Failed to send metric to backend, storing locally');
        return of(null);
      })
    );
  }

  /**
   * Calculate percentile for metrics
   */
  private calculatePercentile(values: number[], percentile: number): number {
    if (values.length === 0) return 0;
    
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil(percentile / 100 * sorted.length) - 1;
    return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
  }

  /**
   * Get performance report for a specific metric
   */
  public getPerformanceReport(metricId: string, daysBack: number = 7): PerformanceReport | null {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);

    const relevantMetrics = this.metrics
      .filter(m => m.metricId === metricId && m.timestamp >= cutoffDate);

    if (relevantMetrics.length === 0) {
      return null;
    }

    const durations = relevantMetrics.map(m => m.duration);
    const sortedDurations = durations.sort((a, b) => a - b);

    return {
      metricId,
      p50: this.calculatePercentile(durations, 50),
      p95: this.calculatePercentile(durations, 95),
      p99: this.calculatePercentile(durations, 99),
      min: Math.min(...durations),
      max: Math.max(...durations),
      count: durations.length,
      periodStart: cutoffDate,
      periodEnd: new Date()
    };
  }

  /**
   * Check if search performance meets the requirement (p95 < 500ms)
   */
  public validateSearchPerformance(): boolean {
    const report = this.getPerformanceReport('search');
    if (!report) {
      console.warn('No search performance data available');
      return false;
    }
    
    const isAcceptable = report.p95 < 500; // Less than 500ms for p95
    console.log(`Search performance p95: ${report.p95}ms - Acceptable: ${isAcceptable}`);
    
    return isAcceptable;
  }

  /**
   * Get all metrics for debugging
   */
  public getAllMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Clear all stored metrics
   */
  public clearMetrics(): void {
    this.metrics = [];
  }
}