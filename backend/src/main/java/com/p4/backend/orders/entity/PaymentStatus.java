package com.p4.backend.orders.entity;

public enum PaymentStatus {
    PENDING,        // Payment initiated but not yet processed
    PROCESSING,     // Payment is being processed by gateway
    COMPLETED,      // Payment completed successfully
    FAILED,         // Payment failed
    CANCELLED,      // Payment cancelled by user
    REFUNDED        // Payment refunded
}