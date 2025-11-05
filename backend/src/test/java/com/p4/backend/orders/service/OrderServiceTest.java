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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderLineRepository orderLineRepository;

    @Mock
    private QuoteRepository quoteRepository;

    @Mock
    private QuoteLineRepository quoteLineRepository;

    @Mock
    private RFQRepository rfqRepository;

    private OrderService orderService;

    @BeforeEach
    void setUp() {
        orderService = new OrderService();
        ReflectionTestUtils.setField(orderService, "orderRepository", orderRepository);
        ReflectionTestUtils.setField(orderService, "orderLineRepository", orderLineRepository);
        ReflectionTestUtils.setField(orderService, "quoteRepository", quoteRepository);
        ReflectionTestUtils.setField(orderService, "quoteLineRepository", quoteLineRepository);
        ReflectionTestUtils.setField(orderService, "rfqRepository", rfqRepository);
    }

    @Test
    void testCreateOrderFromQuote_Success() {
        // Arrange
        String quoteId = ULIDGenerator.generateULID();
        String buyerId = ULIDGenerator.generateULID();
        String rfqId = ULIDGenerator.generateULID();

        // Mock quote
        Quote quote = new Quote();
        quote.setId(quoteId);
        quote.setRfqId(rfqId);
        quote.setStatus(Quote.Status.accepted); // Must be accepted
        quote.setCurrency("USD");
        quote.setSubtotal(BigDecimal.valueOf(1000.00));
        quote.setTaxTotal(BigDecimal.ZERO);
        quote.setGrandTotal(BigDecimal.valueOf(1000.00));

        // Mock RFQ
        RFQ rfq = new RFQ();
        rfq.setId(rfqId);
        rfq.setBuyerId(buyerId);

        // Mock quote line
        QuoteLine quoteLine = new QuoteLine();
        quoteLine.setId(ULIDGenerator.generateULID());
        quoteLine.setQuoteId(quoteId);
        quoteLine.setDescription("Test Line");
        quoteLine.setQuantity(BigDecimal.valueOf(10));
        quoteLine.setUom("EA");
        quoteLine.setUnitPrice(BigDecimal.valueOf(100.00));
        quoteLine.setLineTotal(BigDecimal.valueOf(1000.00));

        // Mock dependencies
        when(orderRepository.findByQuoteId(quoteId)).thenReturn(Optional.empty()); // No existing order
        when(quoteRepository.findById(quoteId)).thenReturn(Optional.of(quote));
        when(rfqRepository.findById(rfqId)).thenReturn(Optional.of(rfq));
        when(quoteLineRepository.findByQuoteId(quoteId)).thenReturn(Arrays.asList(quoteLine));

        // Mock saved order
        Order savedOrder = new Order();
        savedOrder.setId(ULIDGenerator.generateULID());
        savedOrder.setBuyerId(buyerId);
        savedOrder.setQuoteId(quoteId);
        savedOrder.setCurrency("USD");
        savedOrder.setSubtotal(BigDecimal.valueOf(1000.00));
        savedOrder.setTaxTotal(BigDecimal.ZERO);
        savedOrder.setGrandTotal(BigDecimal.valueOf(1000.00));
        savedOrder.setStatus(Order.Status.placed);

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        // Mock saved order line
        OrderLine savedOrderLine = new OrderLine();
        savedOrderLine.setId(ULIDGenerator.generateULID());
        savedOrderLine.setOrderId(savedOrder.getId());
        savedOrderLine.setQuoteLineId(quoteLine.getId());
        savedOrderLine.setDescription("Test Line");
        savedOrderLine.setQuantity(BigDecimal.valueOf(10));
        savedOrderLine.setUom("EA");
        savedOrderLine.setUnitPrice(BigDecimal.valueOf(100.00));
        savedOrderLine.setLineTotal(BigDecimal.valueOf(1000.00));

        when(orderLineRepository.saveAll(any())).thenReturn(Arrays.asList(savedOrderLine));

        // Act
        Order result = orderService.createOrderFromQuote(quoteId);

        // Assert
        assertNotNull(result.getId());
        assertEquals(buyerId, result.getBuyerId());
        assertEquals(quoteId, result.getQuoteId());
        assertEquals("USD", result.getCurrency());
        assertEquals(BigDecimal.valueOf(1000.00), result.getSubtotal());
        assertEquals(BigDecimal.ZERO, result.getTaxTotal());
        assertEquals(BigDecimal.valueOf(1000.00), result.getGrandTotal());
        assertEquals(Order.Status.placed, result.getStatus());

        // Verify interactions
        verify(orderRepository).findByQuoteId(quoteId);
        verify(quoteRepository).findById(quoteId);
        verify(rfqRepository).findById(rfqId);
        verify(quoteLineRepository).findByQuoteId(quoteId);
        verify(orderRepository).save(any(Order.class));
        verify(orderLineRepository).saveAll(any());
    }

    @Test
    void testCreateOrderFromQuote_InvalidULID() {
        // Arrange
        String invalidQuoteId = "invalid-ulid";

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> orderService.createOrderFromQuote(invalidQuoteId));
        assertEquals(org.springframework.http.HttpStatus.BAD_REQUEST, exception.getStatus());
        assertTrue(exception.getDetail().contains("Quote ID must be a valid ULID format"));
    }

    @Test
    void testCreateOrderFromQuote_OrderAlreadyExists() {
        // Arrange
        String quoteId = ULIDGenerator.generateULID();

        // Mock existing order for the quote
        Order existingOrder = new Order();
        existingOrder.setId(ULIDGenerator.generateULID());
        existingOrder.setQuoteId(quoteId);

        when(orderRepository.findByQuoteId(quoteId)).thenReturn(Optional.of(existingOrder));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> orderService.createOrderFromQuote(quoteId));
        assertEquals(org.springframework.http.HttpStatus.CONFLICT, exception.getStatus());
        assertTrue(exception.getDetail().contains("An order already exists for this quote"));
        verify(orderRepository).findByQuoteId(quoteId);
    }

    @Test
    void testCreateOrderFromQuote_QuoteNotFound() {
        // Arrange
        String quoteId = ULIDGenerator.generateULID();

        when(orderRepository.findByQuoteId(quoteId)).thenReturn(Optional.empty());
        when(quoteRepository.findById(quoteId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> orderService.createOrderFromQuote(quoteId));
        assertEquals(org.springframework.http.HttpStatus.NOT_FOUND, exception.getStatus());
        assertTrue(exception.getDetail().contains("does not exist"));
        verify(quoteRepository).findById(quoteId);
    }

    @Test
    void testCreateOrderFromQuote_QuoteNotAccepted() {
        // Arrange
        String quoteId = ULIDGenerator.generateULID();
        String rfqId = ULIDGenerator.generateULID();

        // Mock quote with status other than accepted
        Quote quote = new Quote();
        quote.setId(quoteId);
        quote.setRfqId(rfqId);
        quote.setStatus(Quote.Status.submitted); // Not accepted

        when(orderRepository.findByQuoteId(quoteId)).thenReturn(Optional.empty());
        when(quoteRepository.findById(quoteId)).thenReturn(Optional.of(quote));

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> orderService.createOrderFromQuote(quoteId));
        assertEquals(org.springframework.http.HttpStatus.CONFLICT, exception.getStatus());
        assertTrue(exception.getDetail().contains("Order can only be created from an accepted quote"));
        verify(quoteRepository).findById(quoteId);
    }

    @Test
    void testCreateOrderFromQuote_RFQNotFound() {
        // Arrange
        String quoteId = ULIDGenerator.generateULID();
        String rfqId = ULIDGenerator.generateULID();

        // Mock quote as accepted
        Quote quote = new Quote();
        quote.setId(quoteId);
        quote.setRfqId(rfqId);
        quote.setStatus(Quote.Status.accepted);

        // Mock RFQ not found
        when(orderRepository.findByQuoteId(quoteId)).thenReturn(Optional.empty());
        when(quoteRepository.findById(quoteId)).thenReturn(Optional.of(quote));
        when(rfqRepository.findById(rfqId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> orderService.createOrderFromQuote(quoteId));
        assertEquals(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatus());
        assertTrue(exception.getDetail().contains("RFQ for the quote does not exist"));
        verify(rfqRepository).findById(rfqId);
    }

    @Test
    void testGetOrderById_Success() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();

        Order order = new Order();
        order.setId(orderId);
        order.setBuyerId(ULIDGenerator.generateULID());
        order.setQuoteId(ULIDGenerator.generateULID());
        order.setCurrency("USD");
        order.setSubtotal(BigDecimal.valueOf(1000.00));
        order.setTaxTotal(BigDecimal.ZERO);
        order.setGrandTotal(BigDecimal.valueOf(1000.00));

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        // Act
        Order result = orderService.getOrderById(orderId);

        // Assert
        assertEquals(orderId, result.getId());
        verify(orderRepository).findById(orderId);
    }

    @Test
    void testGetOrderById_InvalidULID() {
        // Arrange
        String invalidOrderId = "invalid-ulid";

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> orderService.getOrderById(invalidOrderId));
        assertEquals(org.springframework.http.HttpStatus.BAD_REQUEST, exception.getStatus());
        assertTrue(exception.getDetail().contains("Order ID must be a valid ULID format"));
    }

    @Test
    void testGetOrderById_OrderNotFound() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();

        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class,
            () -> orderService.getOrderById(orderId));
        assertEquals(org.springframework.http.HttpStatus.NOT_FOUND, exception.getStatus());
        assertTrue(exception.getDetail().contains("does not exist"));
        verify(orderRepository).findById(orderId);
    }
}