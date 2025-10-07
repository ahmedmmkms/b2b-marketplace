package com.p4.backend.identity.repository;

import com.p4.backend.identity.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByCompanyEmail(String companyEmail);
    List<Account> findByStatus(Account.AccountStatus status);
    List<Account> findByType(Account.AccountType type);
}