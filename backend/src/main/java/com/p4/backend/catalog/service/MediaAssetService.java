package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.MediaAssetDto;
import com.p4.backend.catalog.mapper.CatalogMapper;
import com.p4.backend.catalog.model.MediaAsset;
import com.p4.backend.catalog.repository.MediaAssetRepository;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MediaAssetService {

    private final MediaAssetRepository mediaAssetRepository;

    @Transactional
    public ApiResponse<MediaAssetDto> createMedia(MediaAssetDto dto) {
        MediaAsset mediaAsset = new MediaAsset();
        applyUpdates(mediaAsset, dto);

        MediaAsset saved = mediaAssetRepository.save(mediaAsset);
        return ApiResponse.success(CatalogMapper.toMediaAssetDto(saved));
    }

    @Transactional(readOnly = true)
    public ApiResponse<MediaAssetDto> getMedia(String mediaId) {
        return mediaAssetRepository.findById(mediaId)
                .map(CatalogMapper::toMediaAssetDto)
                .map(ApiResponse::success)
                .orElseGet(() -> ApiResponse.error(ProblemDetails.notFound("Media Asset")));
    }

    @Transactional
    public ApiResponse<MediaAssetDto> updateMedia(String mediaId, MediaAssetDto dto) {
        Optional<MediaAsset> mediaAssetOpt = mediaAssetRepository.findById(mediaId);
        if (mediaAssetOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Media Asset"));
        }

        MediaAsset mediaAsset = mediaAssetOpt.get();
        applyUpdates(mediaAsset, dto);
        MediaAsset saved = mediaAssetRepository.save(mediaAsset);

        return ApiResponse.success(CatalogMapper.toMediaAssetDto(saved));
    }

    @Transactional
    public ApiResponse<Void> deleteMedia(String mediaId) {
        if (!mediaAssetRepository.existsById(mediaId)) {
            return ApiResponse.error(ProblemDetails.notFound("Media Asset"));
        }

        mediaAssetRepository.deleteById(mediaId);
        return ApiResponse.success(null);
    }

    @Transactional(readOnly = true)
    public ApiResponse<Page<MediaAssetDto>> listMedia(int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<MediaAsset> mediaPage = mediaAssetRepository.findAll(pageable);
        Page<MediaAssetDto> dtoPage = mediaPage.map(CatalogMapper::toMediaAssetDto);

        return ApiResponse.success(dtoPage, paginationMetadata(mediaPage));
    }

    private void applyUpdates(MediaAsset mediaAsset, MediaAssetDto dto) {
        mediaAsset.setName(dto.getName() != null ? dto.getName() : dto.getOriginalFilename());
        mediaAsset.setTitle(dto.getTitle());
        mediaAsset.setOriginalFilename(dto.getOriginalFilename());
        mediaAsset.setStoragePath(dto.getStoragePath());
        mediaAsset.setContentType(dto.getContentType());
        mediaAsset.setFileSize(dto.getFileSize());
        mediaAsset.setAltText(dto.getAltText());
        mediaAsset.setCaption(dto.getCaption());
        mediaAsset.setMediaType(dto.getMediaType() != null
                ? MediaAsset.MediaType.valueOf(dto.getMediaType())
                : MediaAsset.MediaType.IMAGE);
        mediaAsset.setStatus(dto.getStatus() != null
                ? MediaAsset.MediaStatus.valueOf(dto.getStatus())
                : MediaAsset.MediaStatus.ACTIVE);
        mediaAsset.setIsPrimary(dto.getIsPrimary() != null ? dto.getIsPrimary() : Boolean.FALSE);
    }

    private Map<String, Object> paginationMetadata(Page<?> page) {
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("page", page.getNumber());
        metadata.put("size", page.getSize());
        metadata.put("totalPages", page.getTotalPages());
        metadata.put("totalElements", page.getTotalElements());
        metadata.put("numberOfElements", page.getNumberOfElements());
        metadata.put("first", page.isFirst());
        metadata.put("last", page.isLast());
        metadata.put("sorted", page.getSort().isSorted());
        return metadata;
    }
}
