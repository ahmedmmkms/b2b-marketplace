package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.MediaAssetDto;
import com.p4.backend.catalog.service.MediaAssetService;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/catalog/media-assets")
@RequiredArgsConstructor
public class MediaAssetController {

    private final MediaAssetService mediaAssetService;

    @PostMapping
    public ResponseEntity<ApiResponse<MediaAssetDto>> createMediaAsset(@Valid @RequestBody MediaAssetDto mediaAssetDto) {
        ApiResponse<MediaAssetDto> response = mediaAssetService.createMediaAsset(mediaAssetDto);
        return ResponseEntity.status(CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MediaAssetDto>> getMediaAssetById(@PathVariable String id) {
        ApiResponse<MediaAssetDto> response = mediaAssetService.getMediaAssetById(id);
        return ResponseEntity.status(OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MediaAssetDto>> updateMediaAsset(@PathVariable String id, @Valid @RequestBody MediaAssetDto mediaAssetDto) {
        ApiResponse<MediaAssetDto> response = mediaAssetService.updateMediaAsset(id, mediaAssetDto);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MediaAssetDto>>> getAllMediaAssets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        ApiResponse<List<MediaAssetDto>> response = mediaAssetService.getAllMediaAssets(page, size);
        return ResponseEntity.status(OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMediaAsset(@PathVariable String id) {
        ApiResponse<Void> response = mediaAssetService.deleteMediaAsset(id);
        return ResponseEntity.status(OK).body(response);
    }
}