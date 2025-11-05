package com.p4.backend.orders.repository;

import com.p4.backend.orders.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    
    Optional<Order> findByQuoteId(String quoteId);
    
    List<Order> findByBuyerId(String buyerId);
}