package com.p4.backend.orders.service;

import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.orders.model.Order;
import com.p4.backend.orders.model.OrderLine;
import com.p4.backend.orders.repository.OrderLineRepository;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.quotes.model.Quote;
import com.p4.backend.quotes.model.QuoteLine;
import com.p4.backend.quotes.repository.QuoteLineRepository;
import com.p4.backend.quotes.repository.QuoteRepository;
import com.p4.backend.rfq.model.RFQ;
import com.p4.backend.rfq.repository.RFQRepository;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderLineRepository orderLineRepository;
    
    @Autowired
    private QuoteRepository quoteRepository;
    
    @Autowired
    private QuoteLineRepository quoteLineRepository;
    
    @Autowired
    private RFQRepository rfqRepository;
    
    @Autowired
    private MeterRegistry meterRegistry;
    
    private final Counter orderCreateCounter;
    private final Counter orderConflictCounter;
    private final Counter orderNotFoundCounter;
    private final Timer orderServiceTimer;
    
    public OrderService(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        
        this.orderCreateCounter = Counter.builder("service_operations_total")
                .description("Total number of successful order creation operations")
                .tag("service", "OrderService")
                .tag("operation", "createOrderFromQuote")
                .tag("result", "success")
                .register(meterRegistry);
                
        this.orderConflictCounter = Counter.builder("service_operations_total")
                .description("Total number of failed order creation operations due to conflict")
                .tag("service", "OrderService")
                .tag("operation", "createOrderFromQuote")
                .tag("result", "conflict")
                .register(meterRegistry);
                
        this.orderNotFoundCounter = Counter.builder("service_operations_total")
                .description("Total number of failed operations due to order not found")
                .tag("service", "OrderService")
                .tag("operation", "getOrderById")
                .tag("result", "not_found")
                .register(meterRegistry);
                
        this.orderServiceTimer = Timer.builder("service_operation_duration_seconds")
                .description("Service operation duration in seconds")
                .tag("service", "OrderService")
                .register(meterRegistry);
    }

    /**
     * Create an order from an accepted quote
     * @param quoteId The ID of the accepted quote to create an order from
     * @return Created order
     */
    @Transactional
    public Order createOrderFromQuote(String quoteId) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);
        
        logger.info("Creating order from accepted quote with id: {}, correlationId: {}", quoteId, correlationId);
        
        // Validate ULID format before querying database
        if (!ULIDGenerator.isValidULID(quoteId)) {
            logger.warn("Invalid ULID format for quoteId: {}, correlationId: {}", quoteId, correlationId);
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Quote ID must be a valid ULID format"
            );
        }
        
        // Check if an order already exists for this quote (unique constraint)
        Optional<Order> existingOrderOpt = orderRepository.findByQuoteId(quoteId);
        if (existingOrderOpt.isPresent()) {
            logger.warn("Order already exists for quoteId: {}, correlationId: {}", quoteId, correlationId);
            orderConflictCounter.increment();
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/order-already-exists",
                "Order already exists",
                "An order already exists for this quote"
            );
        }
        
        // Get the quote
        Optional<Quote> quoteOpt = quoteRepository.findById(quoteId);
        if (quoteOpt.isEmpty()) {
            logger.warn("Quote not found with id: {}, correlationId: {}", quoteId, correlationId);
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/quote-not-found",
                "Quote not found",
                "Quote with id '" + quoteId + "' does not exist"
            );
        }
        
        Quote quote = quoteOpt.get();
        
        // Validate that the quote is in 'accepted' status
        if (quote.getStatus() != Quote.Status.accepted) {
            logger.warn("Quote with id: {} is not accepted (status: {}), correlationId: {}", 
                       quoteId, quote.getStatus(), correlationId);
            orderConflictCounter.increment();
            throw new ProblemDetailException(
                HttpStatus.CONFLICT,
                "https://api.example.com/errors/quote-not-accepted",
                "Quote not accepted",
                "Order can only be created from an accepted quote"
            );
        }
        
        // Get the RFQ to get the buyer information
        Optional<RFQ> rfqOpt = rfqRepository.findById(quote.getRfqId());
        if (rfqOpt.isEmpty()) {
            logger.error("RFQ not found for quote id: {}, rfqId: {}, correlationId: {}", 
                        quoteId, quote.getRfqId(), correlationId);
            throw new ProblemDetailException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "https://api.example.com/errors/rfq-not-found",
                "RFQ not found",
                "RFQ for the quote does not exist"
            );
        }
        
        RFQ rfq = rfqOpt.get();
        
        // Create the order
        Order order = new Order();
        String orderId = ULIDGenerator.generateULID();
        order.setId(orderId);
        order.setBuyerId(rfq.getBuyerId()); // Use the buyer from the RFQ
        order.setQuoteId(quoteId);
        order.setCurrency(quote.getCurrency());
        order.setSubtotal(quote.getSubtotal());
        order.setTaxTotal(quote.getTaxTotal());
        order.setGrandTotal(quote.getGrandTotal());
        order.setStatus(Order.Status.placed);
        
        // Save the order first
        Order savedOrder = orderRepository.save(order);
        
        // Get quote lines to copy to order lines
        List<QuoteLine> quoteLines = quoteLineRepository.findByQuoteId(quoteId);
        List<OrderLine> orderLinesToPersist = new ArrayList<>();
        
        for (QuoteLine quoteLine : quoteLines) {
            OrderLine orderLine = new OrderLine();
            orderLine.setId(ULIDGenerator.generateULID());
            orderLine.setOrderId(savedOrder.getId());
            orderLine.setQuoteLineId(quoteLine.getId());
            orderLine.setDescription(quoteLine.getDescription());
            orderLine.setQuantity(quoteLine.getQuantity());
            orderLine.setUom(quoteLine.getUom());
            orderLine.setUnitPrice(quoteLine.getUnitPrice());
            orderLine.setLineTotal(quoteLine.getLineTotal());
            
            orderLinesToPersist.add(orderLine);
        }
        
        // Save all order lines
        orderLineRepository.saveAll(orderLinesToPersist);
        
        sample.stop(orderServiceTimer);
        orderCreateCounter.increment();
        
        logger.info("Successfully created order with id: {} from quote: {}, correlationId: {}", 
                   orderId, quoteId, correlationId);
        
        return savedOrder;
    }

    /**
     * Get an order by ID
     * @param orderId The ID of the order to retrieve
     * @return The order
     */
    public Order getOrderById(String orderId) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);
        
        logger.debug("Fetching order with id: {}, correlationId: {}", orderId, correlationId);
        
        // Validate ULID format before querying database
        if (!ULIDGenerator.isValidULID(orderId)) {
            logger.warn("Invalid ULID format for orderId: {}, correlationId: {}", orderId, correlationId);
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST,
                "https://api.example.com/errors/invalid-id",
                "Invalid ID format",
                "Order ID must be a valid ULID format"
            );
        }
        
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isEmpty()) {
            logger.warn("Order not found with id: {}, correlationId: {}", orderId, correlationId);
            sample.stop(orderServiceTimer);
            orderNotFoundCounter.increment();
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND,
                "https://api.example.com/errors/order-not-found",
                "Order not found",
                "Order with id '" + orderId + "' does not exist"
            );
        }
        
        sample.stop(orderServiceTimer);
        logger.debug("Successfully retrieved order with id: {}, correlationId: {}", orderId, correlationId);
        
        return orderOpt.get();
    }
}