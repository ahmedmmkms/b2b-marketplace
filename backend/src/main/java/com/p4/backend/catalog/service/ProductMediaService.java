package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.ProductMediaDto;
import com.p4.backend.catalog.model.MediaAsset;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductMedia;
import com.p4.backend.catalog.repository.MediaAssetRepository;
import com.p4.backend.catalog.repository.ProductMediaRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductMediaService {

    private final ProductMediaRepository productMediaRepository;
    private final ProductRepository productRepository;
    private final MediaAssetRepository mediaAssetRepository;

    @Transactional
    public ApiResponse<ProductMediaDto> createProductMedia(ProductMediaDto productMediaDto) {
        try {
            // Check if product exists
            Optional<Product> productOpt = productRepository.findById(productMediaDto.getProductId());
            if (productOpt.isEmpty()) {
                return ApiResponse.<ProductMediaDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }

            // Check if media asset exists
            Optional<MediaAsset> mediaAssetOpt = mediaAssetRepository.findById(productMediaDto.getMediaAssetId());
            if (mediaAssetOpt.isEmpty()) {
                return ApiResponse.<ProductMediaDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }

            // Check if the association already exists
            if (productMediaRepository.existsByProductIdAndMediaAssetId(
                    productMediaDto.getProductId(), productMediaDto.getMediaAssetId())) {
                return ApiResponse.<ProductMediaDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }

            Product product = productOpt.get();
            MediaAsset mediaAsset = mediaAssetOpt.get();

            ProductMedia productMedia = new ProductMedia();
            productMedia.setProduct(product);
            productMedia.setMediaAsset(mediaAsset);
            productMedia.setDisplayOrder(productMediaDto.getDisplayOrder());
            productMedia.setIsPrimary(productMediaDto.getIsPrimary());
            productMedia.setAltTextOverride(productMediaDto.getAltTextOverride());

            ProductMedia savedProductMedia = productMediaRepository.save(productMedia);

            ProductMediaDto responseDto = mapToProductMediaDto(savedProductMedia);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductMediaDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<ProductMediaDto> getProductMediaById(String productMediaId) {
        try {
            Optional<ProductMedia> productMediaOpt = productMediaRepository.findById(productMediaId);

            if (productMediaOpt.isEmpty()) {
                return ApiResponse.<ProductMediaDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }

            ProductMedia productMedia = productMediaOpt.get();
            ProductMediaDto responseDto = mapToProductMediaDto(productMedia);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductMediaDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<ProductMediaDto> updateProductMedia(String productMediaId, ProductMediaDto productMediaDto) {
        try {
            Optional<ProductMedia> productMediaOpt = productMediaRepository.findById(productMediaId);

            if (productMediaOpt.isEmpty()) {
                return ApiResponse.<ProductMediaDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }

            ProductMedia existingProductMedia = productMediaOpt.get();

            // Update fields
            existingProductMedia.setDisplayOrder(productMediaDto.getDisplayOrder());
            existingProductMedia.setIsPrimary(productMediaDto.getIsPrimary());
            existingProductMedia.setAltTextOverride(productMediaDto.getAltTextOverride());

            ProductMedia updatedProductMedia = productMediaRepository.save(existingProductMedia);

            ProductMediaDto responseDto = mapToProductMediaDto(updatedProductMedia);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductMediaDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<ProductMediaDto>> getAllProductMedia(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("displayOrder").ascending());
            
            Page<ProductMedia> productMediaPage = productMediaRepository.findAll(pageable);
            
            List<ProductMediaDto> responseDtos = productMediaPage.getContent().stream()
                    .map(this::mapToProductMediaDto)
                    .toList();
            
            return ApiResponse.success(responseDtos);
        } catch (Exception e) {
            return ApiResponse.<List<ProductMediaDto>>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<ProductMediaDto>> getProductMediaByProduct(String productId) {
        try {
            List<ProductMedia> productMedias = productMediaRepository.findByProductIdOrderByDisplayOrderAsc(productId);
            
            List<ProductMediaDto> responseDtos = productMedias.stream()
                    .map(this::mapToProductMediaDto)
                    .toList();
            
            return ApiResponse.success(responseDtos);
        } catch (Exception e) {
            return ApiResponse.<List<ProductMediaDto>>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<Void> deleteProductMedia(String productMediaId) {
        try {
            if (!productMediaRepository.existsById(productMediaId)) {
                return ApiResponse.<Void>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }

            productMediaRepository.deleteById(productMediaId);
            return ApiResponse.success(null);
        } catch (Exception e) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    private ProductMediaDto mapToProductMediaDto(ProductMedia productMedia) {
        return ProductMediaDto.builder()
                .id(productMedia.getId())
                .productId(productMedia.getProduct().getId())
                .mediaAssetId(productMedia.getMediaAsset().getId())
                .displayOrder(productMedia.getDisplayOrder())
                .isPrimary(productMedia.getIsPrimary())
                .altTextOverride(productMedia.getAltTextOverride())
                .build();
    }
}