package com.p4.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(exclude = {BatchAutoConfiguration.class})
@EnableScheduling
@EnableAspectJAutoProxy
@EnableJpaAuditing
public class P4BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(P4BackendApplication.class, args);
    }

}