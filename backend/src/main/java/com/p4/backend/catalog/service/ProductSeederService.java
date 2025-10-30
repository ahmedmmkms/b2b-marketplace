package com.p4.backend.catalog.service;

import com.p4.backend.catalog.model.Organization;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.repository.OrganizationRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ProductSeederService {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductSeederService.class);
    
    @Autowired
    OrganizationRepository organizationRepository;
    
    @Autowired
    ProductRepository productRepository;
    
    public void seedData(String csvPath) {
        logger.info("Starting data seeding from CSV: {}", csvPath);
        
        try {
            // Check if vendor organization already exists
            Optional<Organization> existingVendorOpt = organizationRepository.findByRole(Organization.Role.vendor);
            
            Organization vendor;
            if (existingVendorOpt.isPresent()) {
                vendor = existingVendorOpt.get();
                logger.info("Using existing vendor organization: {} with ID: {}", vendor.getName(), vendor.getId());
            } else {
                // Create a new vendor organization
                vendor = createVendorOrganization();
                logger.info("Created new vendor organization: {} with ID: {}", vendor.getName(), vendor.getId());
            }
            
            // Read and process the CSV file
            List<Product> products = readProductsFromCsv(csvPath, vendor.getId());
            
            // Check for existing products with the same vendor and SKUs to avoid duplicates
            Set<String> existingSkus = new HashSet<>();
            List<Product> existingProducts = productRepository.findByVendorId(vendor.getId());
            for (Product existingProduct : existingProducts) {
                existingSkus.add(existingProduct.getSku());
            }
            
            // Filter out products that already exist based on vendorId and sku
            List<Product> newProducts = new ArrayList<>();
            for (Product product : products) {
                if (!existingSkus.contains(product.getSku())) {
                    newProducts.add(product);
                } else {
                    logger.debug("Product with SKU {} already exists, skipping", product.getSku());
                }
            }
            
            // Save new products to the database
            if (!newProducts.isEmpty()) {
                productRepository.saveAll(newProducts);
                logger.info("Successfully saved {} new products to the database", newProducts.size());
            } else {
                logger.info("No new products to save - all products already exist in the database");
            }
            
            logger.info("Data seeding completed successfully. Created/updated {} products for vendor {}", 
                       products.size(), vendor.getName());
            
        } catch (IOException e) {
            logger.error("Error occurred while reading CSV file: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to seed data from CSV", e);
        }
    }
    
    private Organization createVendorOrganization() {
        // Generate a ULID for the organization (in a real app, you'd use a ULID generator)
        String orgId = generateUlid();
        
        Organization vendor = new Organization();
        vendor.setId(orgId);
        vendor.setName("Default Vendor Inc.");
        vendor.setRole(Organization.Role.vendor);
        
        return organizationRepository.save(vendor);
    }
    
    private List<Product> readProductsFromCsv(String csvPath, String vendorId) throws IOException {
        if (!Files.exists(Paths.get(csvPath))) {
            throw new IOException("CSV file not found: " + csvPath);
        }
        
        List<Product> products = new ArrayList<>();
        AtomicInteger lineNumber = new AtomicInteger(0);
        
        try (BufferedReader br = new BufferedReader(new FileReader(csvPath))) {
            String line;
            boolean isFirstLine = true; // Skip header
            
            while ((line = br.readLine()) != null) {
                lineNumber.incrementAndGet();
                
                if (isFirstLine) {
                    isFirstLine = false; // Skip header line
                    continue;
                }
                
                if (line.trim().isEmpty()) {
                    continue; // Skip empty lines
                }
                
                String[] fields = parseCsvLine(line);
                if (fields.length < 6) { // Need at least sku, name, description, price, category, media_url
                    logger.warn("Line {} has insufficient fields, skipping: {}", lineNumber.get(), line);
                    continue;
                }
                
                Product product = createProductFromFields(fields, vendorId);
                if (product != null) {
                    products.add(product);
                }
            }
        }
        
        logger.info("Successfully parsed {} products from CSV file", products.size());
        return products;
    }
    
    // Simple CSV parsing that handles quoted fields containing commas
    private String[] parseCsvLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder currentField = new StringBuilder();
        boolean inQuotes = false;
        
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            
            if (c == '"') {
                // Check if this is an escaped quote ("" inside quoted field)
                if (i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    currentField.append('"');
                    i++; // Skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (c == ',' && !inQuotes) {
                fields.add(currentField.toString().trim());
                currentField = new StringBuilder();
            } else {
                currentField.append(c);
            }
        }
        
        fields.add(currentField.toString().trim());
        return fields.toArray(new String[0]);
    }
    
    private Product createProductFromFields(String[] fields, String vendorId) {
        try {
            String id = generateUlid(); // Generate ULID for the product
            String sku = fields[0].trim(); // sku
            String name = fields[1].trim(); // name
            String description = fields[2].trim(); // description
            BigDecimal price = new BigDecimal(fields[3].trim()); // price
            String category = fields[4].trim(); // category
            String mediaUrl = fields[5].trim(); // media_url
            
            Product product = new Product();
            product.setId(id);
            product.setVendorId(vendorId);
            product.setSku(sku);
            product.setName(name);
            product.setDescription(description);
            product.setReferencePrice(price);
            product.setCategory(category);
            
            // Set media URLs as a list
            if (mediaUrl != null && !mediaUrl.isEmpty()) {
                List<String> mediaUrls = new ArrayList<>();
                mediaUrls.add(mediaUrl);
                product.setMediaUrls(mediaUrls);
            }
            
            // Set default attributes
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("category", category);
            product.setAttributes(attributes);
            
            return product;
        } catch (Exception e) {
            logger.error("Error creating product from CSV fields: {}", e.getMessage(), e);
            return null;
        }
    }
    
    // Simple ULID generator for demo purposes
    // In a real application, use a proper ULID library
    private String generateUlid() {
        // This is a simple implementation - in production, use a proper ULID library
        // ULIDs are 26-character strings using Crockford's base32
        // For simplicity, we'll generate a string that matches the pattern
        String timestamp = String.valueOf(System.currentTimeMillis() * 1000); // microseconds
        String randomPart = String.format("%016X", new Random().nextLong()).substring(0, 16);
        
        // Combine and encode to Crockford's base32 (simplified)
        String combined = timestamp + randomPart;
        StringBuilder ulid = new StringBuilder();
        
        // This is a placeholder implementation to generate a random ULID-like string
        String chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's base32
        Random random = new Random();
        for (int i = 0; i < 26; i++) {
            ulid.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        return ulid.toString();
    }
}