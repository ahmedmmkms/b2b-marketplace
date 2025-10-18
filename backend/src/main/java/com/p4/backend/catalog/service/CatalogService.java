package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.*;
import com.p4.backend.catalog.model.*;
import com.p4.backend.catalog.repository.*;
import com.p4.backend.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final ProductRepository productRepository;
    private final VendorRepository vendorRepository;
    private final ProductAttributeRepository attributeRepository;
    private final ProductAttributeValueRepository attributeValueRepository;
    private final MediaAssetRepository mediaAssetRepository;
    private final ProductMediaRepository productMediaRepository;

    @Transactional(readOnly = true)
    public ApiResponse<Page<ProductResponseDto>> browseProducts(ProductSearchRequestDto searchRequest) {
        try {
            // Set default pagination parameters if not provided
            int page = searchRequest.getPage() != null ? Math.max(0, searchRequest.getPage()) : 0;
            int size = searchRequest.getSize() != null ? Math.max(1, Math.min(100, searchRequest.getSize())) : 10;

            // Set default sort
            String sortBy = searchRequest.getSortBy() != null ? searchRequest.getSortBy() : "createdAt";
            String sortOrder = searchRequest.getSortOrder() != null ? searchRequest.getSortOrder() : "DESC";
            
            Sort sort = sortOrder.equalsIgnoreCase("ASC") 
                ? Sort.by(sortBy).ascending() 
                : Sort.by(sortBy).descending();
            
            Pageable pageable = PageRequest.of(page, size, sort);

            Page<Product> productPage;

            if (searchRequest.getVendorId() != null && !searchRequest.getVendorId().isEmpty()) {
                // Search by vendor ID and keyword using full-text search
                if (searchRequest.getKeyword() != null && !searchRequest.getKeyword().isEmpty()) {
                    productPage = productRepository.searchByVendorIdAndFullText(
                        searchRequest.getVendorId(), 
                        searchRequest.getKeyword(), 
                        pageable
                    );
                } else {
                    // Just by vendor ID
                    productPage = productRepository.findByVendorIdAndIsActiveTrue(searchRequest.getVendorId(), pageable);
                }
            } else {
                // Search across all vendors using full-text search
                if (searchRequest.getKeyword() != null && !searchRequest.getKeyword().isEmpty()) {
                    productPage = productRepository.searchFullText(
                        searchRequest.getKeyword(), 
                        pageable
                    );
                } else {
                    // All active products
                    productPage = productRepository.findByIsActiveTrue(pageable);
                }
            }

            Page<ProductResponseDto> productResponsePage = productPage.map(this::mapToProductResponseDto);

            return ApiResponse.success(productResponsePage);
        } catch (Exception e) {
            return ApiResponse.<Page<ProductResponseDto>>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<ProductResponseDto> getProductById(String productId) {
        try {
            Optional<Product> productOpt = productRepository.findById(productId);
            
            if (productOpt.isEmpty()) {
                return ApiResponse.<ProductResponseDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            Product product = productOpt.get();
            
            if (!product.getIsActive()) {
                return ApiResponse.<ProductResponseDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            ProductResponseDto productDto = mapToProductResponseDto(product);
            
            return ApiResponse.success(productDto);
        } catch (Exception e) {
            return ApiResponse.<ProductResponseDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    private ProductResponseDto mapToProductResponseDto(Product product) {
        // Get vendor information
        String vendorName = null;
        if (product.getVendor() != null) {
            vendorName = product.getVendor().getBusinessName();
        } else {
            // This is just a fallback, but in practice the vendor should be loaded with the product
            // If we need to fetch it separately, we'd need the vendorId passed in separately
            vendorName = product.getVendor() != null ? product.getVendor().getBusinessName() : "Unknown Vendor";
        }

        // Get product attributes
        List<ProductAttributeDto> attributes = List.of(); // Implementation would fetch related attributes
        // Note: In a real implementation, you would fetch actual product attributes associated with this product

        // Get product media assets
        List<MediaAssetDto> mediaAssets = productMediaRepository.findByProductIdOrderByDisplayOrderAsc(product.getId())
                .stream()
                .map(pm -> MediaAssetDto.builder()
                        .id(pm.getMediaAsset().getId())
                        .originalFilename(pm.getMediaAsset().getOriginalFilename())
                        .storagePath(pm.getMediaAsset().getStoragePath())
                        .contentType(pm.getMediaAsset().getContentType())
                        .fileSize(pm.getMediaAsset().getFileSize())
                        .altText(pm.getMediaAsset().getAltText())
                        .caption(pm.getMediaAsset().getCaption())
                        .mediaType(pm.getMediaAsset().getMediaType().name())
                        .uploadDate(pm.getMediaAsset().getUploadDate())
                        .build())
                .collect(Collectors.toList());

        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .sku(product.getSku())
                .vendorId(product.getVendor().getId())
                .vendorName(vendorName)
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .minOrderQuantity(product.getMinOrderQuantity())
                .weight(product.getWeight())
                .dimensionsLength(product.getDimensionsLength())
                .dimensionsWidth(product.getDimensionsWidth())
                .dimensionsHeight(product.getDimensionsHeight())
                .productStatus(product.getProductStatus().name())
                .isActive(product.getIsActive())
                .attributes(attributes)
                .mediaAssets(mediaAssets)
                .build();
    }
}