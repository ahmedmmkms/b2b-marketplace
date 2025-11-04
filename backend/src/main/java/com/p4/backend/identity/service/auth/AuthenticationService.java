package com.p4.backend.identity.service.auth;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.security.JwtUtil;
import com.p4.backend.identity.dto.JwtResponse;
import com.p4.backend.identity.dto.LoginRequest;
import com.p4.backend.identity.dto.RegisterRequest;
import com.p4.backend.identity.model.UserAccount;
import com.p4.backend.identity.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private UserAccountRepository userAccountRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get the authenticated user from the principal
        Object principal = authentication.getPrincipal();
        UserAccount user;
        if (principal instanceof UserAccount) {
            user = (UserAccount) principal;
        } else {
            // Fallback: retrieve user from database using email
            String email = authentication.getName();
            user = userAccountRepository.findByEmailIgnoreCaseAndIsActiveTrue(email)
                    .orElseThrow(() -> new RuntimeException("User not found: " + email));
        }
        
        String jwt = jwtUtil.generateToken(user.getEmail());

        return new JwtResponse(
                jwt,
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole().toString()
        );
    }

    public JwtResponse registerUser(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userAccountRepository.findByEmailIgnoreCase(registerRequest.getEmail()).isPresent()) {
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/email-taken",
                "Email already taken",
                "The email address is already registered with another account"
            );
        }

        // Get the organization to determine the user's role
        Organization org = organizationRepository.findById(registerRequest.getOrgId())
            .orElseThrow(() -> new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/organization-not-found",
                "Organization not found",
                "The specified organization does not exist"
            ));

        // Create new user account
        UserAccount user = new UserAccount();
        user.setId(ULIDGenerator.generateULID()); // Generate ULID for the new user
        user.setFullName(registerRequest.getFullName());
        user.setEmail(registerRequest.getEmail());
        user.setOrgId(registerRequest.getOrgId());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        
        // Set user role based on the organization role
        if (Organization.Role.vendor.equals(org.getRole())) {
            user.setRole(UserAccount.Role.vendor);
        } else if (Organization.Role.ops.equals(org.getRole())) {
            user.setRole(UserAccount.Role.ops);
        } else {
            // Default to buyer for buyer organizations or any other organization types
            user.setRole(UserAccount.Role.buyer);
        }

        UserAccount savedUser = userAccountRepository.save(user);

        // Generate JWT token
        String jwt = jwtUtil.generateToken(savedUser.getEmail());

        return new JwtResponse(
                jwt,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole().toString()
        );
    }

    public Optional<UserAccount> getUserByEmail(String email) {
        return userAccountRepository.findByEmailIgnoreCaseAndIsActiveTrue(email);
    }
}