package com.p4.backend.identity.repository;

import com.p4.backend.identity.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
    Optional<UserAccount> findByEmailIgnoreCase(String email);
    Optional<UserAccount> findByEmailIgnoreCaseAndIsActiveTrue(String email);
}
