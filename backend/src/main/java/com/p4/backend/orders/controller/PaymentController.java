package com.p4.backend.orders.controller;

import com.p4.backend.orders.dto.PaymentResponse;
import com.p4.backend.orders.dto.WalletPaymentRequest;
import com.p4.backend.orders.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{orderId}/pay/wallet")
    public ResponseEntity<PaymentResponse> payOrderWithWallet(@PathVariable String orderId, 
                                                              @Valid @RequestBody WalletPaymentRequest request) {
        PaymentResponse response = paymentService.payOrderWithWallet(orderId, request);
        return ResponseEntity.ok(response);
    }
}