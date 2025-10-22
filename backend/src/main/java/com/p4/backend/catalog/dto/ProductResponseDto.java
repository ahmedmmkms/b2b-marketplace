package com.p4.backend.catalog.dto;

import com.p4.backend.shared.kernel.Money;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {

    private String id;
    private String name;
    private String slug;
    private String description;
    private String shortDescription;
    private String sku;
    private String upc;
    private String gtin;
    private String mpn;
    private String brand;
    private String categoryId;
    private String vendorId;
    private String vendorName;
    private Money price;
    private Integer stockQuantity;
    private Integer minOrderQuantity;
    private BigDecimal weight;
    private BigDecimal dimensionsLength;
    private BigDecimal dimensionsWidth;
    private BigDecimal dimensionsHeight;
    private String dimensions;
    private String packagingInfo;
    private String productStatus;
    private Boolean isActive;
    private Boolean inventoryTracking;
    private String inventoryStatus;
    private Integer moq;
    private String taxClass;
    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;
    private List<ProductAttributeDto> attributes;
    private List<MediaAssetDto> mediaAssets;
}
