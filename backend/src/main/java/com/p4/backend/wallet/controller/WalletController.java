package com.p4.backend.wallet.controller;

import com.p4.backend.wallet.dto.WalletResponse;
import com.p4.backend.wallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/{orgId}")
    public ResponseEntity<WalletResponse> getWallet(@PathVariable String orgId) {
        WalletResponse response = walletService.getOrCreateWallet(orgId);
        return ResponseEntity.ok(response);
    }
}