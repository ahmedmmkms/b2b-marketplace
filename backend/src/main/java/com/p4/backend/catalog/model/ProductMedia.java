package com.p4.backend.catalog.model;

import com.p4.backend.shared.kernel.Base;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_media")
@Getter
@Setter
public class ProductMedia extends Base {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "media_asset_id", referencedColumnName = "id", nullable = false)
    private MediaAsset mediaAsset;

    @NotNull(message = "Display order is required")
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "is_primary")
    private Boolean isPrimary = false;

    @Column(name = "alt_text_override")
    private String altTextOverride;

    @PrePersist
    protected void onCreate() {
        if (this.displayOrder == null) {
            this.displayOrder = 0;
        }
        if (this.isPrimary == null) {
            this.isPrimary = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Additional validation or updates can be performed here
    }
}