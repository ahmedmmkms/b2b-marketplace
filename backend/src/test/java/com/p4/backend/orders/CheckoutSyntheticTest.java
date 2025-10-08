package com.p4.backend.orders;

import com.p4.backend.orders.entity.Order;
import com.p4.backend.orders.entity.OrderStatus;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.orders.service.OrderService;
import com.p4.backend.payments.service.PaymentService;
import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.repository.QuoteRepository;
import com.p4.backend.rfq.repository.RfqRepository;
import com.p4.backend.shared.util.UlidUtil;
import com.p4.backend.shared.vo.Money;
import com.p4.backend.wallet.entity.Wallet;
import com.p4.backend.wallet.service.WalletService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional // Ensure tests don't affect actual data
class CheckoutSyntheticTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private RfqRepository rfqRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void testDryCheckoutWithWallet() {
        // Setup: Create a mock accepted quote
        Quote mockQuote = createMockQuote();
        quoteRepository.save(mockQuote);

        // Create the associated RFQ for the quote
        Rfq mockRfq = new Rfq(mockQuote.getRfqId(), "Test Contact", "test@example.com", LocalDateTime.now().plusDays(30));
        mockRfq.setAccountId("test-buyer-account-id"); // Set the buyer account ID in the RFQ
        rfqRepository.save(mockRfq);

        // Step 1: Create order from accepted quote
        Optional<Order> orderOpt = orderService.createOrderFromAcceptedQuote(mockQuote.getId());
        assertTrue(orderOpt.isPresent(), "Order should be created from quote");
        Order order = orderOpt.get();
        assertEquals(OrderStatus.PENDING, order.getStatus(), "Order should initially be PENDING");

        // Step 2: Create a wallet for the buyer
        Money initialBalance = new Money(new BigDecimal("1000.00"), "USD");
        Optional<Wallet> walletOpt = walletService.createWallet(mockRfq.getAccountId(), initialBalance);
        assertTrue(walletOpt.isPresent(), "Wallet should be created");

        // Step 3: Process payment with wallet
        String idempotencyKey = UlidUtil.generateUlid();
        Optional<com.p4.backend.orders.entity.Payment> paymentOpt = 
            paymentService.processPayment(order.getId(), "WALLET", idempotencyKey);
        
        assertTrue(paymentOpt.isPresent(), "Payment should be processed");
        assertEquals("WALLET", paymentOpt.get().getPaymentMethod(), "Payment method should be WALLET");
        assertNotNull(paymentOpt.get().getPaymentGatewayId(), "Payment gateway ID should be set for wallet payment");

        // Step 4: Verify order status is updated after payment
        Optional<Order> updatedOrderOpt = orderRepository.findById(order.getId());
        assertTrue(updatedOrderOpt.isPresent());
        assertEquals(OrderStatus.PLACED, updatedOrderOpt.get().getStatus(), "Order should be PLACED after payment");
    }

    @Test
    void testDryCheckoutWithSandboxGateway() {
        // Setup: Create a mock accepted quote
        Quote mockQuote = createMockQuote();
        quoteRepository.save(mockQuote);

        // Create the associated RFQ for the quote
        Rfq mockRfq = new Rfq(mockQuote.getRfqId(), "Test Contact", "test@example.com", LocalDateTime.now().plusDays(30));
        mockRfq.setAccountId("test-buyer-account-id"); // Set the buyer account ID in the RFQ
        rfqRepository.save(mockRfq);

        // Step 1: Create order from accepted quote
        Optional<Order> orderOpt = orderService.createOrderFromAcceptedQuote(mockQuote.getId());
        assertTrue(orderOpt.isPresent(), "Order should be created from quote");
        Order order = orderOpt.get();
        assertEquals(OrderStatus.PENDING, order.getStatus(), "Order should initially be PENDING");

        // Step 2: Process payment with sandbox gateway
        String idempotencyKey = UlidUtil.generateUlid();
        Optional<com.p4.backend.orders.entity.Payment> paymentOpt = 
            paymentService.processPayment(order.getId(), "CREDIT_CARD", idempotencyKey);
        
        assertTrue(paymentOpt.isPresent(), "Payment should be processed");
        assertEquals("CREDIT_CARD", paymentOpt.get().getPaymentMethod(), "Payment method should be CREDIT_CARD");
        assertNotNull(paymentOpt.get().getPaymentGatewayId(), "Payment gateway ID should be set");

        // Step 3: Verify order status is updated after payment
        Optional<Order> updatedOrderOpt = orderRepository.findById(order.getId());
        assertTrue(updatedOrderOpt.isPresent());
        
        // Note: With sandbox, the payment might fail sometimes due to simulated failures
        if (paymentOpt.get().getStatus() == com.p4.backend.orders.entity.PaymentStatus.COMPLETED) {
            assertEquals(OrderStatus.PLACED, updatedOrderOpt.get().getStatus(), "Order should be PLACED after successful payment");
        } else {
            assertEquals(OrderStatus.PENDING, updatedOrderOpt.get().getStatus(), "Order should remain PENDING if payment failed");
        }
    }

    private Quote createMockQuote() {
        Quote quote = new Quote();
        quote.setId(UlidUtil.generateUlid());
        quote.setRfqId(UlidUtil.generateUlid());  // Need to set the RFQ ID instead of direct account IDs
        quote.setVendorId(UlidUtil.generateUlid());  // Use vendorId instead of vendorAccountId
        quote.setStatus(Quote.QuoteStatus.ACCEPTED); // This is key for the order creation
        quote.setCurrency("USD");
        // Add quote lines would go here in a full implementation
        return quote;
    }
}