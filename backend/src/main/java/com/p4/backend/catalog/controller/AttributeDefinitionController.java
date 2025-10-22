package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductAttributeDto;
import com.p4.backend.catalog.service.ProductAttributeService;
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

@RestController
@RequestMapping("/api/attributes")
@RequiredArgsConstructor
public class AttributeDefinitionController {

    private final ProductAttributeService attributeService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductAttributeDto>> createAttribute(
            @Valid @RequestBody ProductAttributeDto request) {
        ApiResponse<ProductAttributeDto> response = attributeService.createAttribute(request);
        return buildResponse(response, HttpStatus.CREATED);
    }

    @GetMapping("/{attributeId}")
    public ResponseEntity<ApiResponse<ProductAttributeDto>> getAttribute(@PathVariable String attributeId) {
        ApiResponse<ProductAttributeDto> response = attributeService.getAttribute(attributeId);
        return buildResponse(response, HttpStatus.OK);
    }

    @PutMapping("/{attributeId}")
    public ResponseEntity<ApiResponse<ProductAttributeDto>> updateAttribute(@PathVariable String attributeId,
                                                                            @Valid @RequestBody ProductAttributeDto request) {
        ApiResponse<ProductAttributeDto> response = attributeService.updateAttribute(attributeId, request);
        return buildResponse(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductAttributeDto>>> listAttributes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        ApiResponse<Page<ProductAttributeDto>> response = attributeService.listAttributes(page, size);
        return buildResponse(response, HttpStatus.OK);
    }

    @DeleteMapping("/{attributeId}")
    public ResponseEntity<ApiResponse<Void>> deleteAttribute(@PathVariable String attributeId) {
        ApiResponse<Void> response = attributeService.deleteAttribute(attributeId);
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
