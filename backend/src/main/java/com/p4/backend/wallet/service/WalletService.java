package com.p4.backend.wallet.service;

import com.p4.backend.orders.entity.Order;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.shared.vo.Money;
import com.p4.backend.wallet.entity.Wallet;
import com.p4.backend.wallet.entity.WalletTransaction;
import com.p4.backend.wallet.repository.WalletRepository;
import com.p4.backend.wallet.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Optional<Wallet> createWallet(String accountId, Money initialBalance) {
        // Check if wallet already exists for this account
        Optional<Wallet> existingWallet = walletRepository.findByAccountId(accountId);
        if (existingWallet.isPresent()) {
            return Optional.empty(); // Wallet already exists
        }

        Wallet wallet = new Wallet(accountId, initialBalance);
        Wallet savedWallet = walletRepository.save(wallet);

        // If initial balance is provided, create a top-up transaction
        if (initialBalance != null && initialBalance.isPositive()) {
            WalletTransaction topUpTransaction = new WalletTransaction(
                    savedWallet.getId(),
                    WalletTransaction.TransactionType.TOP_UP,
                    initialBalance,
                    "Initial wallet setup",
                    null
            );
            walletTransactionRepository.save(topUpTransaction);
        }

        return Optional.of(savedWallet);
    }

    @Transactional
    public Optional<Wallet> topUpWallet(String accountId, Money amount, String description) {
        Optional<Wallet> walletOpt = walletRepository.findByAccountId(accountId);
        if (walletOpt.isEmpty()) {
            return Optional.empty();
        }

        Wallet wallet = walletOpt.get();
        // Update the wallet balance
        Money newBalance = wallet.getBalance().add(amount);
        wallet.setBalance(newBalance);
        wallet.setUpdatedAt(java.time.LocalDateTime.now());

        Wallet updatedWallet = walletRepository.save(wallet);

        // Create a top-up transaction record
        WalletTransaction topUpTransaction = new WalletTransaction(
                updatedWallet.getId(),
                WalletTransaction.TransactionType.TOP_UP,
                amount,
                description,
                null
        );
        walletTransactionRepository.save(topUpTransaction);

        return Optional.of(updatedWallet);
    }

    @Transactional
    public Optional<Wallet> debitWalletForOrder(String accountId, String orderId, Money amount, String description) {
        Optional<Wallet> walletOpt = walletRepository.findByAccountId(accountId);
        if (walletOpt.isEmpty()) {
            return Optional.empty();
        }

        Wallet wallet = walletOpt.get();

        // Check if wallet has sufficient balance
        if (wallet.getBalance().getAmount().compareTo(amount.getAmount()) < 0) {
            return Optional.empty(); // Insufficient balance
        }

        // Update the wallet balance
        Money newBalance = wallet.getBalance().subtract(amount);
        wallet.setBalance(newBalance);
        wallet.setUpdatedAt(java.time.LocalDateTime.now());

        Wallet updatedWallet = walletRepository.save(wallet);

        // Create a debit transaction record
        WalletTransaction debitTransaction = new WalletTransaction(
                updatedWallet.getId(),
                WalletTransaction.TransactionType.DEBIT,
                amount,
                description,
                orderId
        );
        walletTransactionRepository.save(debitTransaction);

        return Optional.of(updatedWallet);
    }

    public Optional<Wallet> findByAccountId(String accountId) {
        return walletRepository.findByAccountId(accountId);
    }

    public List<WalletTransaction> getWalletTransactions(String walletId) {
        return walletTransactionRepository.findByWalletIdOrderByCreatedAtDesc(walletId);
    }
}