package com.p4.backend.common;

import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController implements InfoContributor {
    
    @Override
    public void contribute(Info.Builder builder) {
        Map<String, Object> details = new HashMap<>();
        details.put("app", "p4-backend");
        details.put("version", "0.0.1");
        builder.withDetail("p4", details);
    }
    
    @GetMapping("/actuator/ready")
    public String ready() {
        return "{\"status\":\"READY\"}";
    }
}