import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../auth/src/lib/auth.service';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiListResponse<T> {
  data: T[];
  pagination: {
    hasNext: boolean;
    nextKey?: string;
  };
  message?: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected readonly API_BASE_URL = 'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/v1';

  constructor(
    protected http: HttpClient,
    protected authService: AuthService
  ) {}

  protected getAuthHeaders() {
    // Implementation will vary based on your auth system
    return this.authService.getAuthHeaders ? this.authService.getAuthHeaders() : {};
  }

  protected handleApiError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  protected buildParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value);
      }
    });
    
    return httpParams;
  }

  protected get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    const url = `${this.API_BASE_URL}${endpoint}`;
    const options = params ? { params: this.buildParams(params), headers: this.getAuthHeaders() } : { headers: this.getAuthHeaders() };
    
    return this.http.get<T>(url, options).pipe(
      catchError(this.handleApiError)
    );
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_BASE_URL}${endpoint}`;
    return this.http.post<T>(url, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleApiError)
    );
  }

  protected put<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_BASE_URL}${endpoint}`;
    return this.http.put<T>(url, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleApiError)
    );
  }

  protected delete<T>(endpoint: string): Observable<T> {
    const url = `${this.API_BASE_URL}${endpoint}`;
    return this.http.delete<T>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleApiError)
    );
  }
}