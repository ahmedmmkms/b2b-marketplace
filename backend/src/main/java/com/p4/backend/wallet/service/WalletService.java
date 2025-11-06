package com.p4.backend.wallet.service;

import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.common.exception.RFC7807Exception;
import com.p4.backend.wallet.dto.WalletResponse;
import com.p4.backend.wallet.dto.WalletTransactionResponse;
import com.p4.backend.wallet.dto.WalletTopupRequest;
import com.p4.backend.wallet.model.Wallet;
import com.p4.backend.wallet.model.WalletTransaction;
import com.p4.backend.wallet.repository.WalletRepository;
import com.p4.backend.wallet.repository.WalletTransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class WalletService {

    @Autowired
    protected WalletRepository walletRepository;

    @Autowired
    protected WalletTransactionRepository walletTransactionRepository;

    @Autowired
    protected OrganizationRepository organizationRepository;

    @Transactional
    public WalletResponse getOrCreateWallet(String orgId) {
        // First check if the organization exists
        if (!organizationRepository.existsById(orgId)) {
            throw new RFC7807Exception(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/organization-not-found",
                "Organization not found",
                "The specified organization does not exist"
            );
        }
        
        // Try to find existing wallet
        return walletRepository.findByOrgId(orgId)
                .map(this::convertToResponse)  // If found, return it
                .orElseGet(() -> {           // If not found, create new one with zero balance
                    Wallet newWallet = new Wallet();
                    newWallet.setId(ULIDGenerator.generateULID());
                    newWallet.setOrgId(orgId);
                    newWallet.setBalance(BigDecimal.ZERO);
                    Wallet savedWallet = walletRepository.save(newWallet);
                    return convertToResponse(savedWallet);
                });
    }

    @Transactional
    public WalletTransactionResponse topupWallet(String orgId, WalletTopupRequest request) {
        // Validate organization exists
        if (!organizationRepository.existsById(orgId)) {
            throw new RFC7807Exception(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/organization-not-found",
                "Organization not found",
                "The specified organization does not exist"
            );
        }

        // Get or create the wallet
        Wallet wallet = walletRepository.findByOrgId(orgId)
                .orElseGet(() -> {
                    Wallet newWallet = new Wallet();
                    newWallet.setId(ULIDGenerator.generateULID());
                    newWallet.setOrgId(orgId);
                    newWallet.setCurrency(request.getCurrency());
                    newWallet.setBalance(BigDecimal.ZERO);
                    return walletRepository.save(newWallet);
                });

        // Verify currency matches
        if (!wallet.getCurrency().equals(request.getCurrency())) {
            throw new RFC7807Exception(
                HttpStatus.UNPROCESSABLE_ENTITY,
                "https://api.example.com/errors/currency-mismatch",
                "Currency mismatch",
                "Requested currency does not match wallet currency"
            );
        }

        // Create the transaction
        WalletTransaction transaction = new WalletTransaction(wallet, WalletTransaction.TransactionType.topup, request.getAmount());
        WalletTransaction savedTransaction = walletTransactionRepository.save(transaction);

        // Update the wallet balance
        wallet.setBalance(wallet.getBalance().add(request.getAmount()));
        walletRepository.save(wallet);

        return new WalletTransactionResponse(savedTransaction);
    }

    private WalletResponse convertToResponse(Wallet wallet) {
        return new WalletResponse(
                wallet.getId(),
                wallet.getOrgId(),
                wallet.getCurrency(),
                wallet.getBalance()
        );
    }
}