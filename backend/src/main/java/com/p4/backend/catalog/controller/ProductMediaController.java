package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductMediaDto;
import com.p4.backend.catalog.service.ProductMediaService;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/media")
@RequiredArgsConstructor
public class ProductMediaController {

    private final ProductMediaService productMediaService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductMediaDto>> addMedia(
            @PathVariable String productId,
            @Valid @RequestBody ProductMediaDto request) {
        request.setProductId(productId);
        ApiResponse<ProductMediaDto> response = productMediaService.addMediaToProduct(productId, request);
        return buildResponse(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductMediaDto>>> listMedia(@PathVariable String productId) {
        ApiResponse<List<ProductMediaDto>> response = productMediaService.listProductMedia(productId);
        return buildResponse(response, HttpStatus.OK);
    }

    @DeleteMapping("/{mediaAssetId}")
    public ResponseEntity<ApiResponse<Void>> removeMedia(@PathVariable String productId,
                                                         @PathVariable String mediaAssetId) {
        ApiResponse<Void> response = productMediaService.removeMediaFromProduct(productId, mediaAssetId);
        return buildResponse(response, HttpStatus.NO_CONTENT);
    }

    private <T> ResponseEntity<ApiResponse<T>> buildResponse(ApiResponse<T> response, HttpStatus successStatus) {
        if (response.isSuccess()) {
            return ResponseEntity.status(successStatus).body(response);
        }
        ProblemDetails error = response.getError();
        HttpStatus status = error != null && error.getStatus() != null
                ? HttpStatus.valueOf(error.getStatus())
                : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }
}
