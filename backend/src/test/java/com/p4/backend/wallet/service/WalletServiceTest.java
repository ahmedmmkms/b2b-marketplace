package com.p4.backend.wallet.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.common.exception.RFC7807Exception;
import com.p4.backend.wallet.dto.WalletResponse;
import com.p4.backend.wallet.dto.WalletTopupRequest;
import com.p4.backend.wallet.dto.WalletTransactionResponse;
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
class WalletServiceTest {

    @Mock
    private WalletRepository walletRepository;

    @Mock
    private WalletTransactionRepository walletTransactionRepository;

    @Mock
    private OrganizationRepository organizationRepository;

    private WalletService walletService;

    @BeforeEach
    void setUp() throws Exception {
        walletService = new WalletService();
        
        // Use reflection to set the mocked repositories
        java.lang.reflect.Field walletRepoField = WalletService.class.getDeclaredField("walletRepository");
        walletRepoField.setAccessible(true);
        walletRepoField.set(walletService, walletRepository);
        
        java.lang.reflect.Field walletTransactionRepoField = WalletService.class.getDeclaredField("walletTransactionRepository");
        walletTransactionRepoField.setAccessible(true);
        walletTransactionRepoField.set(walletService, walletTransactionRepository);
        
        java.lang.reflect.Field orgRepoField = WalletService.class.getDeclaredField("organizationRepository");
        orgRepoField.setAccessible(true);
        orgRepoField.set(walletService, organizationRepository);
    }

    @Test
    void getOrCreateWallet_ExistingWallet_ReturnsWallet() {
        // Given
        String orgId = "ORG123456789012345678901234";
        Wallet existingWallet = new Wallet();
        existingWallet.setId("WAL123456789012345678901234");
        existingWallet.setOrgId(orgId);
        existingWallet.setBalance(new BigDecimal("100.50"));
        existingWallet.setCurrency("USD");

        when(walletRepository.findByOrgId(orgId)).thenReturn(Optional.of(existingWallet));

        // When
        WalletResponse response = walletService.getOrCreateWallet(orgId);

        // Then
        assertNotNull(response);
        assertEquals("WAL123456789012345678901234", response.getId());
        assertEquals(orgId, response.getOrgId());
        assertEquals(new BigDecimal("100.50"), response.getBalance());
        assertEquals("USD", response.getCurrency());
        
        verify(walletRepository, times(1)).findByOrgId(orgId);
        verify(walletRepository, never()).save(any());
    }

    @Test
    void getOrCreateWallet_NewWallet_CreatesAndReturnsWallet() {
        // Given
        String orgId = "ORG123456789012345678901234";
        
        when(walletRepository.findByOrgId(orgId)).thenReturn(Optional.empty());
        when(organizationRepository.existsById(orgId)).thenReturn(true);
        
        Wallet savedWallet = new Wallet();
        savedWallet.setId(ULIDGenerator.generateULID());
        savedWallet.setOrgId(orgId);
        savedWallet.setBalance(BigDecimal.ZERO);
        savedWallet.setCurrency("USD");
        
        when(walletRepository.save(any(Wallet.class))).thenReturn(savedWallet);

        // When
        WalletResponse response = walletService.getOrCreateWallet(orgId);

        // Then
        assertNotNull(response);
        assertEquals(orgId, response.getOrgId());
        assertEquals(BigDecimal.ZERO, response.getBalance());
        assertEquals("USD", response.getCurrency());
        assertNotNull(response.getId());
        assertTrue(ULIDGenerator.isValidULID(response.getId()));
        
        verify(walletRepository, times(1)).findByOrgId(orgId);
        verify(walletRepository, times(1)).save(any(Wallet.class));
        
        // Verify the saved wallet has correct properties
        ArgumentCaptor<Wallet> walletCaptor = ArgumentCaptor.forClass(Wallet.class);
        verify(walletRepository).save(walletCaptor.capture());
        
        Wallet capturedWallet = walletCaptor.getValue();
        assertEquals(orgId, capturedWallet.getOrgId());
        assertEquals(BigDecimal.ZERO, capturedWallet.getBalance());
        assertEquals("USD", capturedWallet.getCurrency());
    }

