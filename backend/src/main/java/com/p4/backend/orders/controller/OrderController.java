package com.p4.backend.orders.controller;

import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.orders.dto.OrderCreate;
import com.p4.backend.orders.dto.OrderResponse;
import com.p4.backend.orders.model.Order;
import com.p4.backend.orders.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    /**
     * Create an order from an accepted quote
     */
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderCreate orderCreate) {
        // Create order from the accepted quote
        Order order = orderService.createOrderFromQuote(orderCreate.getQuoteId());
        
        // Convert to response DTO
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setBuyerId(order.getBuyerId());
        response.setQuoteId(order.getQuoteId());
        response.setStatus(order.getStatus().name());
        response.setCurrency(order.getCurrency());
        response.setSubtotal(order.getSubtotal());
        response.setTaxTotal(order.getTaxTotal());
        response.setGrandTotal(order.getGrandTotal());
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get an order by ID
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable String orderId) {
        Order order = orderService.getOrderById(orderId);
        
        // Convert to response DTO
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setBuyerId(order.getBuyerId());
        response.setQuoteId(order.getQuoteId());
        response.setStatus(order.getStatus().name());
        response.setCurrency(order.getCurrency());
        response.setSubtotal(order.getSubtotal());
        response.setTaxTotal(order.getTaxTotal());
        response.setGrandTotal(order.getGrandTotal());
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        
        return ResponseEntity.ok(response);
    }
}