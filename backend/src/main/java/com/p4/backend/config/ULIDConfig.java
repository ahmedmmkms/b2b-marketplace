package com.p4.backend.config;

import com.github.f4b6a3.ulid.Ulid;
import com.github.f4b6a3.ulid.UlidCreator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Supplier;

@Configuration
public class ULIDConfig {

    @Bean
    public Supplier<Ulid> ulidGenerator() {
        return UlidCreator::generate;
    }
}