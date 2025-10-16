package com.p4.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "feature")
public class FeatureFlagsConfiguration {

    private Flags flags = new Flags();

    @Data
    public static class Flags {
        private Catalog catalog = new Catalog();
        private Search search = new Search();
        private Rfq rfq = new Rfq();
        private Quote quote = new Quote();
        private Orders orders = new Orders();
        private Payments payments = new Payments();
        private Wallet wallet = new Wallet();
        private Invoice invoice = new Invoice();
        private Loyalty loyalty = new Loyalty();
        private Credit credit = new Credit();
    }

    @Data
    public static class Catalog {
        private boolean publicBrowse = false;
    }

    @Data
    public static class Search {
        private boolean enabled = false;
    }

    @Data
    public static class Rfq {
        private boolean enabled = false;
    }

    @Data
    public static class Quote {
        private VendorConsole vendorConsole = new VendorConsole();
    }

    @Data
    public static class VendorConsole {
        private boolean enabled = false;
    }

    @Data
    public static class Orders {
        private boolean checkout = false;
    }

    @Data
    public static class Payments {
        private boolean gateway1 = false;
    }

    @Data
    public static class Wallet {
        private boolean basic = false;
    }

    @Data
    public static class Invoice {
        private boolean vat = false;
    }

    @Data
    public static class Loyalty {
        private boolean core = false;
    }

    @Data
    public static class Credit {
        private boolean controls = false;
    }
}