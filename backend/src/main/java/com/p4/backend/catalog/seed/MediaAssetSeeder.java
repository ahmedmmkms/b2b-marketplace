package com.p4.backend.catalog.seed;

import com.p4.backend.catalog.model.MediaAsset;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductMedia;
import com.p4.backend.catalog.repository.MediaAssetRepository;
import com.p4.backend.catalog.repository.ProductMediaRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Data seeder for MediaAsset and ProductMedia entities
 * This component runs in all environments but only seeds if no media assets exist
 */
@Component
@Profile({"dev", "test"})
@Order(4)
@RequiredArgsConstructor
@Slf4j
public class MediaAssetSeeder implements CommandLineRunner {
    
    private final MediaAssetRepository mediaAssetRepository;
    private final ProductMediaRepository productMediaRepository;
    private final ProductRepository productRepository;
    private final Random random = new Random();
    
    // Sample image filenames
    private final String[] imageFilenames = {
        "product_main_1.jpg", "product_alt_1.jpg", "product_detail_1.jpg", 
        "product_main_2.jpg", "product_alt_2.jpg", "product_detail_2.jpg",
        "product_main_3.jpg", "product_alt_3.jpg", "product_detail_3.jpg",
        "product_main_4.jpg", "product_alt_4.jpg", "product_detail_4.jpg"
    };
    
    // Sample content types
    private final String[] contentTypes = {
        "image/jpeg", "image/png", "image/gif", "image/webp"
    };
    
    // Sample media types
    private final MediaAsset.MediaType[] mediaTypes = {
        MediaAsset.MediaType.IMAGE, MediaAsset.MediaType.IMAGE, MediaAsset.MediaType.IMAGE,
        MediaAsset.MediaType.VIDEO, MediaAsset.MediaType.DOCUMENT
    };
    
    @Override
    public void run(String... args) throws Exception {
        log.info("Starting media asset data seeding...");
        
        // Check if we have seed products to attach media to
        long existingProducts = productRepository.count();
        if (existingProducts == 0) {
            log.info("No products found. Media seeding requires products to exist. Skipping.");
            return;
        }
        
        // Check if media assets with our specific filenames already exist
        long existingMediaAssets = mediaAssetRepository.count();
        if (existingMediaAssets > 0) {
            log.info("Found {} media assets in database. Checking if seed assets exist.", existingMediaAssets);
            
            // Check if our specific seed media assets already exist by looking for a specific filename
            boolean seedMediaExists = mediaAssetRepository.findAll().stream()
                .anyMatch(m -> m.getOriginalFilename().startsWith("product_main_1"));
                
            if (seedMediaExists) {
                log.info("Seed media assets already exist in database. Skipping seeding.");
                return;
            }
        }
        
        // Get all products to connect media to them
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            log.warn("No products found. Please run ProductSeeder first.");
            return;
        }
        
        List<MediaAsset> mediaAssets = new ArrayList<>();
        List<ProductMedia> productMedias = new ArrayList<>();
        
        // Create and save mock media assets
        for (int i = 0; i < 300; i++) { // Create 300 mock media assets
            MediaAsset mediaAsset = new MediaAsset();
            
            // Set media details with more predictable names
            mediaAsset.setOriginalFilename("product_" + String.format("img_%03d", i+1) + ".jpg");
            mediaAsset.setStoragePath("/images/products/seed/" + mediaAsset.getOriginalFilename());
            mediaAsset.setContentType(contentTypes[i % contentTypes.length]);
            mediaAsset.setFileSize(50000L + (i * 1000L)); // Predictable file sizes
            mediaAsset.setAltText("Alt text for " + mediaAsset.getOriginalFilename());
            mediaAsset.setCaption("Caption for " + mediaAsset.getOriginalFilename());
            mediaAsset.setMediaType(mediaTypes[i % mediaTypes.length]);
            mediaAsset.setUploadDate(LocalDateTime.now().minusDays(i % 180)); // Within last 180 days
            
            mediaAssets.add(mediaAsset);
        }
        
        // Save all media assets
        List<MediaAsset> savedMediaAssets = mediaAssetRepository.saveAll(mediaAssets);
        log.debug("Saved {} media assets", savedMediaAssets.size());
        
        // Now create product-media relationships
        // Distribute media assets evenly among products
        int mediaIndex = 0;
        for (Product product : products) {
            // Each product gets between 1 and 4 media assets
            int mediaCount = 1 + (product.getId().hashCode() % 4); // Deterministic count based on product ID
            
            for (int j = 0; j < mediaCount; j++) {
                ProductMedia productMedia = new ProductMedia();
                
                // Select a media asset in sequence
                MediaAsset mediaAsset = savedMediaAssets.get(mediaIndex % savedMediaAssets.size());
                productMedia.setProduct(product);
                productMedia.setMediaAsset(mediaAsset);
                productMedia.setDisplayOrder(j + 1);
                productMedia.setIsPrimary(j == 0); // First one is primary
                productMedia.setAltTextOverride("Product " + product.getName() + " - Image " + (j+1));
                
                productMedias.add(productMedia);
                mediaIndex++;
            }
        }
        
        // Save all product-media relationships
        productMediaRepository.saveAll(productMedias);
        log.debug("Saved {} product-media relationships", productMedias.size());
        
        log.info("Media asset data seeding completed. Media assets: {}, Product-Media links: {}", 
                 savedMediaAssets.size(), productMedias.size());
    }
    
    private String generatePathSegment() {
        // Generate a random path segment for storage
        String chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}