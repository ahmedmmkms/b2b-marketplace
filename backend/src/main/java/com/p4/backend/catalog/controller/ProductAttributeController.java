package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductAttributeAssignmentDto;
import com.p4.backend.catalog.dto.ProductAttributeAssignmentRequestDto;
import com.p4.backend.catalog.service.ProductAttributeAssignmentService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/attributes")
@RequiredArgsConstructor
public class ProductAttributeController {

    private final ProductAttributeAssignmentService assignmentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductAttributeAssignmentDto>>> getProductAttributes(
            @PathVariable String productId) {
        ApiResponse<List<ProductAttributeAssignmentDto>> response = assignmentService.getProductAttributes(productId);
        return buildResponse(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductAttributeAssignmentDto>> addProductAttribute(
            @PathVariable String productId,
            @Valid @RequestBody ProductAttributeAssignmentRequestDto request) {
        ApiResponse<ProductAttributeAssignmentDto> response = assignmentService.addAttributeToProduct(productId, request);
        return buildResponse(response, HttpStatus.CREATED);
    }

    @PutMapping("/{attributeId}")
    public ResponseEntity<ApiResponse<ProductAttributeAssignmentDto>> updateProductAttribute(
            @PathVariable String productId,
            @PathVariable String attributeId,
            @Valid @RequestBody ProductAttributeAssignmentRequestDto request) {
        ApiResponse<ProductAttributeAssignmentDto> response =
                assignmentService.updateAttributeForProduct(productId, attributeId, request);
        return buildResponse(response, HttpStatus.OK);
    }

    @DeleteMapping("/{attributeId}")
    public ResponseEntity<ApiResponse<Void>> deleteProductAttribute(@PathVariable String productId,
                                                                    @PathVariable String attributeId) {
        ApiResponse<Void> response = assignmentService.removeAttributeFromProduct(productId, attributeId);
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
