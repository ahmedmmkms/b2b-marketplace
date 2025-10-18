package com.p4.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeneratePasswordHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "112233445566";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("Raw password: " + rawPassword);
        System.out.println("Encoded password: " + encodedPassword);
        
        // Test if the raw password matches the encoded one
        boolean matches = encoder.matches(rawPassword, encodedPassword);
        System.out.println("Password verification: " + matches);
    }
}