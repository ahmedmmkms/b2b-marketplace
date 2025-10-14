package com.p4.backend.acceptance;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.p4.backend.P4BackendApplication;
import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.entity.Vendor;
import com.p4.backend.catalog.repository.CatalogRepository;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.identity.entity.Account;
import com.p4.backend.identity.entity.User;
import com.p4.backend.identity.repository.AccountRepository;
import com.p4.backend.identity.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@SpringBootTest(
    classes = P4BackendApplication.class,
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles("test")
@Testcontainers
@Import(AcceptanceTestBase.DisabledSecurityConfig.class)
public abstract class AcceptanceTestBase {

    @Container
    @SuppressWarnings("resource")
    private static final PostgreSQLContainer<?> POSTGRES =
        new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("p4_acceptance")
            .withUsername("test")
            .withPassword("test");

    private static final DateTimeFormatter ISO_DATE_TIME = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
        registry.add("spring.datasource.driver-class-name", () -> "org.postgresql.Driver");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
        registry.add("spring.jpa.properties.hibernate.dialect", () -> "org.hibernate.dialect.PostgreSQLDialect");
        registry.add("spring.jpa.show-sql", () -> false);
        registry.add("spring.flyway.enabled", () -> false);

        // Enable feature flags required for acceptance flows
        registry.add("feature.flags.catalog.publicBrowse", () -> true);
        registry.add("feature.flags.search.enabled", () -> true);
        registry.add("feature.flags.rfq.enabled", () -> true);
        registry.add("feature.flags.quote.vendorConsole.enabled", () -> true);
        registry.add("feature.flags.orders.checkout", () -> true);
        registry.add("feature.flags.payments.gateway1", () -> true);
        registry.add("feature.flags.wallet.basic", () -> true);
    }

    @Autowired
    protected TestRestTemplate restTemplate;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected JdbcTemplate jdbcTemplate;

    @Autowired
    protected AccountRepository accountRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected VendorRepository vendorRepository;

    @Autowired
    protected CatalogRepository catalogRepository;

    @BeforeEach
    void cleanDatabase() {
        // Truncate tables to ensure each acceptance test starts from a known state.
        // CASCADE is used to honour foreign-key relationships.
        try {
            jdbcTemplate.execute(
                "TRUNCATE TABLE " +
                    "payments, order_lines, orders, quote_line, quote, rfq_line, rfq, " +
                    "wallet_transactions, wallets, product_media, product_attribute_value, " +
                    "product_attribute, product, vendor, audit_log, account, \"user\" " +
                    "RESTART IDENTITY CASCADE"
            );
        } catch (Exception ignored) {
            // Tables may not exist yet during the first context bootstrap; ignore and continue.
        }
    }

    protected HttpHeaders jsonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
        return headers;
    }

    protected Account createBuyerAccount(String companyName) {
        Account account = new Account(companyName, companyName.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]", "") + "@example.com");
        account.setType(Account.AccountType.BUYER);
        account.setStatus(Account.AccountStatus.ACTIVE);
        return accountRepository.save(account);
    }

    protected User createAccountUser(Account account, String username) {
        User user = new User(
            username,
            username + "@example.com",
            "Test",
            "User",
            account.getId()
        );
        user.setStatus(User.UserStatus.ACTIVE);
        user.setRole(User.UserRole.MEMBER);
        user.setEmailVerified(true);
        user.setEmailVerifiedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    protected Vendor createActiveVendor(String name) {
        Vendor vendor = new Vendor(name);
        vendor.setStatus(Vendor.VendorStatus.ACTIVE);
        vendor.setContactEmail(name.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]", "") + "@vendor.example.com");
        vendor.setContactPerson("Vendor Rep");
        vendor.setContactPhone("+1-555-0100");
        vendor.setTaxNumber("TAX-" + System.nanoTime());
        return vendorRepository.save(vendor);
    }

    protected Product createPublishedProduct(Vendor vendor, String sku, String name, BigDecimal basePrice, String description) {
        Product product = new Product(name, vendor.getId());
        product.setSku(sku);
        product.setStatus(Product.ProductStatus.PUBLISHED);
        product.setInventoryStatus(Product.InventoryStatus.IN_STOCK);
        product.setInventoryTracking(true);
        product.setInventoryQty(100);
        product.setBasePrice(basePrice);
        product.setCurrency("USD");
        product.setDescription(description);
        product.setShortDescription(description);
        product.setBrand("TestBrand");
        product.setMinOrderQty(1);
        product.setMoq(1);
        product.setTaxClass("STANDARD");
        return catalogRepository.save(product);
    }

    protected String isoTimestamp(LocalDateTime dateTime) {
        return dateTime.truncatedTo(java.time.temporal.ChronoUnit.SECONDS).format(ISO_DATE_TIME);
    }

    @TestConfiguration
    static class DisabledSecurityConfig {
        @Bean
        @Order(Ordered.HIGHEST_PRECEDENCE)
        SecurityFilterChain acceptanceSecurityFilterChain(HttpSecurity http) throws Exception {
            http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .httpBasic(Customizer.withDefaults())
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable());
            return http.build();
        }
    }
}
