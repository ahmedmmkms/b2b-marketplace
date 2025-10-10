// src/app/core/analytics/analytics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// For standalone Angular apps, we can define environment-like constants directly
const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AnalyticsEvent {
  eventId: string;
  eventType: string; // 'search', 'filter', 'page_view', 'click', etc.
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  properties: { [key: string]: any }; // Additional event-specific data
  url?: string;
  referrer?: string;
}

export interface SearchEvent extends AnalyticsEvent {
  properties: {
    query: string;
    resultsCount: number;
    filters?: { [key: string]: any };
    duration?: number;
  };
}

export interface FilterEvent extends AnalyticsEvent {
  properties: {
    filterType: string;
    filterValue: string | string[];
    resultsCountAfterFilter: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly API_ENDPOINT = environment.apiUrl + '/analytics/events'; // Backend endpoint to send events
  private sessionId: string;
  private userId?: string;

  constructor(private http: HttpClient, private router: Router) {
    this.sessionId = this.generateSessionId();
    this.setupRouterListener();
  }

  /**
   * Track a generic event
   */
  public trackEvent<T extends AnalyticsEvent>(event: Omit<T, 'eventId' | 'timestamp' | 'sessionId' | 'url' | 'referrer'>): void {
    const fullEvent: AnalyticsEvent = {
      ...event as any,
      eventId: this.generateEventId(),
      timestamp: new Date(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href,
      referrer: document.referrer
    };

    // Enhanced logging for debugging
    console.log('DEBUG: Tracking analytics event:', {
      eventType: fullEvent.eventType,
      eventId: fullEvent.eventId,
      sessionId: fullEvent.sessionId,
      timestamp: fullEvent.timestamp,
      properties: fullEvent.properties
    });

    if (environment.production) {
      this.sendEventToBackend(fullEvent).subscribe({
        next: (response) => console.log('DEBUG: Analytics event sent successfully', { eventId: fullEvent.eventId, response }),
        error: (error) => console.error('DEBUG: Failed to send analytics event', { eventId: fullEvent.eventId, error })
      });
    } else {
      // Still send in development for testing
      this.sendEventToBackend(fullEvent).subscribe({
        next: (response) => console.log('DEBUG: Analytics event sent in development mode', { eventId: fullEvent.eventId, response }),
        error: (error) => console.error('DEBUG: Failed to send analytics event in development', { eventId: fullEvent.eventId, error })
      });
    }
  }

  /**
   * Track a search event
   */
  public trackSearch(query: string, resultsCount: number, filters?: { [key: string]: any }, duration?: number): void {
    const searchEvent: Partial<SearchEvent> = {
      eventType: 'search',
      properties: {
        query,
        resultsCount,
        filters,
        duration
      }
    };

    this.trackEvent(searchEvent as any);
  }

  /**
   * Track a filter event
   */
  public trackFilter(filterType: string, filterValue: string | string[], resultsCountAfterFilter: number): void {
    const filterEvent: Partial<FilterEvent> = {
      eventType: 'filter',
      properties: {
        filterType,
        filterValue,
        resultsCountAfterFilter
      }
    };

    this.trackEvent(filterEvent as any);
  }

  /**
   * Track a page view event
   */
  public trackPageView(): void {
    const event: Partial<AnalyticsEvent> = {
      eventType: 'page_view',
      properties: {
        url: this.router.url
      }
    };

    this.trackEvent(event as any);
  }

  /**
   * Track a click event
   */
  public trackClick(elementId: string, elementName?: string): void {
    const event: Partial<AnalyticsEvent> = {
      eventType: 'click',
      properties: {
        elementId,
        elementName
      }
    };

    this.trackEvent(event as any);
  }

  /**
   * Set the current user ID (for logged in users)
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Get current session ID
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Send event to backend analytics service
   */
  private sendEventToBackend(event: AnalyticsEvent): Observable<any> {
    // In a real app, this would send to an analytics backend
    // For now, we'll return a mock response
    return this.http.post(this.API_ENDPOINT, {
      ...event,
      timestamp: event.timestamp.toISOString()
    }).pipe(
      catchError(error => {
        console.error('Failed to send analytics event', error);
        return of(null);
      })
    );
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return 'session_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  /**
   * Generate a unique event ID
   */
  private generateEventId(): string {
    return 'event_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Listen to router events to track page views
   */
  private setupRouterListener(): void {
    this.router.events.subscribe(event => {
      // We could track page views here, but we'll do it explicitly in components
      // to have more control over when to track
    });
  }
}