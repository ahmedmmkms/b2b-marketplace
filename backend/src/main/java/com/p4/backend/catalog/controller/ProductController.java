package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductRequestDto;
import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.service.ProductService;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/catalog/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(@Valid @RequestBody ProductRequestDto productDto) {
        ApiResponse<ProductResponseDto> response = productService.createProduct(productDto);
        return ResponseEntity.status(CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateProduct(@PathVariable String id, @Valid @RequestBody ProductRequestDto productDto) {
        ApiResponse<ProductResponseDto> response = productService.updateProduct(id, productDto);
        return ResponseEntity.status(OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable String id) {
        ApiResponse<Void> response = productService.deleteProduct(id);
        return ResponseEntity.status(OK).body(response);
    }
}