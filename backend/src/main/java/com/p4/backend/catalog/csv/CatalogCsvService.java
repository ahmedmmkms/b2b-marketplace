package com.p4.backend.catalog.csv;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.repository.CatalogRepository;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CatalogCsvService {
    
    private static final Logger logger = LoggerFactory.getLogger(CatalogCsvService.class);
    
    @Autowired
    private CatalogRepository catalogRepository;
    
    /**
     * Imports products from a CSV file
     * @param file The uploaded CSV file
     * @return A result object containing success/error information
     */
    public ImportResult importProductsFromCsv(MultipartFile file) {
        logger.info("Starting CSV import for file: {}", file.getOriginalFilename());
        
        try (InputStreamReader reader = new InputStreamReader(file.getInputStream())) {
            List<ProductCsvDto> csvProducts = new CsvToBeanBuilder<ProductCsvDto>(reader)
                    .withType(ProductCsvDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();
            
            List<Product> productsToSave = new ArrayList<>();
            List<ImportError> errors = new ArrayList<>();
            
            for (int i = 0; i < csvProducts.size(); i++) {
                ProductCsvDto csvProduct = csvProducts.get(i);
                try {
                    Product product = convertToProduct(csvProduct);
                    productsToSave.add(product);
                } catch (Exception e) {
                    errors.add(new ImportError(i + 1, e.getMessage(), csvProduct));
                    logger.error("Error processing CSV row {}: {}", i + 1, e.getMessage());
                }
            }
            
            // Save all valid products
            List<Product> savedProducts = catalogRepository.saveAll(productsToSave);
            
            ImportResult result = new ImportResult();
            result.setTotalRows(csvProducts.size());
            result.setProcessedRows(productsToSave.size());
            result.setErrors(errors);
            result.setSuccess(savedProducts.size() == productsToSave.size());
            
            logger.info("CSV import completed. Total: {}, Processed: {}, Errors: {}", 
                       result.getTotalRows(), result.getProcessedRows(), result.getErrors().size());
            
            return result;
            
        } catch (Exception e) {
            logger.error("Error during CSV import", e);
            throw new RuntimeException("Error during CSV import: " + e.getMessage(), e);
        }
    }
    
    /**
     * Converts a CSV DTO to a Product entity
     */
    private Product convertToProduct(ProductCsvDto csvProduct) {
        Product product = new Product();
        
        // Required fields
        product.setName(csvProduct.getName());
        product.setSku(csvProduct.getSku());
        product.setVendorId(csvProduct.getVendorId());
        
        // Optional fields
        product.setSlug(csvProduct.getSlug());
        product.setDescription(csvProduct.getDescription());
        product.setShortDescription(csvProduct.getShortDescription());
        product.setUpc(csvProduct.getUpc());
        product.setGtin(csvProduct.getGtin());
        product.setMpn(csvProduct.getMpn());
        product.setBrand(csvProduct.getBrand());
        product.setCategoryId(csvProduct.getCategoryId());
        
        // Status
        if (csvProduct.getStatus() != null) {
            try {
                product.setStatus(Product.ProductStatus.valueOf(csvProduct.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid product status: " + csvProduct.getStatus());
            }
        }
        
        // Currency
        if (csvProduct.getCurrency() != null) {
            product.setCurrency(csvProduct.getCurrency().toUpperCase());
        }
        
        // Price
        if (csvProduct.getBasePrice() != null && !csvProduct.getBasePrice().trim().isEmpty()) {
            try {
                product.setBasePrice(new BigDecimal(csvProduct.getBasePrice()));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid base price format: " + csvProduct.getBasePrice());
            }
        }
        
        product.setTaxClass(csvProduct.getTaxClass());
        product.setMetaTitle(csvProduct.getMetaTitle());
        product.setMetaDescription(csvProduct.getMetaDescription());
        product.setMetaKeywords(csvProduct.getMetaKeywords());
        
        // Weight
        if (csvProduct.getWeight() != null && !csvProduct.getWeight().trim().isEmpty()) {
            try {
                product.setWeight(new BigDecimal(csvProduct.getWeight()));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid weight format: " + csvProduct.getWeight());
            }
        }
        
        // Quantities
        if (csvProduct.getMinOrderQty() != null && !csvProduct.getMinOrderQty().trim().isEmpty()) {
            try {
                product.setMinOrderQty(Integer.parseInt(csvProduct.getMinOrderQty()));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid min order quantity format: " + csvProduct.getMinOrderQty());
            }
        }
        
        if (csvProduct.getMoq() != null && !csvProduct.getMoq().trim().isEmpty()) {
            try {
                product.setMoq(Integer.parseInt(csvProduct.getMoq()));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid MOQ format: " + csvProduct.getMoq());
            }
        }
        
        // Inventory tracking
        if (csvProduct.getInventoryTracking() != null) {
            product.setInventoryTracking("true".equalsIgnoreCase(csvProduct.getInventoryTracking()) || 
                                        "1".equals(csvProduct.getInventoryTracking()) || 
                                        "yes".equalsIgnoreCase(csvProduct.getInventoryTracking()));
        }
        
        if (csvProduct.getInventoryQty() != null && !csvProduct.getInventoryQty().trim().isEmpty()) {
            try {
                product.setInventoryQty(Integer.parseInt(csvProduct.getInventoryQty()));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid inventory quantity format: " + csvProduct.getInventoryQty());
            }
        }
        
        // Inventory status
        if (csvProduct.getInventoryStatus() != null) {
            try {
                product.setInventoryStatus(Product.InventoryStatus.valueOf(csvProduct.getInventoryStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid inventory status: " + csvProduct.getInventoryStatus());
            }
        }
        
        return product;
    }
    
    /**
     * Generates a sample CSV template for product imports
     */
    public byte[] generateSampleCsv() {
        try {
            List<ProductCsvDto> sampleProducts = new ArrayList<>();
            
            // Add a sample product
            ProductCsvDto sample = new ProductCsvDto();
            sample.setName("Sample Product");
            sample.setSlug("sample-product");
            sample.setDescription("This is a sample product description");
            sample.setShortDescription("Sample product");
            sample.setSku("SAMPLE-001");
            sample.setUpc("123456789012");
            sample.setGtin("1234567890123");
            sample.setMpn("SAMPLE-MPN");
            sample.setBrand("Sample Brand");
            sample.setCategoryId("category1");
            sample.setVendorId("vendor123");
            sample.setStatus("PUBLISHED");
            sample.setCurrency("USD");
            sample.setBasePrice("99.99");
            sample.setTaxClass("standard");
            sample.setMetaTitle("Sample Product Title");
            sample.setMetaDescription("Sample product for import template");
            sample.setMetaKeywords("sample, product, template");
            sample.setWeight("1.5");
            sample.setMinOrderQty("1");
            sample.setMoq("10");
            sample.setInventoryTracking("true");
            sample.setInventoryQty("100");
            sample.setInventoryStatus("IN_STOCK");
            
            sampleProducts.add(sample);
            
            StringWriter writer = new StringWriter();
            StatefulBeanToCsv<ProductCsvDto> beanToCsv = new StatefulBeanToCsvBuilder<ProductCsvDto>(writer)
                    .withApplyQuotesToAll(false)
                    .build();
            
            beanToCsv.write(sampleProducts);
            
            return writer.toString().getBytes();
        } catch (Exception e) {
            logger.error("Error generating sample CSV", e);
            throw new RuntimeException("Error generating sample CSV: " + e.getMessage(), e);
        }
    }
    
    // Result classes
    public static class ImportResult {
        private int totalRows;
        private int processedRows;
        private boolean success;
        private List<ImportError> errors;
        
        // Getters and setters
        public int getTotalRows() { return totalRows; }
        public void setTotalRows(int totalRows) { this.totalRows = totalRows; }
        
        public int getProcessedRows() { return processedRows; }
        public void setProcessedRows(int processedRows) { this.processedRows = processedRows; }
        
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        
        public List<ImportError> getErrors() { return errors; }
        public void setErrors(List<ImportError> errors) { this.errors = errors; }
    }
    
    public static class ImportError {
        private int rowNumber;
        private String error;
        private ProductCsvDto rowValue;
        
        public ImportError(int rowNumber, String error, ProductCsvDto rowValue) {
            this.rowNumber = rowNumber;
            this.error = error;
            this.rowValue = rowValue;
        }
        
        // Getters and setters
        public int getRowNumber() { return rowNumber; }
        public void setRowNumber(int rowNumber) { this.rowNumber = rowNumber; }
        
        public String getError() { return error; }
        public void setError(String error) { this.error = error; }
        
        public ProductCsvDto getRowValue() { return rowValue; }
        public void setRowValue(ProductCsvDto rowValue) { this.rowValue = rowValue; }
    }
}