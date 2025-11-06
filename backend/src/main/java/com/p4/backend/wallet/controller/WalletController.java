package com.p4.backend.wallet.controller;

import com.p4.backend.common.exception.RFC7807Exception;
import com.p4.backend.wallet.dto.WalletResponse;
import com.p4.backend.wallet.dto.WalletTopupRequest;
import com.p4.backend.wallet.dto.WalletTransactionResponse;
import com.p4.backend.wallet.service.WalletService;
import io.micrometer.core.annotation.Timed;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/{orgId}")
    @Timed("http.server.requests")
    public ResponseEntity<WalletResponse> getWallet(@PathVariable String orgId) {
        WalletResponse response = walletService.getOrCreateWallet(orgId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{orgId}/topups")
    @Timed("http.server.requests")
    public ResponseEntity<WalletTransactionResponse> topupWallet(@PathVariable String orgId, 
                                                                 @Valid @RequestBody WalletTopupRequest request) {
        WalletTransactionResponse response = walletService.topupWallet(orgId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}