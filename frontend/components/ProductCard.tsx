// components/ProductCard.tsx
import React from 'react';
import { Product } from '@/libs/api/catalog/service';
import Link from 'next/link';
import { Button } from '@/libs/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="mb-3">
          {product.mediaUrls && product.mediaUrls.length > 0 ? (
            <img 
              src={product.mediaUrls[0]} 
              alt={product.name} 
              className="w-full h-40 object-contain rounded-md"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center mt-3">
            <span className="text-lg font-bold text-blue-600">
              ${product.referencePrice.toFixed(2)}
            </span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <Link href={`/product/${product.id}`} className="w-full">
            <Button className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
