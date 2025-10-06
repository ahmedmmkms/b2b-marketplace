package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.entity.MediaAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaAssetRepository extends JpaRepository<MediaAsset, String> {
    List<MediaAsset> findByMediaType(MediaAsset.MediaType mediaType);
    List<MediaAsset> findByStatus(MediaAsset.MediaStatus status);
    List<MediaAsset> findByMediaTypeAndStatus(MediaAsset.MediaType mediaType, MediaAsset.MediaStatus status);
}