    @Test
    void topupWallet_Success_NewWallet() {
        // Arrange
        String orgId = ULIDGenerator.generateULID();
        BigDecimal amount = new BigDecimal("100.00");
        String currency = "USD";
        
        WalletTopupRequest request = new WalletTopupRequest(amount, currency);
        
        when(organizationRepository.existsById(orgId)).thenReturn(true);
        when(walletRepository.findByOrgId(orgId)).thenReturn(Optional.empty());
        when(walletRepository.save(any(Wallet.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(walletTransactionRepository.save(any(WalletTransaction.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        WalletTransactionResponse response = walletService.topupWallet(orgId, request);

        // Assert
        assertNotNull(response);
        assertEquals(WalletTransaction.TransactionType.topup, response.getType());
        assertEquals(amount, response.getAmount());
        
        // Verify that wallet was created and saved
        ArgumentCaptor<Wallet> walletCaptor = ArgumentCaptor.forClass(Wallet.class);
        verify(walletRepository, times(1)).save(walletCaptor.capture());
        
        Wallet savedWallet = walletCaptor.getValue();
        assertEquals(orgId, savedWallet.getOrgId());
        assertEquals(currency, savedWallet.getCurrency());
        assertEquals(amount, savedWallet.getBalance());

        // Verify that transaction was created and saved
        ArgumentCaptor<WalletTransaction> transactionCaptor = ArgumentCaptor.forClass(WalletTransaction.class);
        verify(walletTransactionRepository, times(1)).save(transactionCaptor.capture());
        
        WalletTransaction savedTransaction = transactionCaptor.getValue();
        assertEquals(WalletTransaction.TransactionType.topup, savedTransaction.getType());
        assertEquals(amount, savedTransaction.getAmount());
    }

    @Test
    void topupWallet_Success_ExistingWallet() {
        // Arrange
        String orgId = ULIDGenerator.generateULID();
        BigDecimal initialBalance = new BigDecimal("50.00");
        BigDecimal topupAmount = new BigDecimal("100.00");
        String currency = "USD";
        
        WalletTopupRequest request = new WalletTopupRequest(topupAmount, currency);
        
        Wallet existingWallet = new Wallet(ULIDGenerator.generateULID(), orgId);
        existingWallet.setBalance(initialBalance);
        existingWallet.setCurrency(currency);
        
        when(organizationRepository.existsById(orgId)).thenReturn(true);
        when(walletRepository.findByOrgId(orgId)).thenReturn(Optional.of(existingWallet));
        when(walletRepository.save(any(Wallet.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(walletTransactionRepository.save(any(WalletTransaction.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        WalletTransactionResponse response = walletService.topupWallet(orgId, request);

        // Assert
        assertNotNull(response);
        assertEquals(WalletTransaction.TransactionType.topup, response.getType());
        assertEquals(topupAmount, response.getAmount());
        
        // Verify that wallet was updated with the new balance
        ArgumentCaptor<Wallet> walletCaptor = ArgumentCaptor.forClass(Wallet.class);
        verify(walletRepository, times(1)).save(walletCaptor.capture());
        
        Wallet updatedWallet = walletCaptor.getValue();
        assertEquals(orgId, updatedWallet.getOrgId());
        assertEquals(currency, updatedWallet.getCurrency());
        assertEquals(initialBalance.add(topupAmount), updatedWallet.getBalance());
    }

    @Test
    void topupWallet_OrganizationNotFound() {
        // Arrange
        String orgId = ULIDGenerator.generateULID();
        BigDecimal amount = new BigDecimal("100.00");
        String currency = "USD";
        
        WalletTopupRequest request = new WalletTopupRequest(amount, currency);
        
        when(organizationRepository.existsById(orgId)).thenReturn(false);

        // Act & Assert
        RFC7807Exception exception = assertThrows(RFC7807Exception.class, 
            () -> walletService.topupWallet(orgId, request));
        
        assertEquals(404, exception.getStatus().value());
    }

    @Test
    void topupWallet_CurrencyMismatch() {
        // Arrange
        String orgId = ULIDGenerator.generateULID();
        BigDecimal amount = new BigDecimal("100.00");
        String requestCurrency = "EUR";
        String walletCurrency = "USD";
        
        WalletTopupRequest request = new WalletTopupRequest(amount, requestCurrency);
        
        Wallet existingWallet = new Wallet(ULIDGenerator.generateULID(), orgId);
        existingWallet.setBalance(new BigDecimal("50.00"));
        existingWallet.setCurrency(walletCurrency);
        
        when(organizationRepository.existsById(orgId)).thenReturn(true);
        when(walletRepository.findByOrgId(orgId)).thenReturn(Optional.of(existingWallet));

        // Act & Assert
        RFC7807Exception exception = assertThrows(RFC7807Exception.class, 
            () -> walletService.topupWallet(orgId, request));
        
        assertEquals(422, exception.getStatus().value());
    }
}