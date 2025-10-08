package com.p4.backend.orders.service;

import com.p4.backend.orders.entity.*;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.QuoteLine;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.repository.QuoteLineRepository;
import com.p4.backend.rfq.repository.QuoteRepository;
import com.p4.backend.rfq.repository.RfqRepository;
import com.p4.backend.shared.vo.Money;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private QuoteLineRepository quoteLineRepository;

    @Autowired
    private RfqRepository rfqRepository;

    @Transactional
    public Optional<Order> createOrderFromAcceptedQuote(String quoteId) {
        // Find the accepted quote
        Optional<Quote> quoteOpt = quoteRepository.findById(quoteId);
        if (quoteOpt.isEmpty() || quoteOpt.get().getStatus() != com.p4.backend.rfq.entity.Quote.QuoteStatus.ACCEPTED) {
            return Optional.empty();
        }

        Quote quote = quoteOpt.get();

        // Get quote lines using the quoteLineRepository
        List<QuoteLine> quoteLines = quoteLineRepository.findByQuoteId(quoteId);

        // Get the associated RFQ to get account IDs
        Optional<Rfq> rfqOpt = rfqRepository.findById(quote.getRfqId());
        if (rfqOpt.isEmpty()) {
            return Optional.empty(); // Can't create order without associated RFQ
        }
        Rfq rfq = rfqOpt.get();

        // Create order lines from quote lines
        List<OrderLine> orderLines = new ArrayList<>();
        Money totalAmount = Money.zero(quote.getCurrency());

        for (QuoteLine quoteLine : quoteLines) {
            // Create Money object from BigDecimal values
            Money unitPrice = new Money(quoteLine.getUnitPrice(), quote.getCurrency());
            Money lineTotal = new Money(quoteLine.getLineTotal(), quote.getCurrency());

            OrderLine orderLine = new OrderLine(
                null, // Order will be set later
                quoteLine.getRfqLineId(), // Using rfqLineId as the product reference
                "Product from RFQ", // Need to get product name from elsewhere in a full implementation
                quoteLine.getQuantity(),
                unitPrice,
                lineTotal
            );

            orderLines.add(orderLine);
            totalAmount = totalAmount.add(lineTotal);
        }

        // Generate a unique PO number
        String poNumber = "PO-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Create the order
        Order order = new Order(
            quote.getId(),
            rfq.getAccountId(), // Get buyer account ID from the associated RFQ
            quote.getVendorId(), // Use the vendor ID from the quote
            poNumber,
            totalAmount,
            orderLines
        );

        // Set the order reference in each order line
        for (OrderLine orderLine : orderLines) {
            orderLine.setOrder(order);
        }

        // Save the order with cascade to order lines
        Order savedOrder = orderRepository.save(order);
        return Optional.of(savedOrder);
    }

    @Transactional
    public Optional<Order> updateOrderStatus(String orderId, OrderStatus newStatus) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isEmpty()) {
            return Optional.empty();
        }

        Order order = orderOpt.get();
        order.setStatus(newStatus);
        order.setUpdatedAt(LocalDateTime.now());

        if (newStatus == OrderStatus.CONFIRMED && order.getConfirmedAt() == null) {
            order.setConfirmedAt(LocalDateTime.now());
        } else if (newStatus == OrderStatus.CANCELLED && order.getCancelledAt() == null) {
            order.setCancelledAt(LocalDateTime.now());
        }

        Order updatedOrder = orderRepository.save(order);
        return Optional.of(updatedOrder);
    }

    public Optional<Order> findByPoNumber(String poNumber) {
        return orderRepository.findByPoNumber(poNumber);
    }

    public Optional<Order> findByQuoteId(String quoteId) {
        return orderRepository.findByQuoteId(quoteId);
    }

    public List<Order> findByBuyerAccountId(String buyerAccountId) {
        return orderRepository.findByBuyerAccountId(buyerAccountId);
    }

    public List<Order> findByVendorAccountId(String vendorAccountId) {
        return orderRepository.findByVendorAccountId(vendorAccountId);
    }
}