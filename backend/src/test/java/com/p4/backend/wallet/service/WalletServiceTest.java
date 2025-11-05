package com.p4.backend.wallet.service;

import com.p4.backend.common.ULIDGenerator;
import com.p4.backend.wallet.dto.WalletResponse;
import com.p4.backend.wallet.model.Wallet;
import com.p4.backend.wallet.repository.WalletRepository;
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

    private WalletService walletService;

    @BeforeEach
    void setUp() {
        walletService = new WalletService();
        // Use reflection to set the mocked repository
        try {
            java.lang.reflect.Field walletRepositoryField = WalletService.class.getDeclaredField("walletRepository");
            walletRepositoryField.setAccessible(true);
            walletRepositoryField.set(walletService, walletRepository);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
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
}