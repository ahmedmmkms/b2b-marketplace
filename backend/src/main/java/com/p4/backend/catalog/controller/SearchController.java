package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.dto.SearchRequestDto;
import com.p4.backend.catalog.service.CatalogService;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final CatalogService catalogService;

    @PostMapping
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> searchProducts(
            @Valid @RequestBody SearchRequestDto request) {
        ApiResponse<Page<ProductResponseDto>> response = catalogService.searchCatalog(request);
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
