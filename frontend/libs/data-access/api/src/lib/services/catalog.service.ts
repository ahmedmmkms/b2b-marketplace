import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, PaginatedResponse, PaginationParams } from '../../models/src/lib/models';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService extends BaseApiService {

  /**
   * Search for products with pagination
   * This is a mock implementation showing how the OpenAPI client would be used
   */
  searchProducts(
    query?: string, 
    pagination?: PaginationParams
  ): Observable<PaginatedResponse<Product>> {
    // In a real implementation, this would call the generated OpenAPI client
    // e.g., this.catalogOpenApiService.searchProducts(query, pagination?.pageKey, pagination?.limit)
    
    // Mock implementation for now
    const params: any = {};
    if (query) params.q = query;
    if (pagination?.pageKey) params.pageKey = pagination.pageKey;
    if (pagination?.limit) params.limit = pagination.limit;
    
    return this.get<{ data: Product[], hasNext: boolean, nextKey?: string }>(`/catalog/search`, params).pipe(
      map(response => ({
        data: response.data,
        hasNext: response.hasNext,
        nextKey: response.nextKey
      })),
      catchError(error => {
        console.error('Error searching products:', error);
        // Return an empty paginated response in case of error
        return of({ data: [], hasNext: false });
      })
    );
  }

  /**
   * Get a specific product by ID
   */
  getProduct(id: string): Observable<Product> {
    // In a real implementation, this would call the generated OpenAPI client
    // e.g., this.catalogOpenApiService.getProduct(id)
    
    return this.get<Product>(`/catalog/products/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Get products by category
   */
  getProductsByCategory(
    categoryId: string, 
    pagination?: PaginationParams
  ): Observable<PaginatedResponse<Product>> {
    const params: any = {};
    if (pagination?.pageKey) params.pageKey = pagination.pageKey;
    if (pagination?.limit) params.limit = pagination.limit;
    
    return this.get<{ data: Product[], hasNext: boolean, nextKey?: string }>(`/catalog/categories/${categoryId}/products`, params).pipe(
      map(response => ({
        data: response.data,
        hasNext: response.hasNext,
        nextKey: response.nextKey
      })),
      catchError(error => {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        return of({ data: [], hasNext: false });
      })
    );
  }

  /**
   * Get product recommendations
   */
  getProductRecommendations(productId: string): Observable<Product[]> {
    return this.get<Product[]>(`/catalog/products/${productId}/recommendations`).pipe(
      catchError(error => {
        console.error(`Error fetching recommendations for product ${productId}:`, error);
        return of([]);
      })
    );
  }
}