package com.p4.backend.catalog.mapper;

import com.p4.backend.catalog.dto.MediaAssetDto;
import com.p4.backend.catalog.dto.ProductAttributeDto;
import com.p4.backend.catalog.dto.ProductAttributeValueDto;
import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.dto.VendorResponseDto;
import com.p4.backend.catalog.model.MediaAsset;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductAttribute;
import com.p4.backend.catalog.model.ProductAttributeValue;
import com.p4.backend.catalog.model.ProductMedia;
import com.p4.backend.catalog.model.Vendor;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Utility class for mapping catalog entities to DTOs.
 */
public final class CatalogMapper {

    private CatalogMapper() {
    }

    public static VendorResponseDto toVendorResponse(Vendor vendor) {
        if (vendor == null) {
            return null;
        }

        return VendorResponseDto.builder()
                .id(vendor.getId())
                .businessName(vendor.getBusinessName())
                .description(vendor.getDescription())
                .email(vendor.getEmail())
                .phone(vendor.getPhone())
                .address(vendor.getAddress())
                .taxId(vendor.getTaxId())
                .businessLicenseNo(vendor.getBusinessLicenseNo())
                .registrationDate(vendor.getRegistrationDate())
                .approvalDate(vendor.getApprovalDate())
                .vendorStatus(vendor.getVendorStatus() != null ? vendor.getVendorStatus().name() : null)
                .kycVerified(vendor.getKycVerified())
                .kycVerifiedAt(vendor.getKycVerifiedAt())
                .kycVerifiedBy(vendor.getKycVerifiedBy())
                .createdAt(vendor.getCreatedAt())
                .updatedAt(vendor.getUpdatedAt())
                .build();
    }

    public static ProductResponseDto toProductResponse(Product product,
                                                       List<ProductAttributeDto> attributes,
                                                       List<MediaAssetDto> mediaAssets) {
        if (product == null) {
            return null;
        }

        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .shortDescription(product.getShortDescription())
                .sku(product.getSku())
                .upc(product.getUpc())
                .gtin(product.getGtin())
                .mpn(product.getMpn())
                .brand(product.getBrand())
                .categoryId(product.getCategoryId())
                .vendorId(product.getVendor() != null ? product.getVendor().getId() : null)
                .vendorName(product.getVendor() != null ? product.getVendor().getBusinessName() : null)
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .minOrderQuantity(product.getMinOrderQuantity())
                .moq(product.getMoq())
                .weight(product.getWeight())
                .dimensionsLength(product.getDimensionsLength())
                .dimensionsWidth(product.getDimensionsWidth())
                .dimensionsHeight(product.getDimensionsHeight())
                .dimensions(product.getDimensions())
                .packagingInfo(product.getPackagingInfo())
                .productStatus(product.getProductStatus() != null ? product.getProductStatus().name() : null)
                .inventoryStatus(product.getInventoryStatus() != null ? product.getInventoryStatus().name() : null)
                .inventoryTracking(product.getInventoryTracking())
                .isActive(product.getIsActive())
                .taxClass(product.getTaxClass())
                .metaTitle(product.getMetaTitle())
                .metaDescription(product.getMetaDescription())
                .metaKeywords(product.getMetaKeywords())
                .attributes(attributes != null ? attributes : List.of())
                .mediaAssets(mediaAssets != null ? mediaAssets : List.of())
                .build();
    }

    public static MediaAssetDto toMediaAssetDto(MediaAsset mediaAsset) {
        if (mediaAsset == null) {
            return null;
        }

        return MediaAssetDto.builder()
                .id(mediaAsset.getId())
                .name(mediaAsset.getName())
                .title(mediaAsset.getTitle())
                .originalFilename(mediaAsset.getOriginalFilename())
                .storagePath(mediaAsset.getStoragePath())
                .contentType(mediaAsset.getContentType())
                .fileSize(mediaAsset.getFileSize())
                .altText(mediaAsset.getAltText())
                .caption(mediaAsset.getCaption())
                .mediaType(mediaAsset.getMediaType() != null ? mediaAsset.getMediaType().name() : null)
                .status(mediaAsset.getStatus() != null ? mediaAsset.getStatus().name() : null)
                .isPrimary(mediaAsset.getIsPrimary())
                .uploadDate(mediaAsset.getUploadDate())
                .build();
    }

    public static ProductAttributeDto toProductAttributeDto(ProductAttribute attribute) {
        if (attribute == null) {
            return null;
        }

        List<ProductAttributeValueDto> values = attribute.getAttributeValues() == null
                ? List.of()
                : attribute.getAttributeValues().stream()
                .map(CatalogMapper::toProductAttributeValueDto)
                .toList();

        return ProductAttributeDto.builder()
                .id(attribute.getId())
                .name(attribute.getName())
                .displayName(attribute.getDisplayName())
                .description(attribute.getDescription())
                .attributeType(attribute.getAttributeType() != null ? attribute.getAttributeType().name() : null)
                .isRequired(attribute.getIsRequired())
                .isSearchable(attribute.getIsSearchable())
                .isFilterable(attribute.getIsFilterable())
                .sortOrder(attribute.getSortOrder())
                .validationRules(attribute.getValidationRules())
                .attributeValues(values)
                .build();
    }

    public static ProductAttributeValueDto toProductAttributeValueDto(ProductAttributeValue value) {
        if (value == null) {
            return null;
        }

        return ProductAttributeValueDto.builder()
                .id(value.getId())
                .attributeId(value.getProductAttribute() != null ? value.getProductAttribute().getId() : null)
                .value(value.getValue())
                .displayValue(value.getDisplayValue())
                .isDefault(value.getIsDefault())
                .sortOrder(value.getSortOrder())
                .build();
    }

    public static List<MediaAssetDto> toMediaAssetDtos(List<ProductMedia> productMediaList) {
        if (productMediaList == null) {
            return List.of();
        }

        return productMediaList.stream()
                .filter(Objects::nonNull)
                .map(ProductMedia::getMediaAsset)
                .filter(Objects::nonNull)
                .map(CatalogMapper::toMediaAssetDto)
                .collect(Collectors.toList());
    }
}
