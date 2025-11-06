package com.p4.backend.orders.service;

import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.orders.dto.WalletPaymentRequest;
import com.p4.backend.orders.model.Order;
import com.p4.backend.orders.model.Payment;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.orders.repository.PaymentRepository;
import com.p4.backend.wallet.model.Wallet;
import com.p4.backend.wallet.model.WalletTransaction;
import com.p4.backend.wallet.repository.WalletRepository;
import com.p4.backend.wallet.repository.WalletTransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private WalletRepository walletRepository;

    @Mock
    private WalletTransactionRepository walletTransactionRepository;

    @Mock
    private OrganizationRepository organizationRepository;

    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        paymentService = new PaymentService(paymentRepository, orderRepository, walletRepository, 
                                           walletTransactionRepository, organizationRepository);
    }

    @Test
    void payOrderWithWallet_Success() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();
        String buyerId = ULIDGenerator.generateULID();
        String walletId = ULIDGenerator.generateULID();

        Order order = new Order();
        order.setId(orderId);
        order.setBuyerId(buyerId);
        order.setGrandTotal(new BigDecimal("100.00"));
        order.setCurrency("USD");
        order.setStatus(Order.Status.placed);

        Wallet wallet = new Wallet();
        wallet.setId(walletId);
        wallet.setOrgId(buyerId);
        wallet.setBalance(new BigDecimal("200.00"));

        WalletPaymentRequest request = new WalletPaymentRequest();
        request.setIdempotencyKey("test-key-123");

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(walletRepository.findByOrgId(buyerId)).thenReturn(Optional.of(wallet));
        when(paymentRepository.findByIdempotencyKey("test-key-123")).thenReturn(Optional.empty());
        when(paymentRepository.save(any(Payment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        var response = paymentService.payOrderWithWallet(orderId, request);

        // Assert
        verify(paymentRepository).save(any(Payment.class));
        verify(walletTransactionRepository).save(any(WalletTransaction.class));
        verify(walletRepository).save(any(Wallet.class));
        verify(orderRepository).save(any(Order.class));

        assertEquals(orderId, response.getOrderId());
        assertEquals("wallet", response.getMethod());
        assertEquals("succeeded", response.getStatus());
        assertEquals(new BigDecimal("100.00"), response.getAmount());
        assertEquals("USD", response.getCurrency());
        assertEquals("test-key-123", response.getIdempotencyKey());
    }

    @Test
    void payOrderWithWallet_InsufficientFunds() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();
        String buyerId = ULIDGenerator.generateULID();

        Order order = new Order();
        order.setId(orderId);
        order.setBuyerId(buyerId);
        order.setGrandTotal(new BigDecimal("200.00"));
        order.setStatus(Order.Status.placed);

        Wallet wallet = new Wallet();
        wallet.setOrgId(buyerId);
        wallet.setBalance(new BigDecimal("100.00"));

        WalletPaymentRequest request = new WalletPaymentRequest();
        request.setIdempotencyKey("test-key-123");

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(walletRepository.findByOrgId(buyerId)).thenReturn(Optional.of(wallet));
        when(paymentRepository.findByIdempotencyKey("test-key-123")).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, () -> 
            paymentService.payOrderWithWallet(orderId, request));
        
        assertTrue(exception.getDetail().contains("Required") && 
                   exception.getDetail().contains("Available"));
    }

    @Test
    void payOrderWithWallet_IdempotencyCheck() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();
        String idempotencyKey = "test-key-123";

        Payment existingPayment = new Payment();
        existingPayment.setId(ULIDGenerator.generateULID());
        existingPayment.setOrderId(orderId);
        existingPayment.setMethod(Payment.PaymentMethod.wallet);
        existingPayment.setStatus(Payment.PaymentStatus.succeeded);
        existingPayment.setAmount(new BigDecimal("100.00"));

        WalletPaymentRequest request = new WalletPaymentRequest();
        request.setIdempotencyKey(idempotencyKey);

        when(paymentRepository.findByIdempotencyKey(idempotencyKey)).thenReturn(Optional.of(existingPayment));

        // Act
        var response = paymentService.payOrderWithWallet(orderId, request);

        // Assert
        assertEquals(existingPayment.getId(), response.getId());
        assertEquals(orderId, response.getOrderId());

        // Verify that no database operations were performed (idempotency check passed)
        verifyNoInteractions(orderRepository);
        verifyNoInteractions(walletRepository);
        verifyNoInteractions(walletTransactionRepository);
    }

    @Test
    void payOrderWithWallet_OrderNotFound() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();
        WalletPaymentRequest request = new WalletPaymentRequest();
        request.setIdempotencyKey("test-key-123");

        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());
        when(paymentRepository.findByIdempotencyKey("test-key-123")).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, () -> 
            paymentService.payOrderWithWallet(orderId, request));
        
        assertTrue(exception.getDetail().contains("does not exist"));
    }

    @Test
    void payOrderWithWallet_WalletNotFound() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();
        String buyerId = ULIDGenerator.generateULID();

        Order order = new Order();
        order.setId(orderId);
        order.setBuyerId(buyerId);
        order.setStatus(Order.Status.placed);

        WalletPaymentRequest request = new WalletPaymentRequest();
        request.setIdempotencyKey("test-key-123");

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(walletRepository.findByOrgId(buyerId)).thenReturn(Optional.empty());
        when(paymentRepository.findByIdempotencyKey("test-key-123")).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, () -> 
            paymentService.payOrderWithWallet(orderId, request));
        
        assertTrue(exception.getDetail().contains("No wallet found for buyer organization"));
    }

    @Test
    void payOrderWithWallet_InvalidOrderStatus() {
        // Arrange
        String orderId = ULIDGenerator.generateULID();
        String buyerId = ULIDGenerator.generateULID();

        Order order = new Order();
        order.setId(orderId);
        order.setBuyerId(buyerId);
        order.setStatus(Order.Status.confirmed); // Not placed status

        WalletPaymentRequest request = new WalletPaymentRequest();
        request.setIdempotencyKey("test-key-123");

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(paymentRepository.findByIdempotencyKey("test-key-123")).thenReturn(Optional.empty());

        // Act & Assert
        ProblemDetailException exception = assertThrows(ProblemDetailException.class, () -> 
            paymentService.payOrderWithWallet(orderId, request));
        
        assertTrue(exception.getDetail().contains("Order must be in 'placed' status to be paid"));
    }
}