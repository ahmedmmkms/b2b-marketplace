package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.dto.ProductSearchRequestDto;
import com.p4.backend.catalog.service.CatalogService;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/catalog")
@RequiredArgsConstructor
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> browseProducts(
            @Valid ProductSearchRequestDto searchRequest) {
        ApiResponse<Page<ProductResponseDto>> response = catalogService.browseProducts(searchRequest);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProductById(@PathVariable String id) {
        ApiResponse<ProductResponseDto> response = catalogService.getProductById(id);
        return ResponseEntity.status(OK).body(response);
    }
}