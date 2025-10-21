# Task 4.2 Implementation: User Entity and Repository

## Overview
This document describes the implementation of the User entity and repository as part of Task 4.2 from the P4 Backend Features Re-Implementation Plan. The task required creating a User entity linked to Account with authentication fields.

## Implementation Details

### User Entity
The `User` entity is implemented in `com.p4.backend.identity.model.User` with the following features:

- **Relationships**: One-to-Many relationship with Account entity (many users can belong to one account)
- **Fields**:
  - Basic information: firstName, lastName, email, phone, jobTitle
  - Account association: accountId (foreign key to Account)
  - Authentication fields: passwordHash, salt, failedLoginAttempts, lockedUntil
  - Status fields: isActive, lastLoginAt
  - Inherited from Base entity: id (ULID), createdAt, updatedAt

### User Repository
The `UserRepository` interface is implemented in `com.p4.backend.identity.repository.UserRepository` with the following methods:

- `findByEmail(String email)`: Find a user by their email address
- `findByAccountId(String accountId)`: Find all users associated with an account
- `findActiveUsersByAccountId(String accountId)`: Find only active users for an account
- `existsByEmail(String email)`: Check if a user exists with the given email
- `existsByEmailAndIdNot(String email, String id)`: Check if another user exists with the given email

### Validation
The User entity includes comprehensive validation:
- Email must be valid and unique
- First name and last name are required
- Phone number must match international format
- All fields have appropriate size limits
- Business logic validation in `@PrePersist` and `@PreUpdate`

### Dependencies
- Task 4.1 (Account entity): User entity references Account
- Task 3.1 (Base entity): User extends Base entity with ULID, createdAt, updatedAt

## Database Schema
The User entity maps to the "users" table in the database with the following structure:
```
Table: users
- id (ULID, primary key)
- created_at (timestamp)
- updated_at (timestamp)
- account_id (foreign key to accounts table)
- first_name (varchar 100, not null)
- last_name (varchar 100, not null)
- email (varchar 255, unique, not null)
- phone (varchar 20)
- job_title (varchar 100)
- is_active (boolean, not null, default true)
- last_login_at (timestamp)
- password_hash (varchar 255, not null)
- salt (varchar 255, not null)
- failed_login_attempts (integer, default 0)
- locked_until (timestamp)
```

## Acceptance Testing
A production acceptance test script (`task4.2-production-acceptance-test.py`) was created to verify:

1. Creation of users with proper account associations
2. Retrieval of users by ID and email
3. Update functionality
4. Finding users by account ID
5. Proper account-user relationship verification

The test script includes proper cleanup to remove test data after execution.

## Usage Example
```java
// Create a new user
Account account = accountRepository.findById(accountId).orElse(null);

User user = new User();
user.setAccount(account);
user.setFirstName("John");
user.setLastName("Doe");
user.setEmail("john.doe@example.com");
user.setPasswordHash("hashed_password");
user.setSalt("salt_value");

User savedUser = userRepository.save(user);

// Find users for an account
List<User> users = userRepository.findByAccountId(accountId);
```

## Security Considerations
- Passwords are stored as salted hashes (implementation for actual hashing to be added)
- User access is tied to account membership
- Active/inactive status controls user access
- Failed login attempts tracking for security

## Future Enhancements
- Password reset functionality
- User roles and permissions
- Two-factor authentication
- Login attempt monitoring and suspicious activity detection