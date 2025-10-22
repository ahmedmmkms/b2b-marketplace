package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.dto.ProductSearchRequestDto;
import com.p4.backend.catalog.service.CatalogService;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/catalog/products")
@RequiredArgsConstructor
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> browseCatalog(
            @RequestParam(name = "search", required = false) String search,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "vendorId", required = false) String vendorId,
            @RequestParam(name = "sort", required = false, defaultValue = "createdAt") String sort,
            @RequestParam(name = "direction", required = false, defaultValue = "desc") String direction,
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "20") Integer size,
            @RequestParam(name = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(name = "maxPrice", required = false) BigDecimal maxPrice) {

        ProductSearchRequestDto request = ProductSearchRequestDto.builder()
                .keyword(search)
                .category(category)
                .vendorId(vendorId)
                .sortBy(sort)
                .sortOrder(direction)
                .page(page)
                .size(size)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .build();

        ApiResponse<Page<ProductResponseDto>> response = catalogService.browseCatalog(request);
        return buildResponse(response, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getCatalogProduct(@PathVariable String productId) {
        ApiResponse<ProductResponseDto> response = catalogService.getPublicProduct(productId);
        return buildResponse(response, HttpStatus.OK);
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
