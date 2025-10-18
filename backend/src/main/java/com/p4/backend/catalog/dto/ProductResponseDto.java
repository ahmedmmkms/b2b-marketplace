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
    private String description;
    private String sku;
    private String vendorId;
    private String vendorName;
    private Money price;
    private Integer stockQuantity;
    private Integer minOrderQuantity;
    private BigDecimal weight;
    private BigDecimal dimensionsLength;
    private BigDecimal dimensionsWidth;
    private BigDecimal dimensionsHeight;
    private String productStatus;
    private Boolean isActive;
    private List<ProductAttributeDto> attributes;
    private List<MediaAssetDto> mediaAssets;
}