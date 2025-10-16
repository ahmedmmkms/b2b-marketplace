package com.p4.backend.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "b2")
public class B2ConfigurationProperties {

    @NotNull
    private Account account = new Account();

    @NotNull
    private Application application = new Application();

    @NotNull
    private Secret secret = new Secret();

    @NotNull
    private Bucket bucket = new Bucket();

    @NotNull
    private Endpoint endpoint = new Endpoint();

    @Data
    public static class Account {
        @NotBlank
        private String id;
    }

    @Data
    public static class Application {
        @NotNull
        private Key key = new Key();
    }

    @Data
    public static class Key {
        @NotBlank
        private String id;
    }

    @Data
    public static class Secret {
        @NotNull
        private Access access = new Access();
    }

    @Data
    public static class Access {
        @NotBlank
        private String key;
    }

    @Data
    public static class Bucket {
        @NotBlank
        private String name;
    }

    @Data
    public static class Endpoint {
        @NotBlank
        private String url;
    }
}