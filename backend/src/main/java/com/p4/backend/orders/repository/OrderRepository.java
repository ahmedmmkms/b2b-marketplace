package com.p4.backend.orders.repository;

import com.p4.backend.orders.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByBuyerAccountId(String buyerAccountId);
    List<Order> findByVendorAccountId(String vendorAccountId);
    Optional<Order> findByPoNumber(String poNumber);

    @Query("SELECT o FROM Order o WHERE o.quoteId = :quoteId")
    Optional<Order> findByQuoteId(@Param("quoteId") String quoteId);
}