import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rfq, RfqLine, PaginatedResponse, PaginationParams } from '../../models/src/lib/models';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class RfqService extends BaseApiService {

  /**
   * Create a new RFQ
   */
  createRfq(rfq: Partial<Rfq>): Observable<Rfq> {
    // In a real implementation, this would call the generated OpenAPI client
    // e.g., this.rfqOpenApiService.createRfq(rfq)
    
    return this.post<Rfq>(`/rfq`, rfq).pipe(
      catchError(error => {
        console.error('Error creating RFQ:', error);
        throw error;
      })
    );
  }

  /**
   * Get RFQs for the current user
   */
  getUserRfqs(pagination?: PaginationParams): Observable<PaginatedResponse<Rfq>> {
    const params: any = {};
    if (pagination?.pageKey) params.pageKey = pagination.pageKey;
    if (pagination?.limit) params.limit = pagination.limit;
    
    return this.get<{ data: Rfq[], hasNext: boolean, nextKey?: string }>(`/rfq/user`, params).pipe(
      catchError(error => {
        console.error('Error fetching user RFQs:', error);
        return of({ data: [], hasNext: false });
      })
    );
  }

  /**
   * Get a specific RFQ by ID
   */
  getRfq(id: string): Observable<Rfq> {
    return this.get<Rfq>(`/rfq/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching RFQ ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Submit an RFQ
   */
  submitRfq(id: string): Observable<Rfq> {
    return this.put<Rfq>(`/rfq/${id}/submit`, {}).pipe(
      catchError(error => {
        console.error(`Error submitting RFQ ${id}:`, error);
        throw error;
      })
    );
  }
}