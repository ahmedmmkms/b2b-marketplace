package com.p4.backend.catalog.dto;

import com.p4.backend.shared.kernel.Money;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {

    @NotBlank(message = "Product name is required")
    private String name;

    private String slug;

    private String description;

    private String shortDescription;

    @NotBlank(message = "SKU is required")
    private String sku;

    private String upc;
    private String gtin;
    private String mpn;
    private String brand;
    private String categoryId;

    @NotNull(message = "Vendor ID is required")
    private String vendorId;

    @NotNull(message = "Price is required")
    private Money price;

    @NotNull(message = "Stock quantity is required")
    private Integer stockQuantity;

    private Integer minOrderQuantity;

    private BigDecimal weight;

    private BigDecimal dimensionsLength;
    private BigDecimal dimensionsWidth;
    private BigDecimal dimensionsHeight;
    private String dimensions;
    private String packagingInfo;

    private String productStatus; // Will be converted to enum in service

    private Boolean isActive;
    private Boolean inventoryTracking;
    private String inventoryStatus;
    private Integer moq;
    private String taxClass;
    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;
}
