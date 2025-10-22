package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductRequestDto;
import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.service.ProductService;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(
            @Valid @RequestBody ProductRequestDto request) {
        ApiResponse<ProductResponseDto> response = productService.createProduct(request);
        return buildResponse(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> listProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String vendorId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false, defaultValue = "createdAt") String sort,
            @RequestParam(required = false, defaultValue = "desc") String direction) {

        ApiResponse<Page<ProductResponseDto>> response = productService.listProducts(
                search,
                vendorId,
                category,
                status,
                active,
                minPrice,
                maxPrice,
                page,
                size,
                sort,
                direction
        );
        return buildResponse(response, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProduct(
            @PathVariable String productId) {
        ApiResponse<ProductResponseDto> response = productService.getProductById(productId);
        return buildResponse(response, HttpStatus.OK);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateProduct(
            @PathVariable String productId,
            @Valid @RequestBody ProductRequestDto request) {
        ApiResponse<ProductResponseDto> response = productService.updateProduct(productId, request);
        return buildResponse(response, HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable String productId) {
        ApiResponse<Void> response = productService.deleteProduct(productId);
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
