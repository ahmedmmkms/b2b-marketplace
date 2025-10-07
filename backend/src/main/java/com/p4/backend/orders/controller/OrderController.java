package com.p4.backend.orders.controller;

import com.p4.backend.orders.entity.Order;
import com.p4.backend.orders.service.OrderService;
import com.p4.backend.shared.config.FeatureFlagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private FeatureFlagsService featureFlagsService;

    @PostMapping("/from-quote/{quoteId}")
    public ResponseEntity<?> createOrderFromQuote(@PathVariable String quoteId) {
        if (!featureFlagsService.isOrdersCheckoutEnabled()) {
            return ResponseEntity.badRequest().body("Orders checkout is not enabled");
        }

        Optional<Order> orderOpt = orderService.createOrderFromAcceptedQuote(quoteId);
        if (orderOpt.isPresent()) {
            return ResponseEntity.ok(orderOpt.get());
        } else {
            return ResponseEntity.badRequest().body("Could not create order from quote: " + quoteId);
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable String orderId) {
        if (!featureFlagsService.isOrdersCheckoutEnabled()) {
            return ResponseEntity.badRequest().body("Orders checkout is not enabled");
        }

        Optional<Order> orderOpt = orderService.findByQuoteId(orderId);
        if (orderOpt.isPresent()) {
            return ResponseEntity.ok(orderOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/po/{poNumber}")
    public ResponseEntity<?> getOrderByPoNumber(@PathVariable String poNumber) {
        if (!featureFlagsService.isOrdersCheckoutEnabled()) {
            return ResponseEntity.badRequest().body("Orders checkout is not enabled");
        }

        Optional<Order> orderOpt = orderService.findByPoNumber(poNumber);
        if (orderOpt.isPresent()) {
            return ResponseEntity.ok(orderOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/buyer/{buyerAccountId}")
    public ResponseEntity<List<Order>> getOrdersByBuyer(@PathVariable String buyerAccountId) {
        if (!featureFlagsService.isOrdersCheckoutEnabled()) {
            return ResponseEntity.badRequest().build();
        }

        List<Order> orders = orderService.findByBuyerAccountId(buyerAccountId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/vendor/{vendorAccountId}")
    public ResponseEntity<List<Order>> getOrdersByVendor(@PathVariable String vendorAccountId) {
        if (!featureFlagsService.isOrdersCheckoutEnabled()) {
            return ResponseEntity.badRequest().build();
        }

        List<Order> orders = orderService.findByVendorAccountId(vendorAccountId);
        return ResponseEntity.ok(orders);
    }
}