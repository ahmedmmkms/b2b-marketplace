package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.MediaAssetDto;
import com.p4.backend.catalog.model.MediaAsset;
import com.p4.backend.catalog.repository.MediaAssetRepository;
import com.p4.backend.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MediaAssetService {

    private final MediaAssetRepository mediaAssetRepository;

    @Transactional
    public ApiResponse<MediaAssetDto> createMediaAsset(MediaAssetDto mediaAssetDto) {
        try {
            MediaAsset mediaAsset = new MediaAsset();
            mediaAsset.setOriginalFilename(mediaAssetDto.getOriginalFilename());
            mediaAsset.setStoragePath(mediaAssetDto.getStoragePath());
            mediaAsset.setContentType(mediaAssetDto.getContentType());
            mediaAsset.setFileSize(mediaAssetDto.getFileSize());
            mediaAsset.setAltText(mediaAssetDto.getAltText());
            mediaAsset.setCaption(mediaAssetDto.getCaption());
            mediaAsset.setMediaType(MediaAsset.MediaType.valueOf(mediaAssetDto.getMediaType()));
            
            MediaAsset savedMediaAsset = mediaAssetRepository.save(mediaAsset);
            
            MediaAssetDto responseDto = mapToMediaAssetDto(savedMediaAsset);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<MediaAssetDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<MediaAssetDto> getMediaAssetById(String mediaAssetId) {
        try {
            Optional<MediaAsset> mediaAssetOpt = mediaAssetRepository.findById(mediaAssetId);
            
            if (mediaAssetOpt.isEmpty()) {
                return ApiResponse.<MediaAssetDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            MediaAsset mediaAsset = mediaAssetOpt.get();
            MediaAssetDto responseDto = mapToMediaAssetDto(mediaAsset);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<MediaAssetDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<MediaAssetDto> updateMediaAsset(String mediaAssetId, MediaAssetDto mediaAssetDto) {
        try {
            Optional<MediaAsset> mediaAssetOpt = mediaAssetRepository.findById(mediaAssetId);
            
            if (mediaAssetOpt.isEmpty()) {
                return ApiResponse.<MediaAssetDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            MediaAsset existingMediaAsset = mediaAssetOpt.get();
            
            // Update fields
            existingMediaAsset.setOriginalFilename(mediaAssetDto.getOriginalFilename());
            existingMediaAsset.setStoragePath(mediaAssetDto.getStoragePath());
            existingMediaAsset.setContentType(mediaAssetDto.getContentType());
            existingMediaAsset.setFileSize(mediaAssetDto.getFileSize());
            existingMediaAsset.setAltText(mediaAssetDto.getAltText());
            existingMediaAsset.setCaption(mediaAssetDto.getCaption());
            existingMediaAsset.setMediaType(MediaAsset.MediaType.valueOf(mediaAssetDto.getMediaType()));
            
            MediaAsset updatedMediaAsset = mediaAssetRepository.save(existingMediaAsset);
            
            MediaAssetDto responseDto = mapToMediaAssetDto(updatedMediaAsset);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<MediaAssetDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<MediaAssetDto>> getAllMediaAssets(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            
            Page<MediaAsset> mediaAssetPage = mediaAssetRepository.findAll(pageable);
            
            List<MediaAssetDto> responseDtos = mediaAssetPage.getContent().stream()
                    .map(this::mapToMediaAssetDto)
                    .toList();
            
            return ApiResponse.success(responseDtos);
        } catch (Exception e) {
            return ApiResponse.<List<MediaAssetDto>>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<Void> deleteMediaAsset(String mediaAssetId) {
        try {
            if (!mediaAssetRepository.existsById(mediaAssetId)) {
                return ApiResponse.<Void>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            mediaAssetRepository.deleteById(mediaAssetId);
            return ApiResponse.success(null);
        } catch (Exception e) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    private MediaAssetDto mapToMediaAssetDto(MediaAsset mediaAsset) {
        return MediaAssetDto.builder()
                .id(mediaAsset.getId())
                .originalFilename(mediaAsset.getOriginalFilename())
                .storagePath(mediaAsset.getStoragePath())
                .contentType(mediaAsset.getContentType())
                .fileSize(mediaAsset.getFileSize())
                .altText(mediaAsset.getAltText())
                .caption(mediaAsset.getCaption())
                .mediaType(mediaAsset.getMediaType().name())
                .build();
    }
}