package com.p4.backend.identity.controller;

import com.p4.backend.identity.model.User;
import com.p4.backend.identity.repository.UserRepository;
import com.p4.backend.shared.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<User>error("https://api.example.com/errors/validation", 
                            "Validation Error", 400, "User with this email already exists"));
        }
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(savedUser, Map.of("message", "User created successfully")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User userEntity = user.get();
            // Ensure account is loaded to avoid lazy initialization issues
            userEntity.getAccount().getId(); // This will trigger the loading of the account
            return ResponseEntity.ok(ApiResponse.success(userEntity, Map.of("message", "User retrieved successfully")));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<User>error("https://api.example.com/errors/not-found", 
                            "Not Found", 404, "User not found"));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Ensure account is loaded for each user to avoid lazy initialization issues
        for (User user : users) {
            user.getAccount().getId(); // This will trigger the loading of the account
        }
        return ResponseEntity.ok(ApiResponse.success(users, Map.of("message", "Users retrieved successfully")));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<User>> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User userEntity = user.get();
            // Ensure account is loaded to avoid lazy initialization issues
            userEntity.getAccount().getId(); // This will trigger the loading of the account
            return ResponseEntity.ok(ApiResponse.success(userEntity, Map.of("message", "User retrieved by email successfully")));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<User>error("https://api.example.com/errors/not-found", 
                            "Not Found", 404, "User not found"));
        }
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<ApiResponse<List<User>>> getUsersByAccountId(@PathVariable String accountId) {
        List<User> users = userRepository.findByAccountId(accountId);
        // Ensure account is loaded for each user to avoid lazy initialization issues
        for (User user : users) {
            user.getAccount().getId(); // This will trigger the loading of the account
        }
        return ResponseEntity.ok(ApiResponse.success(users, Map.of("message", "Users for account retrieved successfully")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable String id,
            @Valid @RequestBody User userDetails) {
        
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            
            // Update fields
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setEmail(userDetails.getEmail());
            user.setPhone(userDetails.getPhone());
            user.setJobTitle(userDetails.getJobTitle());
            user.setIsActive(userDetails.getIsActive());
            
            // Only update password fields if they're provided in the request
            if (userDetails.getPasswordHash() != null) {
                user.setPasswordHash(userDetails.getPasswordHash());
            }
            if (userDetails.getSalt() != null) {
                user.setSalt(userDetails.getSalt());
            }
            
            User updatedUser = userRepository.save(user);
            // Ensure account is loaded to avoid lazy initialization issues
            updatedUser.getAccount().getId(); // This will trigger the loading of the account
            return ResponseEntity.ok(ApiResponse.success(updatedUser, Map.of("message", "User updated successfully")));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<User>error("https://api.example.com/errors/not-found", 
                            "Not Found", 404, "User not found"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok(ApiResponse.success(null, Map.of("message", "User deleted successfully")));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Void>error("https://api.example.com/errors/not-found", 
                            "Not Found", 404, "User not found"));
        }
    }
}