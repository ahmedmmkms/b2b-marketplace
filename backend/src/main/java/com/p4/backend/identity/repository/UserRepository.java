package com.p4.backend.identity.repository;

import com.p4.backend.identity.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    List<User> findByAccountId(String accountId);
    List<User> findByStatus(User.UserStatus status);
    Optional<User> findByEmailAndStatus(String email, User.UserStatus status);
}