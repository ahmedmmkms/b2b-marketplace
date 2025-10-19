package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductAttributeDto;
import com.p4.backend.catalog.service.ProductAttributeService;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/catalog/attributes")
@RequiredArgsConstructor
public class ProductAttributeController {

    private final ProductAttributeService productAttributeService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductAttributeDto>> createProductAttribute(@Valid @RequestBody ProductAttributeDto attributeDto) {
        ApiResponse<ProductAttributeDto> response = productAttributeService.createProductAttribute(attributeDto);
        return ResponseEntity.status(CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductAttributeDto>> getProductAttributeById(@PathVariable String id) {
        ApiResponse<ProductAttributeDto> response = productAttributeService.getProductAttributeById(id);
        return ResponseEntity.status(OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductAttributeDto>> updateProductAttribute(@PathVariable String id, @Valid @RequestBody ProductAttributeDto attributeDto) {
        ApiResponse<ProductAttributeDto> response = productAttributeService.updateProductAttribute(id, attributeDto);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductAttributeDto>>> getAllProductAttributes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        ApiResponse<List<ProductAttributeDto>> response = productAttributeService.getAllProductAttributes(page, size);
        return ResponseEntity.status(OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProductAttribute(@PathVariable String id) {
        ApiResponse<Void> response = productAttributeService.deleteProductAttribute(id);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping("/{id}/values")
    public ResponseEntity<ApiResponse<List<Object>>> getProductAttributeValues(@PathVariable String id) {
        // This is a placeholder - would need specific DTO and service method for attribute values
        ApiResponse<List<Object>> response = ApiResponse.success(null);
        return ResponseEntity.status(OK).body(response);
    }
}