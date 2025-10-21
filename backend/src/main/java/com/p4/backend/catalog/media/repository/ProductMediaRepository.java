package com.p4.backend.catalog.media.repository;

import com.p4.backend.catalog.media.model.ProductMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductMediaRepository extends JpaRepository<ProductMedia, String> {
    List<ProductMedia> findByProductId(String productId);
    List<ProductMedia> findByMediaAssetId(String mediaAssetId);
    List<ProductMedia> findByIsPrimary(Boolean isPrimary);
}