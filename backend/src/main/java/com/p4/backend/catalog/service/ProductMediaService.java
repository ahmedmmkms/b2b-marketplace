package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.MediaAssetDto;
import com.p4.backend.catalog.dto.ProductMediaDto;
import com.p4.backend.catalog.mapper.CatalogMapper;
import com.p4.backend.catalog.model.MediaAsset;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductMedia;
import com.p4.backend.catalog.repository.MediaAssetRepository;
import com.p4.backend.catalog.repository.ProductMediaRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductMediaService {

    private final ProductRepository productRepository;
    private final MediaAssetRepository mediaAssetRepository;
    private final ProductMediaRepository productMediaRepository;

    @Transactional
    public ApiResponse<ProductMediaDto> addMediaToProduct(String productId, ProductMediaDto request) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product"));
        }

        Optional<MediaAsset> mediaAssetOpt = mediaAssetRepository.findById(request.getMediaAssetId());
        if (mediaAssetOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Media Asset"));
        }

        if (productMediaRepository.existsByProductIdAndMediaAssetId(productId, request.getMediaAssetId())) {
            return ApiResponse.error(ProblemDetails.validationError("Media asset already associated with product"));
        }

        ProductMedia productMedia = ProductMedia.builder()
                .product(productOpt.get())
                .mediaAsset(mediaAssetOpt.get())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .isPrimary(request.getIsPrimary() != null ? request.getIsPrimary() : Boolean.FALSE)
                .altTextOverride(request.getAltTextOverride())
                .build();

        ProductMedia saved = productMediaRepository.save(productMedia);
        return ApiResponse.success(mapToDto(saved));
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<ProductMediaDto>> listProductMedia(String productId) {
        if (!productRepository.existsById(productId)) {
            return ApiResponse.error(ProblemDetails.notFound("Product"));
        }

        List<ProductMediaDto> media = productMediaRepository.findByProductIdOrderByDisplayOrderAsc(productId)
                .stream()
                .map(this::mapToDto)
                .toList();

        return ApiResponse.success(media);
    }

    @Transactional
    public ApiResponse<Void> removeMediaFromProduct(String productId, String mediaAssetId) {
        Optional<ProductMedia> productMediaOpt = productMediaRepository.findByProductIdAndMediaAssetId(productId, mediaAssetId);
        if (productMediaOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product media association"));
        }

        productMediaRepository.delete(productMediaOpt.get());
        return ApiResponse.success(null);
    }

    private ProductMediaDto mapToDto(ProductMedia productMedia) {
        MediaAssetDto mediaAssetDto = CatalogMapper.toMediaAssetDto(productMedia.getMediaAsset());
        return ProductMediaDto.builder()
                .id(productMedia.getId())
                .productId(productMedia.getProduct().getId())
                .mediaAssetId(mediaAssetDto != null ? mediaAssetDto.getId() : null)
                .displayOrder(productMedia.getDisplayOrder())
                .isPrimary(productMedia.getIsPrimary())
                .altTextOverride(productMedia.getAltTextOverride())
                .mediaAsset(mediaAssetDto)
                .build();
    }
}
