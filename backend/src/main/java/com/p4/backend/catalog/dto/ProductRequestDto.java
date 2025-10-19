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

    private String description;

    @NotBlank(message = "SKU is required")
    private String sku;

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

    private String productStatus; // Will be converted to enum in service

    private Boolean isActive;
}