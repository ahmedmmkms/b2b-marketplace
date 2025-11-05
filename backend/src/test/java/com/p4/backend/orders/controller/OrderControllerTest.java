package com.p4.backend.orders.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.orders.dto.OrderCreate;
import com.p4.backend.orders.dto.OrderResponse;
import com.p4.backend.orders.model.Order;
import com.p4.backend.orders.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class OrderControllerTest {

    private MockMvc mockMvc;

    @Mock
    private OrderService orderService;

    private JacksonTester<OrderCreate> jsonOrderCreate;
    private JacksonTester<OrderResponse> jsonOrderResponse;

    @BeforeEach
    void setUp() {
        JacksonTester.initFields(this, new ObjectMapper());
        mockMvc = MockMvcBuilders.standaloneSetup(new OrderController())
                .addPlaceholderValue("server.error.include-message", "always")
                .addPlaceholderValue("server.error.include-binding-errors", "always")
                .build();
        
        // Inject the mocked service
        mockMvc = MockMvcBuilders.standaloneSetup(new OrderController())
                .setControllerAdvice(new com.p4.backend.common.GlobalExceptionHandler())
                .build();
        
        // Since we can't easily inject the mock into the controller, we'll test differently
        // Let's rebuild with a custom setup
        OrderController controller = new OrderController();
        org.springframework.test.util.ReflectionTestUtils.setField(controller, "orderService", orderService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .setControllerAdvice(new com.p4.backend.common.GlobalExceptionHandler())
                .build();
    }

    @Test
    void testCreateOrder_Success() throws Exception {
        // Arrange
        String quoteId = ULIDGenerator.generateULID();
        String orderId = ULIDGenerator.generateULID();
        String buyerId = ULIDGenerator.generateULID();

        OrderCreate orderCreate = new OrderCreate();
        orderCreate.setQuoteId(quoteId);

        Order mockOrder = new Order();
        mockOrder.setId(orderId);
        mockOrder.setBuyerId(buyerId);
        mockOrder.setQuoteId(quoteId);
        mockOrder.setCurrency("USD");
        mockOrder.setSubtotal(BigDecimal.valueOf(1000.00));
        mockOrder.setTaxTotal(BigDecimal.ZERO);
        mockOrder.setGrandTotal(BigDecimal.valueOf(1000.00));
        mockOrder.setStatus(Order.Status.placed);
        mockOrder.setCreatedAt(OffsetDateTime.now());
        mockOrder.setUpdatedAt(OffsetDateTime.now());

        when(orderService.createOrderFromQuote(eq(quoteId))).thenReturn(mockOrder);

        // Act & Assert
        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(orderCreate)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(orderId))
                .andExpect(jsonPath("$.buyerId").value(buyerId))
                .andExpect(jsonPath("$.quoteId").value(quoteId))
                .andExpect(jsonPath("$.status").value("placed"))
                .andExpect(jsonPath("$.currency").value("USD"))
                .andExpect(jsonPath("$.subtotal").value(1000.00))
                .andExpect(jsonPath("$.taxTotal").value(0.0))
                .andExpect(jsonPath("$.grandTotal").value(1000.00));

        verify(orderService).createOrderFromQuote(eq(quoteId));
    }

    @Test
    void testCreateOrder_InvalidQuoteId() throws Exception {
        // Arrange
        OrderCreate orderCreate = new OrderCreate();
        orderCreate.setQuoteId("invalid-ulid"); // Invalid ULID

        ProblemDetailException problemDetailException = new ProblemDetailException(
            HttpStatus.BAD_REQUEST,
            "https://api.example.com/errors/invalid-id",
            "Invalid ID format",
            "Quote ID must be a valid ULID format"
        );

        when(orderService.createOrderFromQuote(eq("invalid-ulid"))).thenThrow(problemDetailException);

        // Act & Assert
        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(orderCreate)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Invalid ID format"))
                .andExpect(jsonPath("$.detail").value("Quote ID must be a valid ULID format"));

        verify(orderService).createOrderFromQuote(eq("invalid-ulid"));
    }

    @Test
    void testCreateOrder_OrderAlreadyExists() throws Exception {
        // Arrange
        String quoteId = ULIDGenerator.generateULID();

        OrderCreate orderCreate = new OrderCreate();
        orderCreate.setQuoteId(quoteId);

        ProblemDetailException problemDetailException = new ProblemDetailException(
            HttpStatus.CONFLICT,
            "https://api.example.com/errors/order-already-exists",
            "Order already exists",
            "An order already exists for this quote"
        );

        when(orderService.createOrderFromQuote(eq(quoteId))).thenThrow(problemDetailException);

        // Act & Assert
        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(orderCreate)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value("Order already exists"))
                .andExpect(jsonPath("$.detail").value("An order already exists for this quote"));

        verify(orderService).createOrderFromQuote(eq(quoteId));
    }

    @Test
    void testGetOrder_Success() throws Exception {
        // Arrange
        String orderId = ULIDGenerator.generateULID();
        String buyerId = ULIDGenerator.generateULID();
        String quoteId = ULIDGenerator.generateULID();

        Order mockOrder = new Order();
        mockOrder.setId(orderId);
        mockOrder.setBuyerId(buyerId);
        mockOrder.setQuoteId(quoteId);
        mockOrder.setCurrency("USD");
        mockOrder.setSubtotal(BigDecimal.valueOf(1000.00));
        mockOrder.setTaxTotal(BigDecimal.ZERO);
        mockOrder.setGrandTotal(BigDecimal.valueOf(1000.00));
        mockOrder.setStatus(Order.Status.placed);
        mockOrder.setCreatedAt(OffsetDateTime.now());
        mockOrder.setUpdatedAt(OffsetDateTime.now());

        when(orderService.getOrderById(eq(orderId))).thenReturn(mockOrder);

        // Act & Assert
        mockMvc.perform(get("/orders/{orderId}", orderId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(orderId))
                .andExpect(jsonPath("$.buyerId").value(buyerId))
                .andExpect(jsonPath("$.quoteId").value(quoteId))
                .andExpect(jsonPath("$.status").value("placed"))
                .andExpect(jsonPath("$.currency").value("USD"))
                .andExpect(jsonPath("$.subtotal").value(1000.00))
                .andExpect(jsonPath("$.taxTotal").value(0.0))
                .andExpect(jsonPath("$.grandTotal").value(1000.00));

        verify(orderService).getOrderById(eq(orderId));
    }

    @Test
    void testGetOrder_InvalidOrderId() throws Exception {
        // Arrange
        String invalidOrderId = "invalid-ulid";

        ProblemDetailException problemDetailException = new ProblemDetailException(
            HttpStatus.BAD_REQUEST,
            "https://api.example.com/errors/invalid-id",
            "Invalid ID format",
            "Order ID must be a valid ULID format"
        );

        when(orderService.getOrderById(eq(invalidOrderId))).thenThrow(problemDetailException);

        // Act & Assert
        mockMvc.perform(get("/orders/{orderId}", invalidOrderId))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Invalid ID format"))
                .andExpect(jsonPath("$.detail").value("Order ID must be a valid ULID format"));

        verify(orderService).getOrderById(eq(invalidOrderId));
    }

    @Test
    void testGetOrder_NotFound() throws Exception {
        // Arrange
        String orderId = ULIDGenerator.generateULID();

        ProblemDetailException problemDetailException = new ProblemDetailException(
            HttpStatus.NOT_FOUND,
            "https://api.example.com/errors/order-not-found",
            "Order not found",
            "Order with id '" + orderId + "' does not exist"
        );

        when(orderService.getOrderById(eq(orderId))).thenThrow(problemDetailException);

        // Act & Assert
        mockMvc.perform(get("/orders/{orderId}", orderId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Order not found"))
                .andExpect(jsonPath("$.detail").value("Order with id '" + orderId + "' does not exist"));

        verify(orderService).getOrderById(eq(orderId));
    }

    // Helper method to convert object to JSON string
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}