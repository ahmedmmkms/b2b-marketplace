package com.p4.backend.shared.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.p4.backend",
        entityManagerFactoryRef = "jpaSharedEMEntityManagerFactory",  // Use our custom EM factory
        transactionManagerRef = "jpaSharedEMTransactionManager"
)
public class SharedConfig {
    // Shared configuration class
}