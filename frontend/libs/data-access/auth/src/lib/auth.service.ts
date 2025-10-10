import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../models/src/lib/models';
import { Router } from '@angular/router';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_BASE_URL = 'https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net/api/v1'; // Using the API_URL_BASE from environment
  private readonly TOKEN_KEY = 'p4-auth-token';
  private readonly REFRESH_TOKEN_KEY = 'p4-refresh-token';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      // In a real implementation, we would decode the JWT to get user info
      // For now, we'll retrieve the user from the /me endpoint if token exists
      this.fetchCurrentUser().subscribe();
    }
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; user?: User; error?: string }> {
    // Note: In a real implementation, we would send credentials to the backend
    // For now, we'll simulate the authentication process
    return this.http.post<{ token: string; refreshToken: string }>(`${this.API_BASE_URL}/auth/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setTokens(response.token, response.refreshToken);
          // Fetch user details after successful login
          this.fetchCurrentUser().subscribe();
        }
      }),
      map(response => ({ success: !!response.token })),
      catchError(error => {
        console.error('Login error:', error);
        return of({ success: false, error: error.message || 'Login failed' });
      })
    );
  }

  register(credentials: RegisterCredentials): Observable<{ success: boolean; user?: User; error?: string }> {
    return this.http.post<User>(`${this.API_BASE_URL}/auth/register`, credentials).pipe(
      tap(user => {
        if (user) {
          this.currentUserSubject.next(user);
        }
      }),
      map(user => ({ success: !!user, user })),
      catchError(error => {
        console.error('Registration error:', error);
        return of({ success: false, error: error.message || 'Registration failed' });
      })
    );
  }

  logout(): void {
    // Clear tokens from storage
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    
    // Clear user from memory
    this.currentUserSubject.next(null);
    
    // Navigate to login page or home page
    this.router.navigate(['/']).then();
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<boolean> {
    return this.http.post(`${this.API_BASE_URL}/auth/forgot-password`, request, { responseType: 'text' }).pipe(
      map(() => true),
      catchError(error => {
        console.error('Forgot password error:', error);
        return of(false);
      })
    );
  }

  resetPassword(request: ResetPasswordRequest): Observable<boolean> {
    return this.http.post(`${this.API_BASE_URL}/auth/reset-password`, request, { responseType: 'text' }).pipe(
      map(() => true),
      catchError(error => {
        console.error('Reset password error:', error);
        return of(false);
      })
    );
  }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_BASE_URL}/auth/me`, { headers: this.getAuthHeaders() }).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        // If the token is invalid, logout the user
        if (error.status === 401) {
          this.logout();
        }
        return throwError(() => error);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.roles.includes(role) : false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;
    
    return roles.some(role => user.roles.includes(role));
  }

  hasPermission(permission: string): boolean {
    // In a real implementation, this would check permissions from the user's roles
    // For now, we'll just return true for demo purposes
    return this.isAuthenticated();
  }
}