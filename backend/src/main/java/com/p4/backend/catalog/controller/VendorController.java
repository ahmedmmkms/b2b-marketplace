package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.model.Vendor;
import com.p4.backend.catalog.service.VendorService;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;

    @PostMapping
    public ResponseEntity<ApiResponse<Vendor>> createVendor(@Valid @RequestBody Vendor vendor) {
        ApiResponse<Vendor> response = vendorService.createVendor(vendor);
        return ResponseEntity.status(CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vendor>> getVendorById(@PathVariable String id) {
        ApiResponse<Vendor> response = vendorService.getVendorById(id);
        return ResponseEntity.status(OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Vendor>> updateVendor(@PathVariable String id, @Valid @RequestBody Vendor vendor) {
        ApiResponse<Vendor> response = vendorService.updateVendor(id, vendor);
        return ResponseEntity.status(OK).body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Vendor>>> getAllVendors(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        ApiResponse<List<Vendor>> response = vendorService.getAllVendors(status, page, size);
        return ResponseEntity.status(OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVendor(@PathVariable String id) {
        ApiResponse<Void> response = vendorService.deleteVendor(id);
        return ResponseEntity.status(OK).body(response);
    }
}