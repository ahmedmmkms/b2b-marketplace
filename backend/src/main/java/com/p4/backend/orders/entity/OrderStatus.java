package com.p4.backend.orders.entity;

public enum OrderStatus {
    PENDING,        // Order created but not yet confirmed
    PLACED,         // Order placed by buyer
    CONFIRMED,      // Order confirmed by vendor
    SHIPPED,        // Order shipped
    DELIVERED,      // Order delivered
    CANCELLED,      // Order cancelled
    REFUNDED        // Order refunded
}