package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductMediaDto;
import com.p4.backend.catalog.service.ProductMediaService;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/catalog/product-media")
@RequiredArgsConstructor
public class ProductMediaController {

    private final ProductMediaService productMediaService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductMediaDto>> createProductMedia(@Valid @RequestBody ProductMediaDto productMediaDto) {
        ApiResponse<ProductMediaDto> response = productMediaService.createProductMedia(productMediaDto);
        return ResponseEntity.status(CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductMediaDto>> getProductMediaById(@PathVariable String id) {
        ApiResponse<ProductMediaDto> response = productMediaService.getProductMediaById(id);
        return ResponseEntity.status(OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductMediaDto>> updateProductMedia(@PathVariable String id, @Valid @RequestBody ProductMediaDto productMediaDto) {
        ApiResponse<ProductMediaDto> response = productMediaService.updateProductMedia(id, productMediaDto);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductMediaDto>>> getAllProductMedia(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        ApiResponse<List<ProductMediaDto>> response = productMediaService.getAllProductMedia(page, size);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ProductMediaDto>>> getProductMediaByProduct(@PathVariable String productId) {
        ApiResponse<List<ProductMediaDto>> response = productMediaService.getProductMediaByProduct(productId);
        return ResponseEntity.status(OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProductMedia(@PathVariable String id) {
        ApiResponse<Void> response = productMediaService.deleteProductMedia(id);
        return ResponseEntity.status(OK).body(response);
    }
}