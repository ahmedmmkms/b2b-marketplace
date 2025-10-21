package com.p4.backend.catalog.media.model;

import com.p4.backend.catalog.product.model.Product;
import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_media", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"product_id", "media_asset_id"})
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductMedia extends Base {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "media_asset_id", nullable = false)
    private MediaAsset mediaAsset;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "is_primary")
    private Boolean isPrimary;

    @Column(name = "alt_text_override")
    private String altTextOverride;
}