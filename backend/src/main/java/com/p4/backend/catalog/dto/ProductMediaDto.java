package com.p4.backend.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductMediaDto {

    private String id;
    private String productId;
    private String mediaAssetId;
    private Integer displayOrder;
    private Boolean isPrimary;
    private String altTextOverride;
    private MediaAssetDto mediaAsset;
}
