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
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class WalletService {

    private static final Logger logger = LoggerFactory.getLogger(WalletService.class);

    @Autowired
    protected WalletRepository walletRepository;

    @Autowired
    protected WalletTransactionRepository walletTransactionRepository;

    @Autowired
    protected OrganizationRepository organizationRepository;

    @Autowired
    protected MeterRegistry meterRegistry;

    private final Counter walletGetCounter;
    private final Counter walletTopupCounter;
    private final Timer walletServiceTimer;

    public WalletService(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;

        this.walletGetCounter = Counter.builder("service_operations_total")
                .description("Total number of successful wallet get operations")
                .tag("service", "WalletService")
                .tag("operation", "getOrCreateWallet")
                .tag("result", "success")
                .register(meterRegistry);

        this.walletTopupCounter = Counter.builder("service_operations_total")
                .description("Total number of successful wallet topup operations")
                .tag("service", "WalletService")
                .tag("operation", "topupWallet")
                .tag("result", "success")
                .register(meterRegistry);

        this.walletServiceTimer = Timer.builder("service_operation_duration_seconds")
                .description("Service operation duration in seconds")
                .tag("service", "WalletService")
                .register(meterRegistry);
    }

    @Transactional
    public WalletResponse getOrCreateWallet(String orgId) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);

        logger.debug("Fetching or creating wallet for orgId: {}, correlationId: {}", orgId, correlationId);

        // First check if the organization exists
        if (!organizationRepository.existsById(orgId)) {
            logger.warn("Organization not found with id: {}, correlationId: {}", orgId, correlationId);
            throw new RFC7807Exception(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/organization-not-found",
                "Organization not found",
                "The specified organization does not exist"
            );
        }

        // Try to find existing wallet
        WalletResponse response = walletRepository.findByOrgId(orgId)
                .map(this::convertToResponse)  // If found, return it
                .orElseGet(() -> {           // If not found, create new one with zero balance
                    logger.info("Wallet not found for orgId: {}, creating new wallet, correlationId: {}", orgId, correlationId);
                    Wallet newWallet = new Wallet();
                    newWallet.setId(ULIDGenerator.generateULID());
                    newWallet.setOrgId(orgId);
                    newWallet.setBalance(BigDecimal.ZERO);
                    Wallet savedWallet = walletRepository.save(newWallet);
                    logger.info("Created new wallet with id: {} for orgId: {}, correlationId: {}", 
                               savedWallet.getId(), orgId, correlationId);
                    return convertToResponse(savedWallet);
                });

        sample.stop(walletServiceTimer);
        walletGetCounter.increment();

        logger.debug("Successfully retrieved wallet for orgId: {}, correlationId: {}", orgId, correlationId);
        return response;
    }

    @Transactional
    public WalletTransactionResponse topupWallet(String orgId, WalletTopupRequest request) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);

        logger.info("Processing wallet topup for orgId: {}, amount: {}, currency: {}, correlationId: {}", 
                   orgId, request.getAmount(), request.getCurrency(), correlationId);

        // Validate organization exists
        if (!organizationRepository.existsById(orgId)) {
            logger.warn("Organization not found with id: {}, correlationId: {}", orgId, correlationId);
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
                    logger.info("Wallet not found for orgId: {}, creating new wallet with currency: {}, correlationId: {}", 
                               orgId, request.getCurrency(), correlationId);
                    Wallet newWallet = new Wallet();
                    newWallet.setId(ULIDGenerator.generateULID());
                    newWallet.setOrgId(orgId);
                    newWallet.setCurrency(request.getCurrency());
                    newWallet.setBalance(BigDecimal.ZERO);
                    return walletRepository.save(newWallet);
                });

        // Verify currency matches
        if (!wallet.getCurrency().equals(request.getCurrency())) {
            logger.warn("Currency mismatch for orgId: {}, wallet currency: {}, request currency: {}, correlationId: {}", 
                       orgId, wallet.getCurrency(), request.getCurrency(), correlationId);
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

        sample.stop(walletServiceTimer);
        walletTopupCounter.increment();

        logger.info("Successfully processed wallet topup for orgId: {}, transaction id: {}, amount: {}, correlationId: {}", 
                   orgId, savedTransaction.getId(), request.getAmount(), correlationId);

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