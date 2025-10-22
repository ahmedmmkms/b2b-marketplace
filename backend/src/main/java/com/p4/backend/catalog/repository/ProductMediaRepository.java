package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.model.ProductMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductMediaRepository extends JpaRepository<ProductMedia, String> {
    List<ProductMedia> findByProductIdOrderByDisplayOrderAsc(String productId);
    
    List<ProductMedia> findByProductIdAndIsPrimaryTrue(String productId);
    
    void deleteByProductId(String productId);
    
    boolean existsByProductIdAndMediaAssetId(String productId, String mediaAssetId);

    Optional<ProductMedia> findByProductIdAndMediaAssetId(String productId, String mediaAssetId);
}
