package com.p4.backend.identity.controller;

import com.p4.backend.identity.dto.AuthRequest;
import com.p4.backend.identity.dto.AuthResponse;
import com.p4.backend.identity.dto.RefreshTokenRequest;
import com.p4.backend.identity.service.AuthenticationService;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            AuthResponse authResponse = authenticationService.authenticateUser(authRequest);
            return ResponseEntity.ok(ApiResponse.success(authResponse, Map.of("message", "Login successful")));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<AuthResponse>error("https://api.example.com/errors/unauthorized", 
                            "Unauthorized", 401, e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            AuthResponse authResponse = authenticationService.refreshToken(refreshTokenRequest);
            return ResponseEntity.ok(ApiResponse.success(authResponse, Map.of("message", "Token refreshed successfully")));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<AuthResponse>error("https://api.example.com/errors/unauthorized", 
                            "Unauthorized", 401, e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        // In a real implementation, we would invalidate the token
        // For now, we'll just return a success response
        return ResponseEntity.ok(ApiResponse.success(null, Map.of("message", "Logged out successfully")));
    }
}