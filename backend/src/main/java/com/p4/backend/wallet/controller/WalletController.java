package com.p4.backend.wallet.controller;

import com.p4.backend.shared.config.FeatureFlagsService;
import com.p4.backend.shared.vo.Money;
import com.p4.backend.wallet.entity.Wallet;
import com.p4.backend.wallet.entity.WalletTransaction;
import com.p4.backend.wallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private FeatureFlagsService featureFlagsService;

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getWallet(@PathVariable String accountId) {
        if (!featureFlagsService.isWalletBasicEnabled()) {
            return ResponseEntity.badRequest().body("Wallet feature is not enabled");
        }

        Optional<Wallet> walletOpt = walletService.findByAccountId(accountId);
        if (walletOpt.isPresent()) {
            return ResponseEntity.ok(walletOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/top-up")
    public ResponseEntity<?> topUpWallet(
            @RequestParam String accountId,
            @RequestParam BigDecimal amount,
            @RequestParam String currency,
            @RequestParam String description) {
        
        if (!featureFlagsService.isWalletBasicEnabled()) {
            return ResponseEntity.badRequest().body("Wallet feature is not enabled");
        }

        // For security, this endpoint should be restricted to operations staff only
        // In a real implementation, you would check user roles/permissions here

        Money topUpAmount = new Money(amount, currency);
        Optional<Wallet> walletOpt = walletService.topUpWallet(accountId, topUpAmount, description);
        
        if (walletOpt.isPresent()) {
            return ResponseEntity.ok(walletOpt.get());
        } else {
            return ResponseEntity.badRequest().body("Failed to top up wallet");
        }
    }

    @GetMapping("/transactions/{walletId}")
    public ResponseEntity<List<WalletTransaction>> getWalletTransactions(@PathVariable String walletId) {
        if (!featureFlagsService.isWalletBasicEnabled()) {
            return ResponseEntity.badRequest().build();
        }

        List<WalletTransaction> transactions = walletService.getWalletTransactions(walletId);
        return ResponseEntity.ok(transactions);
    }
}