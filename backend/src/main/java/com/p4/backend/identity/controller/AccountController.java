package com.p4.backend.identity.controller;

import com.p4.backend.identity.model.Account;
import com.p4.backend.identity.repository.AccountRepository;
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
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Account>> createAccount(@Valid @RequestBody Account account) {
        // Check if email already exists
        if (accountRepository.existsByEmail(account.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<Account>error("https://api.example.com/errors/validation", 
                            "Validation Error", 400, "Account with this email already exists"));
        }
        
        Account savedAccount = accountRepository.save(account);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(savedAccount, Map.of("message", "Account created successfully")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Account>> getAccountById(@PathVariable String id) {
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            return ResponseEntity.ok(ApiResponse.success(account.get(), Map.of("message", "Account retrieved successfully")));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Account>error("https://api.example.com/errors/not-found", 
                            "Not Found", 404, "Account not found"));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Account>>> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success(accounts, Map.of("message", "Accounts retrieved successfully")));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Account>> updateAccount(
            @PathVariable String id,
            @Valid @RequestBody Account accountDetails) {
        
        Optional<Account> existingAccount = accountRepository.findById(id);
        if (existingAccount.isPresent()) {
            Account account = existingAccount.get();
            
            // Update fields
            account.setAccountType(accountDetails.getAccountType());
            account.setStatus(accountDetails.getStatus());
            account.setCompanyName(accountDetails.getCompanyName());
            account.setContactPerson(accountDetails.getContactPerson());
            account.setEmail(accountDetails.getEmail());
            account.setPhone(accountDetails.getPhone());
            account.setTaxId(accountDetails.getTaxId());
            account.setKycVerified(accountDetails.getKycVerified());
            
            Account updatedAccount = accountRepository.save(account);
            return ResponseEntity.ok(ApiResponse.success(updatedAccount, Map.of("message", "Account updated successfully")));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Account>error("https://api.example.com/errors/not-found", 
                            "Not Found", 404, "Account not found"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@PathVariable String id) {
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
            return ResponseEntity.ok(ApiResponse.success(null, Map.of("message", "Account deleted successfully")));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Void>error("https://api.example.com/errors/not-found", 
                            "Not Found", 404, "Account not found"));
        }
    }
}