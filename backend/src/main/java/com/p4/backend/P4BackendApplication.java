package com.p4.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration;

@SpringBootApplication(exclude = {BatchAutoConfiguration.class})
public class P4BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(P4BackendApplication.class, args);
	}

}