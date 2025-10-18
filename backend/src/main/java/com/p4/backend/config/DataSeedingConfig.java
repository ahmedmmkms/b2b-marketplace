package com.p4.backend.config;

import com.p4.backend.identity.model.Account;
import com.p4.backend.identity.model.User;
import com.p4.backend.identity.repository.AccountRepository;
import com.p4.backend.identity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Profile("dev") // Only run in dev profile
public class DataSeedingConfig implements CommandLineRunner {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if test user already exists to avoid duplication
        Optional<User> existingUser = userRepository.findByEmail("admin@example.com");
        if (existingUser.isPresent()) {
            System.out.println("Test user already exists, skipping seeding.");
            return;
        }

        // Create a test account
        Account testAccount = new Account();
        testAccount.setAccountType(Account.AccountType.COMPANY);
        testAccount.setContactPerson("Admin User");
        testAccount.setEmail("admin@example.com");
        testAccount.setCompanyName("Test Company");
        testAccount.setStatus(Account.AccountStatus.ACTIVE);
        testAccount.setKycVerified(true);

        Account savedAccount = accountRepository.save(testAccount);
        System.out.println("Created test account: " + savedAccount.getId());

        // Create a test user
        User testUser = new User();
        testUser.setAccount(savedAccount);
        testUser.setFirstName("Admin");
        testUser.setLastName("User");
        testUser.setEmail("admin@example.com");
        testUser.setPhone("+1234567890");
        testUser.setIsActive(true);
        testUser.setPasswordHash("$2a$10$Vlpt1bZR1zZ5RDG4Hgk6c.3Z.xXh5V0YzqQJ8Y8j35X3d572Kvq6S"); // password: "password"
        testUser.setSalt("salt");

        User savedUser = userRepository.save(testUser);
        System.out.println("Created test user: " + savedUser.getId());
    }
}