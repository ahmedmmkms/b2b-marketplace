package com.p4.backend.config;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.AbsentGenerators;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ULIDConfig {

    @Bean
    public AbsentGenerators.TimeBasedGenerator ulidGenerator() {
        return Generators.randomBasedGenerator();
    }
}