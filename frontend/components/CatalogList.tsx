// components\CatalogList.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/libs/api/catalog/service';
import ProductCard from './ProductCard';
import { Input } from '@/libs/ui/input';
import { Button } from '@/libs/ui/button';
import { useRouter } from 'next/navigation';
import FeatureFlaggedComponent from './FeatureFlaggedComponent';

const CatalogList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const router = useRouter();
  
  // Debounced search query to avoid too many API calls
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  
  const { data, isLoading, isError, refetch } = useProducts({
    q: debouncedSearchQuery,
    page,
    pageSize
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };
  
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
        <p className="text-gray-600 mb-6">There was an issue loading the product catalog. Please try again later.</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
        
        <FeatureFlaggedComponent flag="search.enabled">
          <form onSubmit={handleSearch} className="mb-6 max-w-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </FeatureFlaggedComponent>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data?.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {data && data.total > 0 && (
            <div className="flex justify-between items-center mt-8">
              <div>
                Showing {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, data.total)} of {data.total} products
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => setPage(Math.min(Math.ceil(data.total / pageSize), page + 1))}
                  disabled={page >= Math.ceil(data.total / pageSize)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {data && data.items.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search query</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CatalogList;