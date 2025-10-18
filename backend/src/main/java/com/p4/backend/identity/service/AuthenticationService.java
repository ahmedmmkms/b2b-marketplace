package com.p4.backend.identity.service;

import com.p4.backend.identity.dto.AuthRequest;
import com.p4.backend.identity.dto.AuthResponse;
import com.p4.backend.identity.dto.RefreshTokenRequest;
import com.p4.backend.identity.model.User;
import com.p4.backend.identity.repository.UserRepository;
import com.p4.backend.identity.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse authenticateUser(AuthRequest authRequest) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(authRequest.getEmail());
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with email: " + authRequest.getEmail());
        }

        User user = userOptional.get();

        // Check if user is active
        if (!user.getIsActive()) {
            throw new RuntimeException("User is not active: " + authRequest.getEmail());
        }

        // Generate access and refresh tokens
        String accessToken = jwtUtil.generateAccessToken(authRequest.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(authRequest.getEmail());

        return new AuthResponse(accessToken, refreshToken, jwtUtil.getAccessTokenExpiration() / 1000);
    }

    public AuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();
        String email = jwtUtil.extractUsername(refreshToken);

        // Verify the refresh token is valid
        if (jwtUtil.validateToken(refreshToken, email)) {
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (!userOptional.isPresent()) {
                throw new RuntimeException("User not found with email: " + email);
            }

            User user = userOptional.get();
            if (!user.getIsActive()) {
                throw new RuntimeException("User is not active: " + email);
            }

            // Generate new access token
            String newAccessToken = jwtUtil.generateAccessToken(email);

            return new AuthResponse(newAccessToken, refreshToken, jwtUtil.getAccessTokenExpiration() / 1000);
        } else {
            throw new RuntimeException("Invalid refresh token");
        }
    }

    public void logoutUser(String token) {
        // In a real implementation, you might add the token to a blacklist
        // For now, we'll just validate that the token is valid
        String email = jwtUtil.extractUsername(token);
        if (jwtUtil.validateToken(token, email)) {
            // Token is valid, proceed with logout
            // In a real implementation, you would add the token to a blacklist
        } else {
            throw new RuntimeException("Invalid token");
        }
    }
}