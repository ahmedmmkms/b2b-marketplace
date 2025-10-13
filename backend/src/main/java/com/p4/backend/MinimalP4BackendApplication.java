package com.p4.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;

/**
 * Minimal application that excludes the invoicing module to avoid circular dependency
 */
@SpringBootApplication(
    exclude = {
        DataSourceAutoConfiguration.class, 
        HibernateJpaAutoConfiguration.class,
        DataSourceTransactionManagerAutoConfiguration.class
    }
)
@ComponentScan(basePackages = {
    "com.p4.backend.catalog",
    "com.p4.backend.common",
    "com.p4.backend.config",
    "com.p4.backend.identity",
    "com.p4.backend.orders",
    "com.p4.backend.payments",
    "com.p4.backend.rfq",
    "com.p4.backend.search", 
    "com.p4.backend.shared",
    "com.p4.backend.wallet",
    "com.p4.backend.loyalty",
    "com.p4.backend.ops",
    "com.p4.backend.monitoring"
    // NOTE: Explicitly excluding "com.p4.backend.invoicing" to avoid circular dependency
})
public class MinimalP4BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MinimalP4BackendApplication.class, args);
    }
}