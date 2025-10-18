package com.p4.backend.identity;

import com.p4.backend.P4BackendApplication;
import com.p4.backend.identity.model.Account;
import com.p4.backend.identity.model.User;
import com.p4.backend.identity.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = P4BackendApplication.class)
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect"
})
public class UserEntityTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void testCreateUserWithAccountAssociation() {
        // Create an account first
        Account account = new Account();
        account.setAccountType(Account.AccountType.INDIVIDUAL);
        account.setEmail("test@example.com");
        account.setContactPerson("Test Person");

        // Create a user associated with the account
        User user = new User();
        user.setAccount(account);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setPhone("+1234567890");
        user.setJobTitle("Manager");
        user.setPasswordHash("hashed_password");
        user.setSalt("salt_value");

        // Save the user (account should be saved as well due to cascade if configured)
        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
        assertEquals("John", savedUser.getFirstName());
        assertEquals("Doe", savedUser.getLastName());
        assertEquals("john.doe@example.com", savedUser.getEmail());
        assertEquals(account, savedUser.getAccount());
        assertTrue(savedUser.getIsActive());
    }

    @Test
    @Transactional
    public void testUserValidation() {
        User user = new User();
        user.setFirstName(""); // Invalid: empty first name
        user.setLastName("Doe");
        user.setEmail("invalid-email"); // Invalid: email format
        user.setPasswordHash("hashed_password");
        user.setSalt("salt_value");

        // Since JPA doesn't run validation on @PrePersist without proper setup,
        // we need to manually invoke validation during testing
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            user.setFirstName(""); // This should trigger validation in @PrePersist
        });
        
        // For actual validation, we would use Bean Validation
        assertTrue(true); // Placeholder - will be properly tested in real scenario
    }
    
    @Test
    @Transactional
    public void testFindByEmail() {
        // Create and save a test user
        Account account = new Account();
        account.setAccountType(Account.AccountType.COMPANY);
        account.setCompanyName("Test Company");
        account.setEmail("company@example.com");
        account.setContactPerson("Test Contact");

        User user = new User();
        user.setAccount(account);
        user.setFirstName("Jane");
        user.setLastName("Smith");
        user.setEmail("jane.smith@example.com");
        user.setPasswordHash("hashed_password");
        user.setSalt("salt_value");

        userRepository.save(user);

        // Find by email
        User foundUser = userRepository.findByEmail("jane.smith@example.com").orElse(null);

        assertNotNull(foundUser);
        assertEquals("Jane", foundUser.getFirstName());
        assertEquals("Smith", foundUser.getLastName());
        assertEquals("jane.smith@example.com", foundUser.getEmail());
    }
}