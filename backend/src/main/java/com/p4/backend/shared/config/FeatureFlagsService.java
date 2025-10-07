package com.p4.backend.shared.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class FeatureFlagsService {

    @Value("${feature.flags.catalog.publicBrowse:false}")
    private boolean catalogPublicBrowseEnabled;

    @Value("${feature.flags.search.enabled:false}")
    private boolean searchEnabled;

    @Value("${feature.flags.rfq.enabled:false}")
    private boolean rfqEnabled;

    @Value("${feature.flags.quote.vendorConsole.enabled:false}")
    private boolean vendorConsoleEnabled;

    @Value("${feature.flags.orders.checkout:false}")
    private boolean ordersCheckoutEnabled;

    @Value("${feature.flags.payments.gateway1:false}")
    private boolean paymentsGateway1Enabled;

    @Value("${feature.flags.wallet.basic:false}")
    private boolean walletBasicEnabled;

    @Value("${feature.flags.invoice.vat:false}")
    private boolean invoiceVatEnabled;

    @Value("${feature.flags.loyalty.core:false}")
    private boolean loyaltyCoreEnabled;

    @Value("${feature.flags.credit.controls:false}")
    private boolean creditControlsEnabled;

    public boolean isCatalogPublicBrowseEnabled() {
        return catalogPublicBrowseEnabled;
    }

    public boolean isSearchEnabled() {
        return searchEnabled;
    }

    public boolean isRfqEnabled() {
        return rfqEnabled;
    }

    public boolean isVendorConsoleEnabled() {
        return vendorConsoleEnabled;
    }

    public boolean isOrdersCheckoutEnabled() {
        return ordersCheckoutEnabled;
    }

    public boolean isPaymentsGateway1Enabled() {
        return paymentsGateway1Enabled;
    }

    public boolean isWalletBasicEnabled() {
        return walletBasicEnabled;
    }

    public boolean isInvoiceVatEnabled() {
        return invoiceVatEnabled;
    }

    public boolean isLoyaltyCoreEnabled() {
        return loyaltyCoreEnabled;
    }

    public boolean isCreditControlsEnabled() {
        return creditControlsEnabled;
    }
}