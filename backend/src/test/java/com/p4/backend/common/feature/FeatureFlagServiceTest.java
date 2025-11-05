package com.p4.backend.common.feature;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FeatureFlagServiceTest {

    @Mock
    private FeatureFlagRepository featureFlagRepository;

    @InjectMocks
    private FeatureFlagService featureFlagService;

    @Test
    void testIsRfqEnabled_FlagExistsAndTrue_ReturnsTrue() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("rfq.enabled", true);
        when(featureFlagRepository.findById("rfq.enabled")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isRfqEnabled();

        // Assert
        assertTrue(result);
        verify(featureFlagRepository).findById("rfq.enabled");
    }

    @Test
    void testIsRfqEnabled_FlagExistsAndFalse_ReturnsFalse() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("rfq.enabled", false);
        when(featureFlagRepository.findById("rfq.enabled")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isRfqEnabled();

        // Assert
        assertFalse(result);
        verify(featureFlagRepository).findById("rfq.enabled");
    }

    @Test
    void testIsRfqEnabled_FlagExistsAsStringTrue_ReturnsTrue() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("rfq.enabled", "true");
        when(featureFlagRepository.findById("rfq.enabled")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isRfqEnabled();

        // Assert
        assertTrue(result);
        verify(featureFlagRepository).findById("rfq.enabled");
    }

    @Test
    void testIsRfqEnabled_FlagExistsAsStringFalse_ReturnsFalse() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("rfq.enabled", "false");
        when(featureFlagRepository.findById("rfq.enabled")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isRfqEnabled();

        // Assert
        assertFalse(result);
        verify(featureFlagRepository).findById("rfq.enabled");
    }

    @Test
    void testIsRfqEnabled_FlagDoesNotExist_ReturnsDefaultValue() {
        // Arrange
        when(featureFlagRepository.findById("rfq.enabled")).thenReturn(Optional.empty());

        // Act
        boolean result = featureFlagService.isRfqEnabled();

        // Assert
        assertFalse(result); // Default value is false
        verify(featureFlagRepository).findById("rfq.enabled");
    }

    @Test
    void testIsQuoteVendorConsoleEnabled_FlagExistsAndTrue_ReturnsTrue() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("quote.vendorConsole", true);
        when(featureFlagRepository.findById("quote.vendorConsole")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isQuoteVendorConsoleEnabled();

        // Assert
        assertTrue(result);
        verify(featureFlagRepository).findById("quote.vendorConsole");
    }

    @Test
    void testIsQuoteVendorConsoleEnabled_FlagExistsAndFalse_ReturnsFalse() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("quote.vendorConsole", false);
        when(featureFlagRepository.findById("quote.vendorConsole")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isQuoteVendorConsoleEnabled();

        // Assert
        assertFalse(result);
        verify(featureFlagRepository).findById("quote.vendorConsole");
    }

    @Test
    void testIsQuoteVendorConsoleEnabled_FlagDoesNotExist_ReturnsDefaultValue() {
        // Arrange
        when(featureFlagRepository.findById("quote.vendorConsole")).thenReturn(Optional.empty());

        // Act
        boolean result = featureFlagService.isQuoteVendorConsoleEnabled();

        // Assert
        assertFalse(result); // Default value is false
        verify(featureFlagRepository).findById("quote.vendorConsole");
    }

    @Test
    void testIsFeatureEnabled_WithBooleanValue() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("test.flag", true);
        when(featureFlagRepository.findById("test.flag")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isFeatureEnabled("test.flag", false);

        // Assert
        assertTrue(result);
        verify(featureFlagRepository).findById("test.flag");
    }

    @Test
    void testIsFeatureEnabled_WithStringValueTrue() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("test.flag", "true");
        when(featureFlagRepository.findById("test.flag")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isFeatureEnabled("test.flag", false);

        // Assert
        assertTrue(result);
        verify(featureFlagRepository).findById("test.flag");
    }

    @Test
    void testIsFeatureEnabled_WithStringValueFalse() {
        // Arrange
        FeatureFlag flag = new FeatureFlag("test.flag", "false");
        when(featureFlagRepository.findById("test.flag")).thenReturn(Optional.of(flag));

        // Act
        boolean result = featureFlagService.isFeatureEnabled("test.flag", true);

        // Assert
        assertFalse(result);
        verify(featureFlagRepository).findById("test.flag");
    }

    @Test
    void testIsFeatureEnabled_WithNonExistentFlag_ReturnsDefaultValue() {
        // Arrange
        when(featureFlagRepository.findById("nonexistent.flag")).thenReturn(Optional.empty());

        // Act
        boolean result = featureFlagService.isFeatureEnabled("nonexistent.flag", true);

        // Assert
        assertTrue(result); // Returns default value
        verify(featureFlagRepository).findById("nonexistent.flag");
    }
}