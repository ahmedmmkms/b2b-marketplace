package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.ProductRequestDto;
import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.Vendor;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final VendorRepository vendorRepository;

    @Transactional
    public ApiResponse<ProductResponseDto> createProduct(ProductRequestDto productDto) {
        try {
            // Check if product with same SKU already exists
            if (productRepository.existsBySku(productDto.getSku())) {
                return ApiResponse.<ProductResponseDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            // Check if vendor exists
            Optional<Vendor> vendorOpt = vendorRepository.findById(productDto.getVendorId());
            if (vendorOpt.isEmpty()) {
                return ApiResponse.<ProductResponseDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            Vendor vendor = vendorOpt.get();
            
            // Create product entity
            Product product = new Product();
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setSku(productDto.getSku());
            product.setVendor(vendor);
            
            // Set price
            product.setPrice(productDto.getPrice());
            
            product.setStockQuantity(productDto.getStockQuantity());
            product.setMinOrderQuantity(productDto.getMinOrderQuantity());
            product.setWeight(productDto.getWeight());
            product.setDimensionsLength(productDto.getDimensionsLength());
            product.setDimensionsWidth(productDto.getDimensionsWidth());
            product.setDimensionsHeight(productDto.getDimensionsHeight());
            product.setProductStatus(Product.ProductStatus.valueOf(productDto.getProductStatus()));
            product.setIsActive(productDto.getIsActive());
            
            Product savedProduct = productRepository.save(product);
            
            // Convert to response DTO
            ProductResponseDto responseDto = mapToProductResponseDto(savedProduct);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductResponseDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<ProductResponseDto> updateProduct(String productId, ProductRequestDto productDto) {
        try {
            Optional<Product> productOpt = productRepository.findById(productId);
            if (productOpt.isEmpty()) {
                return ApiResponse.<ProductResponseDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            Optional<Vendor> vendorOpt = vendorRepository.findById(productDto.getVendorId());
            if (vendorOpt.isEmpty()) {
                return ApiResponse.<ProductResponseDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            Product existingProduct = productOpt.get();
            Vendor vendor = vendorOpt.get();
            
            // Update product fields
            existingProduct.setName(productDto.getName());
            existingProduct.setDescription(productDto.getDescription());
            existingProduct.setSku(productDto.getSku());
            existingProduct.setVendor(vendor);
            
            // Update price
            existingProduct.setPrice(productDto.getPrice());
            
            existingProduct.setStockQuantity(productDto.getStockQuantity());
            existingProduct.setMinOrderQuantity(productDto.getMinOrderQuantity());
            existingProduct.setWeight(productDto.getWeight());
            existingProduct.setDimensionsLength(productDto.getDimensionsLength());
            existingProduct.setDimensionsWidth(productDto.getDimensionsWidth());
            existingProduct.setDimensionsHeight(productDto.getDimensionsHeight());
            existingProduct.setProductStatus(Product.ProductStatus.valueOf(productDto.getProductStatus()));
            existingProduct.setIsActive(productDto.getIsActive());
            
            Product updatedProduct = productRepository.save(existingProduct);
            
            // Convert to response DTO
            ProductResponseDto responseDto = mapToProductResponseDto(updatedProduct);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductResponseDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<Void> deleteProduct(String productId) {
        try {
            if (!productRepository.existsById(productId)) {
                return ApiResponse.<Void>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            productRepository.deleteById(productId);
            return ApiResponse.success(null);
        } catch (Exception e) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    private ProductResponseDto mapToProductResponseDto(Product product) {
        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .sku(product.getSku())
                .vendorId(product.getVendor().getId())
                .vendorName(product.getVendor().getBusinessName())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .minOrderQuantity(product.getMinOrderQuantity())
                .weight(product.getWeight())
                .dimensionsLength(product.getDimensionsLength())
                .dimensionsWidth(product.getDimensionsWidth())
                .dimensionsHeight(product.getDimensionsHeight())
                .productStatus(product.getProductStatus().name())
                .isActive(product.getIsActive())
                .build();
    }
}