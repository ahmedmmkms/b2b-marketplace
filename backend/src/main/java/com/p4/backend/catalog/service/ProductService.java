package com.p4.backend.catalog.service;

import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductCreate;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.common.ProblemDetailException;
import com.p4.backend.common.ULIDGenerator;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private MeterRegistry meterRegistry;
    
    private final Counter productCreateCounter;
    private final Counter productConflictCounter;
    private final Timer productServiceTimer;
    
    public ProductService(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        
        this.productCreateCounter = Counter.builder("service_operations_total")
                .description("Total number of successful product creation operations")
                .tag("service", "ProductService")
                .tag("operation", "createProduct")
                .tag("result", "success")
                .register(meterRegistry);
                
        this.productConflictCounter = Counter.builder("service_operations_total")
                .description("Total number of failed product creation operations due to conflict")
                .tag("service", "ProductService")
                .tag("operation", "createProduct")
                .tag("result", "conflict")
                .register(meterRegistry);
                
        this.productServiceTimer = Timer.builder("service_operation_duration_seconds")
                .description("Service operation duration in seconds")
                .tag("service", "ProductService")
                .register(meterRegistry);
    }
    
    /**
     * Browse products with optional search, category filter, and pagination
     * @param query Optional search query for product name
     * @param category Optional category filter
     * @param page Page number (1-based)
     * @param pageSize Number of items per page
     * @return Paginated list of products
     */
    public Page<Product> browseProducts(String query, String category, Integer page, Integer pageSize) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);
        
        logger.debug("Browsing products with query: '{}', category: '{}', page: {}, pageSize: {}, correlationId: {}", 
                    query, category, page, pageSize, correlationId);
        
        // Adjust page to be 0-based for Spring Data (page - 1)
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int size = (pageSize != null && pageSize > 0 && pageSize <= 100) ? pageSize : 20;
        
        // Create pageable object with sorting by name
        Pageable pageable = PageRequest.of(pageNumber, size, Sort.by("name"));
        
        // Perform the search with all filters (attributes not used in current implementation)
        Page<Product> result = productRepository.findByIsActiveTrueWithFilters(
            StringUtils.hasText(query) ? query : null,
            StringUtils.hasText(category) ? category : null,
            pageable
        );
        
        sample.stop(productServiceTimer);
        
        logger.debug("Successfully retrieved {} products, correlationId: {}", result.getContent().size(), correlationId);
        
        return result;
    }
    
    /**
     * Get product by ID
     * @param id Product ID (ULID)
     * @return Product if found and active
     */
    public Product getProductById(String id) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);
        
        logger.debug("Fetching product with id: {}, correlationId: {}", id, correlationId);
        
        // Validate ULID format before querying database
        if (!ULIDGenerator.isValidULID(id)) {
            logger.warn("Invalid ULID format: {}, correlationId: {}", id, correlationId);
            throw new ProblemDetailException(
                HttpStatus.BAD_REQUEST, 
                "https://api.example.com/errors/invalid-id", 
                "Invalid ID format", 
                "Product ID must be a valid ULID format"
            );
        }
        
        Optional<Product> productOpt = productRepository.findById(id);
        
        if (productOpt.isPresent() && productOpt.get().getIsActive()) {
            sample.stop(productServiceTimer);
            logger.debug("Successfully retrieved product with id: {}, correlationId: {}", id, correlationId);
            return productOpt.get();
        } else {
            sample.stop(productServiceTimer);
            logger.warn("Product not found with id: {}, correlationId: {}", id, correlationId);
            throw new ProblemDetailException(
                HttpStatus.NOT_FOUND, 
                "https://api.example.com/errors/product-not-found", 
                "Product not found", 
                "Product with id '" + id + "' does not exist or is not active"
            );
        }
    }
    
    /**
     * Create a new product
     * @param productCreate Request body containing product details
     * @return Created product
     */
    @Transactional
    public Product createProduct(ProductCreate productCreate) {
        String correlationId = MDC.get("correlationId");
        Timer.Sample sample = Timer.start(meterRegistry);
        
        logger.info("Creating new product with vendorId: {}, sku: {}, correlationId: {}", 
                   productCreate.getVendorId(), productCreate.getSku(), correlationId);
        
        // Check if a product with the same vendorId and sku already exists
        Optional<Product> existingProduct = productRepository.findByVendorIdAndSku(
            productCreate.getVendorId(), productCreate.getSku());
        
        if (existingProduct.isPresent()) {
            logger.warn("Product creation failed - duplicate product found for vendorId: {}, sku: {}, correlationId: {}", 
                       productCreate.getVendorId(), productCreate.getSku(), correlationId);
            productConflictCounter.increment();
            throw new ProblemDetailException(
                HttpStatus.CONFLICT, 
                "https://api.example.com/errors/product-conflict", 
                "Product already exists", 
                "A product with vendorId '" + productCreate.getVendorId() + 
                "' and sku '" + productCreate.getSku() + "' already exists"
            );
        }
        
        // Create new product
        Product product = new Product();
        String productId = ULIDGenerator.generateULID();
        product.setId(productId);
        product.setVendorId(productCreate.getVendorId());
        product.setSku(productCreate.getSku());
        product.setName(productCreate.getName());
        product.setDescription(productCreate.getDescription());
        product.setCategory(productCreate.getCategory());
        product.setReferencePrice(productCreate.getReferencePrice() != null ? 
            BigDecimal.valueOf(productCreate.getReferencePrice()) : null);
        product.setMediaUrls(productCreate.getMediaUrls());
        product.setAttributes(productCreate.getAttributes());
        
        Product savedProduct = productRepository.save(product);
        
        sample.stop(productServiceTimer);
        productCreateCounter.increment();
        
        logger.info("Successfully created product with id: {}, vendorId: {}, sku: {}, correlationId: {}", 
                   productId, productCreate.getVendorId(), productCreate.getSku(), correlationId);
        
        return savedProduct;
    }
}