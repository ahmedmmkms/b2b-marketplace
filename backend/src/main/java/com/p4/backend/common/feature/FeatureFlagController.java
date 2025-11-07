package com.p4.backend.common.feature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/flags")
public class FeatureFlagController {
    
    @Autowired
    private FeatureFlagRepository featureFlagRepository;
    
    @GetMapping
    public ResponseEntity<List<FeatureFlag>> getAllFlags() {
        List<FeatureFlag> flags = featureFlagRepository.findAll();
        return ResponseEntity.ok(flags);
    }
}
