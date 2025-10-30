package com.p4.backend.identity.controller;

import com.p4.backend.identity.model.VendorCreateRequest;
import com.p4.backend.identity.model.VendorResponse;
import com.p4.backend.identity.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/vendors")
public class VendorController {
    
    @Autowired
    private VendorService vendorService;
    
    @PostMapping
    public ResponseEntity<VendorResponse> createVendor(@Valid @RequestBody VendorCreateRequest request) {
        VendorResponse response = vendorService.createVendor(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}