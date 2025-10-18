package com.p4.backend.catalog.seed;

import com.p4.backend.catalog.model.ProductAttribute;
import com.p4.backend.catalog.model.ProductAttributeValue;
import com.p4.backend.catalog.repository.ProductAttributeRepository;
import com.p4.backend.catalog.repository.ProductAttributeValueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * Data seeder for ProductAttribute and ProductAttributeValue entities
 * This component runs in all environments but only seeds if no attributes exist
 */
@Component
@Order(3)
@RequiredArgsConstructor
@Slf4j
public class ProductAttributeSeeder implements CommandLineRunner {
    
    private final ProductAttributeRepository attributeRepository;
    private final ProductAttributeValueRepository attributeValueRepository;
    private final Random random = new Random();
    
    // Sample attribute definitions
    private final List<AttributeDefinition> attributeDefinitions = Arrays.asList(
        new AttributeDefinition("color", "Color", "The color of the product", 
                                ProductAttribute.AttributeType.SELECT, true, true),
        new AttributeDefinition("size", "Size", "The size of the product", 
                                ProductAttribute.AttributeType.SELECT, true, true),
        new AttributeDefinition("material", "Material", "The material of the product", 
                                ProductAttribute.AttributeType.SELECT, false, true),
        new AttributeDefinition("weight", "Weight", "The weight of the product in grams", 
                                ProductAttribute.AttributeType.NUMBER, false, false),
        new AttributeDefinition("brand", "Brand", "The brand of the product", 
                                ProductAttribute.AttributeType.TEXT, false, true),
        new AttributeDefinition("model", "Model", "The model number of the product", 
                                ProductAttribute.AttributeType.TEXT, false, false),
        new AttributeDefinition("warranty", "Warranty", "Warranty period in months", 
                                ProductAttribute.AttributeType.NUMBER, false, false),
        new AttributeDefinition("power", "Power", "Power consumption in watts", 
                                ProductAttribute.AttributeType.NUMBER, false, false)
    );
    
    // Sample values for each attribute
    private final List<String[]> attributeValues = Arrays.asList(
        // Color values
        new String[]{"Red", "Blue", "Green", "Black", "White", "Yellow", "Purple", "Orange"},
        // Size values
        new String[]{"XS", "S", "M", "L", "XL", "XXL", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"},
        // Material values
        new String[]{"Cotton", "Polyester", "Leather", "Metal", "Plastic", "Wood", "Silicon", "Stainless Steel"},
        // Weight is numeric, so we'll generate values during seeding
        new String[]{},
        // Brand values
        new String[]{"TechBrand", "PremiumGoods", "ReliableCo", "GlobalTrusted", "InnovateX", "QualityFirst", "ProLine"},
        // Model values are generated
        new String[]{},
        // Warranty periods
        new String[]{"6", "12", "24", "36", "60"},
        // Power values
        new String[]{"5", "10", "15", "20", "50", "100", "200"}
    );
    
    @Override
    public void run(String... args) throws Exception {
        log.info("Starting product attribute data seeding...");
        
        // Check if attributes with our specific names already exist
        long existingAttributes = attributeRepository.count();
        if (existingAttributes > 0) {
            log.info("Found {} attributes in database. Checking if seed attributes exist.", existingAttributes);
            
            // Check if our specific seed attributes already exist
            boolean seedAttributesExist = attributeRepository.existsByName(attributeDefinitions.get(0).name);
                
            if (seedAttributesExist) {
                log.info("Seed attributes already exist in database. Skipping seeding.");
                return;
            }
        }
        
        List<ProductAttribute> attributes = new ArrayList<>();
        List<ProductAttributeValue> allAttributeValues = new ArrayList<>();
        
        // Create and save the attributes
        for (int i = 0; i < attributeDefinitions.size(); i++) {
            AttributeDefinition def = attributeDefinitions.get(i);
            String[] values = attributeValues.get(i);
            
            ProductAttribute attribute = new ProductAttribute();
            attribute.setName(def.name);
            attribute.setDisplayName(def.displayName);
            attribute.setDescription(def.description);
            attribute.setAttributeType(def.type);
            attribute.setIsRequired(def.required);
            attribute.setIsFilterable(def.filterable);
            attribute.setSortOrder(i + 1);
            
            attributes.add(attribute);
        }
        
        // Save all attributes first
        List<ProductAttribute> savedAttributes = attributeRepository.saveAll(attributes);
        log.debug("Saved {} product attributes", savedAttributes.size());
        
        // Create and save attribute values
        for (int i = 0; i < savedAttributes.size(); i++) {
            ProductAttribute attribute = savedAttributes.get(i);
            String[] values = attributeValues.get(i);
            
            // For numeric attributes or special cases, we may need to generate values differently
            if (attribute.getAttributeType() == ProductAttribute.AttributeType.NUMBER) {
                if (attribute.getName().equals("weight")) {
                    // Generate specific weights between 10-5000 grams
                    for (int w = 0; w < 8; w++) {
                        ProductAttributeValue value = new ProductAttributeValue();
                        value.setProductAttribute(attribute);
                        int weight = 10 + (w * 624); // Creates predictable values: 10, 634, 1258, etc.
                        value.setValue(String.valueOf(weight));
                        value.setDisplayValue(weight + "g");
                        value.setIsDefault(w == 0); // First value is default
                        value.setSortOrder(w + 1);
                        allAttributeValues.add(value);
                    }
                } else if (attribute.getName().equals("model")) {
                    // Generate specific model numbers
                    for (int m = 0; m < 15; m++) {
                        ProductAttributeValue value = new ProductAttributeValue();
                        value.setProductAttribute(attribute);
                        value.setValue("MOD-" + String.format("%06d", m + 100000)); // MOD-100000 to MOD-100014
                        value.setDisplayValue(value.getValue());
                        value.setIsDefault(m == 0); // First value is default
                        value.setSortOrder(m + 1);
                        allAttributeValues.add(value);
                    }
                } else {
                    // For other number attributes, use the predefined values
                    for (int j = 0; j < values.length; j++) {
                        ProductAttributeValue value = new ProductAttributeValue();
                        value.setProductAttribute(attribute);
                        value.setValue(values[j]);
                        value.setDisplayValue(values[j]);
                        value.setIsDefault(j == 0); // First value is default
                        value.setSortOrder(j + 1);
                        allAttributeValues.add(value);
                    }
                }
            } else {
                // For non-number attributes, use the predefined values
                for (int j = 0; j < values.length; j++) {
                    ProductAttributeValue value = new ProductAttributeValue();
                    value.setProductAttribute(attribute);
                    value.setValue(values[j]);
                    value.setDisplayValue(values[j]);
                    value.setIsDefault(j == 0); // First value is default for select/text
                    value.setSortOrder(j + 1);
                    allAttributeValues.add(value);
                }
            }
        }
        
        // Save all attribute values
        attributeValueRepository.saveAll(allAttributeValues);
        log.debug("Saved {} product attribute values", allAttributeValues.size());
        
        log.info("Product attribute data seeding completed. Attributes: {}, Values: {}", 
                 savedAttributes.size(), allAttributeValues.size());
    }
    
    // Helper class to define attribute properties
    private static class AttributeDefinition {
        final String name;
        final String displayName;
        final String description;
        final ProductAttribute.AttributeType type;
        final Boolean required;
        final Boolean filterable;
        
        AttributeDefinition(String name, String displayName, String description, 
                           ProductAttribute.AttributeType type, Boolean required, Boolean filterable) {
            this.name = name;
            this.displayName = displayName;
            this.description = description;
            this.type = type;
            this.required = required;
            this.filterable = filterable;
        }
    }
}