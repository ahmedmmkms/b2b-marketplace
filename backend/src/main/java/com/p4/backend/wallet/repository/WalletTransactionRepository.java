package com.p4.backend.wallet.repository;

import com.p4.backend.wallet.entity.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, String> {
    List<WalletTransaction> findByWalletId(String walletId);
    List<WalletTransaction> findByWalletIdOrderByCreatedAtDesc(String walletId);
}