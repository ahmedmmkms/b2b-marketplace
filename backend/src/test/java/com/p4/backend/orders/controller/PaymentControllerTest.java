package com.p4.backend.orders.controller;

import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.orders.dto.PaymentResponse;
import com.p4.backend.orders.dto.WalletPaymentRequest;
import com.p4.backend.orders.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentControllerTest {

    @Mock
    private PaymentService paymentService;

    @Captor
    private ArgumentCaptor<String> orderIdCaptor;

    @Captor
    private ArgumentCaptor<WalletPaymentRequest> requestCaptor;

    @Test
    void payOrderWithWallet_Success() {
        // Arrange
        PaymentController controller = new PaymentController(paymentService);

        String orderId = ULIDGenerator.generateULID();
        WalletPaymentRequest request = new WalletPaymentRequest();
        request.setIdempotencyKey("test-key-123");

        PaymentResponse mockResponse = new PaymentResponse();
        mockResponse.setId(ULIDGenerator.generateULID());
        mockResponse.setOrderId(orderId);
        mockResponse.setStatus("succeeded");

        when(paymentService.payOrderWithWallet(any(String.class), any(WalletPaymentRequest.class)))
            .thenReturn(mockResponse);

        // Act
        ResponseEntity<PaymentResponse> response = controller.payOrderWithWallet(orderId, request);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockResponse, response.getBody());

        verify(paymentService).payOrderWithWallet(orderIdCaptor.capture(), requestCaptor.capture());
        assertEquals(orderId, orderIdCaptor.getValue());
        assertEquals("test-key-123", requestCaptor.getValue().getIdempotencyKey());
    }
}