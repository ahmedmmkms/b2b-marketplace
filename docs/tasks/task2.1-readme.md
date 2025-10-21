# Task 2.1: Money Value Object Implementation

## Description
Implemented the Money value object as part of the common shared kernel for the P4 B2B marketplace backend. The Money class provides a robust, immutable representation of monetary amounts with currency handling.

## Files Created

### 1. Money Value Object
- **File**: `backend/src/main/java/com/p4/backend/shared/kernel/Money.java`
- **Purpose**: Represents monetary amounts with currency, supporting arithmetic operations and comparisons

### 2. Test Controller
- **File**: `backend/src/main/java/com/p4/backend/test/MoneyTestController.java`
- **Purpose**: Provides an API endpoint to test Money functionality in production

### 3. Production Test Script
- **File**: `test_money_value_object.py`
- **Purpose**: Validates Money functionality against the Azure deployment

## Features of the Money Value Object

- **Immutability**: Once created, Money objects cannot be changed
- **Currency Handling**: Enforces currency consistency in operations
- **Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Comparison Operations**: Greater than, less than, equal to comparisons
- **Sign Operations**: Check if amount is positive, negative, or zero
- **Proper Rounding**: Uses BigDecimal with appropriate rounding to avoid floating point errors

## Acceptance Criteria Met

1. Money objects correctly handle arithmetic operations
2. Currency consistency is enforced across operations
3. Proper validation and error handling
4. Serialization/deserialization support via Jackson annotations
5. Production test script validates functionality in Azure deployment

## API Endpoint for Testing

The test controller exposes the following endpoint:
- POST `/api/test/money` - Performs various operations on Money objects

## Usage Example

```java
Currency usd = Currency.getInstance("USD");
Money price1 = new Money(100.50, usd);
Money price2 = new Money(50.25, usd);

Money total = price1.add(price2);  // 150.75 USD
Money discounted = price1.multiply(0.9);  // 90.45 USD
boolean isExpensive = price1.isGreaterThan(price2);  // true
```

## Testing

To run the production acceptance test:
```bash
python test_money_value_object.py
```

The test will verify that:
1. The backend service is accessible
2. Money operations work correctly
3. The value object behaves as expected in the production environment