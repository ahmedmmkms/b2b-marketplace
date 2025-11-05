package com.p4.backend.orders.repository;

import com.p4.backend.orders.model.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, String> {
    
    List<OrderLine> findByOrderId(String orderId);
    
    List<OrderLine> findByQuoteLineId(String quoteLineId);
}