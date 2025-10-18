package com.p4.backend.catalog.seed;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.Vendor;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.shared.kernel.Money;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Data seeder for Product entities
 * This component runs in all environments but only seeds if no products exist
 */
@Component
@Profile({"dev", "test"})
@Order(2)
@RequiredArgsConstructor
@Slf4j
public class ProductSeeder implements CommandLineRunner {
    
    private final ProductRepository productRepository;
    private final VendorRepository vendorRepository;
    private final Random random = new Random();
    
    // Sample product categories and names
    private final String[] categories = {"Electronics", "Home & Kitchen", "Office", "Beauty", "Sports", "Automotive", "Garden", "Toys"};
    private final String[] productNames = {
        "Wireless Headphones", "Bluetooth Speaker", "Smart Watch", "Laptop Stand", 
        "Mechanical Keyboard", "Gaming Mouse", "USB-C Hub", "Wireless Charger",
        "Coffee Maker", "Blender", "Microwave Oven", "Refrigerator",
        "Desk Lamp", "Office Chair", "Backpack", "Notebook Set",
        "Shampoo", "Moisturizer", "Sunscreen", "Face Cream",
        "Tennis Racket", "Soccer Ball", "Yoga Mat", "Dumbbells",
        "Car Charger", "Windshield Sun Shade", "Floor Mat", "Dashboard Camera",
        "Garden Hose", "Watering Can", "Pruning Shears", "Plant Pot",
        "Building Blocks", "Puzzle Game", "Stuffed Animal", "Board Game"
    };
    
    // Sample descriptions
    private final String[] descriptions = {
        "High-quality product with excellent performance and durability.",
        "Premium choice for professionals and enthusiasts alike.",
        "Features the latest technology for superior user experience.",
        "Designed with attention to detail and user-friendly functionality.",
        "Perfect blend of style and functionality for everyday use.",
        "Reliable and efficient with an elegant design.",
        "Innovative solution to enhance your daily routine.",
        "Top-rated by customers for its exceptional quality."
    };
    
    @Override
    public void run(String... args) throws Exception {
        log.info("Starting product data seeding...");
        
        // Check if products with our specific SKUs already exist
        long existingProducts = productRepository.count();
        if (existingProducts > 0) {
            log.info("Found {} products in database. Checking if seed products exist.", existingProducts);
            
            // Check if our specific seed products already exist by looking for a specific SKU
            String sampleSKU = generateSampleSKU(0);
            boolean seedProductsExist = productRepository.findBySku(sampleSKU).isPresent();
                
            if (seedProductsExist) {
                log.info("Seed products already exist in database. Skipping seeding.");
                return;
            }
        }
        
        // Get all vendors to assign products to them
        List<Vendor> vendors = vendorRepository.findAll();
        if (vendors.isEmpty()) {
            log.warn("No vendors found. Please run VendorSeeder first.");
            return;
        }
        
        // Create and save mock products
        List<Product> products = new ArrayList<>();
        for (int i = 0; i < 100; i++) { // Create 100 mock products
            Product product = new Product();
            
            // Select a random vendor
            Vendor randomVendor = vendors.get(random.nextInt(vendors.size()));
            product.setVendor(randomVendor);
            
            // Set product details
            String productName = productNames[random.nextInt(productNames.length)];
            product.setName(productName + " " + generateSuffix());
            product.setDescription(descriptions[random.nextInt(descriptions.length)]);
            product.setSku(generateSKU(i)); // Use index for predictable SKUs
            
            // Set price (between $5.99 and $299.99)
            double price = 5.99 + (294.0 * random.nextDouble());
            product.setPrice(new Money(BigDecimal.valueOf(price), "USD"));
            
            // Set inventory
            product.setStockQuantity(10 + random.nextInt(200)); // Between 10 and 210
            product.setMinOrderQuantity(1 + random.nextInt(5)); // Between 1 and 5
            
            // Set dimensions and weight
            product.setWeight(BigDecimal.valueOf(0.1 + (5.0 * random.nextDouble())));
            product.setDimensionsLength(BigDecimal.valueOf(5.0 + (30.0 * random.nextDouble())));
            product.setDimensionsWidth(BigDecimal.valueOf(3.0 + (20.0 * random.nextDouble())));
            product.setDimensionsHeight(BigDecimal.valueOf(2.0 + (15.0 * random.nextDouble())));
            
            // Set status - make most products active for consistent testing
            product.setProductStatus(i % 4 == 0 ? Product.ProductStatus.INACTIVE : Product.ProductStatus.ACTIVE);
            product.setIsActive(product.getProductStatus() == Product.ProductStatus.ACTIVE);
            
            products.add(product);
        }
        
        // Save all products in batches
        int batchSize = 20;
        for (int i = 0; i < products.size(); i += batchSize) {
            int end = Math.min(i + batchSize, products.size());
            List<Product> batch = products.subList(i, end);
            productRepository.saveAll(batch);
            log.debug("Saved batch of {} products ({} to {})", 
                      batch.size(), i+1, end);
        }
        
        log.info("Product data seeding completed. Total products created: {}", products.size());
    }
    
    private String generateSampleSKU(int index) {
        // Generate a predictable sample SKU for checking if seed data exists
        return "SEED-" + String.format("%06d", index);
    }
    
    private String generateSKU(int index) {
        // Generate a random SKU in format SEED-123456
        return "SEED-" + String.format("%06d", index);
    }
    
    private String generateSuffix() {
        String[] suffixes = {"Pro", "Max", "Ultra", "Lite", "Plus", "Deluxe", "Premium", "Basic"};
        return suffixes[random.nextInt(suffixes.length)];
    }
    
    private String generateSKU() {
        // Generate a random SKU in format ABC-123456
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            sb.append(letters.charAt(random.nextInt(letters.length())));
        }
        sb.append("-");
        sb.append(String.format("%06d", random.nextInt(1000000)));
        return sb.toString();
    }
}