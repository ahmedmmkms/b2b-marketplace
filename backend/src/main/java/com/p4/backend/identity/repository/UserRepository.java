package com.p4.backend.identity.repository;

import com.p4.backend.identity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.account.id = :accountId")
    List<User> findByAccountId(@Param("accountId") String accountId);

    @Query("SELECT u FROM User u WHERE u.account.id = :accountId AND u.isActive = true")
    List<User> findActiveUsersByAccountId(@Param("accountId") String accountId);

    boolean existsByEmail(String email);
    
    boolean existsByEmailAndIdNot(String email, String id);
}