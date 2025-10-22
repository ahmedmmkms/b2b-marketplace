package com.p4.backend.catalog.media.repository;

import com.p4.backend.catalog.media.model.MediaAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaAssetModuleRepository extends JpaRepository<MediaAsset, String> {
    List<MediaAsset> findByStatus(MediaAsset.Status status);
    List<MediaAsset> findByMediaType(MediaAsset.MediaType mediaType);
    List<MediaAsset> findByIsPrimary(Boolean isPrimary);
}