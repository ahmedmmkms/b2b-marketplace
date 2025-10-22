package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.dto.VendorRequestDto;
import com.p4.backend.catalog.dto.VendorResponseDto;
import com.p4.backend.catalog.service.VendorService;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;

    @PostMapping
    public ResponseEntity<ApiResponse<VendorResponseDto>> createVendor(
            @Valid @RequestBody VendorRequestDto request) {
        ApiResponse<VendorResponseDto> response = vendorService.createVendor(request);
        return buildResponse(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<VendorResponseDto>>> listVendors(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        ApiResponse<Page<VendorResponseDto>> response = vendorService.listVendors(status, search, page, size);
        return buildResponse(response, HttpStatus.OK);
    }

    @GetMapping("/{vendorId}")
    public ResponseEntity<ApiResponse<VendorResponseDto>> getVendor(
            @PathVariable String vendorId) {
        ApiResponse<VendorResponseDto> response = vendorService.getVendorById(vendorId);
        return buildResponse(response, HttpStatus.OK);
    }

    @PutMapping("/{vendorId}")
    public ResponseEntity<ApiResponse<VendorResponseDto>> updateVendor(
            @PathVariable String vendorId,
            @Valid @RequestBody VendorRequestDto request) {
        ApiResponse<VendorResponseDto> response = vendorService.updateVendor(vendorId, request);
        return buildResponse(response, HttpStatus.OK);
    }

    @GetMapping("/{vendorId}/products")
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> listVendorProducts(
            @PathVariable String vendorId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        ApiResponse<Page<ProductResponseDto>> response = vendorService.listVendorProducts(vendorId, status, page, size);
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
