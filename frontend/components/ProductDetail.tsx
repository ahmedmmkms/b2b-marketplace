// components\ProductDetail.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useProduct } from '@/libs/api/catalog/service';
import { Button } from '@/libs/ui/button';
import { useQuery } from '@tanstack/react-query';

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  
  const { data: product, isLoading, isError } = useProduct(productId || '');
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div
          role="status"
          aria-label="Loading product"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>
    );
  }
  
  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The requested product could not be found. Please check the product ID or go back to the catalog.</p>
          <Button onClick={() => window.history.back()}>Back to Catalog</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          {product.mediaUrls && product.mediaUrls.length > 0 ? (
            <img 
              src={product.mediaUrls[0]} 
              alt={product.name} 
              className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">No Image Available</span>
            </div>
          )}
        </div>
        
        <div className="lg:w-1/2">
          <div className="mb-6">
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="text-2xl font-bold text-blue-600 mb-6">
              ${product.referencePrice.toFixed(2)}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">SKU</p>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vendor ID</p>
                <p className="font-medium">{product.vendorId}</p>
              </div>
            </div>
            
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <>
                <h3 className="text-lg font-medium mt-6 mb-3">Additional Attributes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <p className="text-sm text-gray-500 capitalize">{key}</p>
                      <p className="font-medium">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="flex gap-4">
            <Button className="flex-1">
              Add to RFQ
            </Button>
            <Button variant="outline" className="flex-1">
              Contact Vendor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
