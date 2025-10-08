package com.p4.backend.shared.config;

import com.p4.backend.catalog.entity.*;
import com.p4.backend.catalog.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    
    @Value("${app.seed.enabled:false}")
    private boolean seedingEnabled;

    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);
    
    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private ProductAttributeRepository productAttributeRepository;
    
    @Autowired
    private CatalogRepository catalogRepository;
    
    @Autowired
    private MediaAssetRepository mediaAssetRepository;
    
    @Autowired
    private ProductAttributeValueRepository productAttributeValueRepository;
    
    @Autowired
    private ProductMediaRepository productMediaRepository;
    
    private final Random random = new Random();
    
    @Override
    public void run(String... args) throws Exception {
        logger.info("Starting database seeding process...");
        
        // Check if seeding is enabled
        if (!seedingEnabled) {
            logger.info("Database seeding is disabled. Skipping seeding process.");
            return;
        }
        
        // Check if database is already seeded
        if (vendorRepository.count() > 0) {
            logger.info("Database already seeded. Skipping seeding process.");
            return;
        }
        
        seedVendors();
        seedProductAttributes();
        seedMediaAssets();
        seedProducts();
        seedProductAttributeValues();
        seedProductMediaLinks();
        
        logger.info("Database seeding completed successfully!");
    }
    
    private void seedVendors() {
        logger.info("Seeding vendors...");
        
        List<Vendor> vendors = new ArrayList<>();
        
        vendors.add(createVendor("Saudi Industrial Group", 
            "Leading industrial solutions provider in Saudi Arabia", 
            "Ahmed Al-Saud", 
            "ahmed@saudigroup.sa", 
            "+966-11-123-4567",
            "{\"street\":\"King Fahd Road\",\"city\":\"Riyadh\",\"country\":\"Saudi Arabia\",\"zip\":\"12345\"}",
            "300012345670003"));
            
        vendors.add(createVendor("UAE Trading Company", 
            "Premium trading solutions across UAE", 
            "Fatima Al-Nuaimi", 
            "contact@uaetrading.ae", 
            "+971-4-234-5678",
            "{\"street\":\"Sheikh Zayed Road\",\"city\":\"Dubai\",\"country\":\"UAE\",\"zip\":\"45678\"}",
            "400012345678904"));
            
        vendors.add(createVendor("Egyptian Manufacturing Co.", 
            "Manufacturing excellence in Egypt", 
            "Khaled Hassan", 
            "info@egyptmfg.eg", 
            "+20-2-3456-7890",
            "{\"street\":\"Nasr City\",\"city\":\"Cairo\",\"country\":\"Egypt\",\"zip\":\"56789\"}",
            "500012345678905"));
            
        vendors.add(createVendor("Qatar Petrochemical", 
            "Specialized petrochemical solutions", 
            "Mohamed Al-Attiyah", 
            "sales@qatarpc.qa", 
            "+974-445-67890",
            "{\"street\":\"Salwa Road\",\"city\":\"Doha\",\"country\":\"Qatar\",\"zip\":\"67890\"}",
            "600012345678906"));
            
        vendors.add(createVendor("Lebanese Agricultural Group", 
            "Premium agricultural products and solutions", 
            "Rania Khoury", 
            "contact@lebagric.lb", 
            "+961-1-234-5678",
            "{\"street\":\"Rue Maarad\",\"city\":\"Beirut\",\"country\":\"Lebanon\",\"zip\":\"78901\"}",
            "700012345678907"));
        
        vendorRepository.saveAll(vendors);
        logger.info("Seeded {} vendors", vendors.size());
    }
    
    private Vendor createVendor(String name, String description, String contactPerson, 
                                String contactEmail, String contactPhone, String address, String taxNumber) {
        Vendor vendor = new Vendor(name);
        vendor.setDescription(description);
        vendor.setContactPerson(contactPerson);
        vendor.setContactEmail(contactEmail);
        vendor.setContactPhone(contactPhone);
        vendor.setAddress(address);
        vendor.setTaxNumber(taxNumber);
        vendor.setStatus(Vendor.VendorStatus.ACTIVE);
        vendor.setApprovalDate(LocalDateTime.now());
        return vendor;
    }
    
    private void seedProductAttributes() {
        logger.info("Seeding product attributes...");
        
        List<ProductAttribute> attributes = new ArrayList<>();
        
        attributes.add(createProductAttribute("material", "Material", ProductAttribute.AttributeType.TEXT, false, true, true, null));
        attributes.add(createProductAttribute("color", "Color", ProductAttribute.AttributeType.TEXT, false, true, true, null));
        attributes.add(createProductAttribute("size", "Size", ProductAttribute.AttributeType.TEXT, false, true, true, null));
        attributes.add(createProductAttribute("weight", "Weight (kg)", ProductAttribute.AttributeType.NUMBER, false, true, true, null));
        attributes.add(createProductAttribute("length", "Length (cm)", ProductAttribute.AttributeType.NUMBER, false, true, true, null));
        attributes.add(createProductAttribute("width", "Width (cm)", ProductAttribute.AttributeType.NUMBER, false, true, true, null));
        attributes.add(createProductAttribute("height", "Height (cm)", ProductAttribute.AttributeType.NUMBER, false, true, true, null));
        attributes.add(createProductAttribute("certification", "Certification", ProductAttribute.AttributeType.TEXT, false, false, true, null));
        attributes.add(createProductAttribute("brand", "Brand", ProductAttribute.AttributeType.TEXT, false, true, true, null));
        attributes.add(createProductAttribute("warranty", "Warranty Period", ProductAttribute.AttributeType.TEXT, false, false, true, null));
        
        productAttributeRepository.saveAll(attributes);
        logger.info("Seeded {} product attributes", attributes.size());
    }
    
    private ProductAttribute createProductAttribute(String name, String displayName, ProductAttribute.AttributeType type, 
                                                   Boolean isRequired, Boolean isSearchable, Boolean isFilterable, String validationRules) {
        ProductAttribute attr = new ProductAttribute(name, displayName, type);
        attr.setIsRequired(isRequired);
        attr.setIsSearchable(isSearchable);
        attr.setIsFilterable(isFilterable);
        attr.setValidationRules(validationRules);
        return attr;
    }
    
    private void seedMediaAssets() {
        logger.info("Seeding media assets...");
        
        List<MediaAsset> mediaAssets = new ArrayList<>();
        
        // Create some image assets
        mediaAssets.add(createMediaAsset("Industrial Pump Image", "industrial-pump.jpg", "/media/products/industrial-pump.jpg", 
            MediaAsset.MediaType.IMAGE, "Industrial water pump", "Industrial water pump for heavy-duty applications"));
        mediaAssets.add(createMediaAsset("Construction Steel Image", "construction-steel.jpg", "/media/products/construction-steel.jpg", 
            MediaAsset.MediaType.IMAGE, "Construction Steel Beams", "High-quality steel beams for construction"));
        mediaAssets.add(createMediaAsset("Agricultural Equipment Image", "agricultural-equipment.jpg", "/media/products/agricultural-equipment.jpg", 
            MediaAsset.MediaType.IMAGE, "Modern Tractor", "Modern tractor for agricultural operations"));
        mediaAssets.add(createMediaAsset("Solar Panel Image", "solar-panel.jpg", "/media/products/solar-panel.jpg", 
            MediaAsset.MediaType.IMAGE, "Solar Panel", "Efficient solar panel for renewable energy"));
        mediaAssets.add(createMediaAsset("Food Processing Equipment Image", "food-processing.jpg", "/media/products/food-processing.jpg", 
            MediaAsset.MediaType.IMAGE, "Food Processing Machine", "Commercial food processing equipment"));
        mediaAssets.add(createMediaAsset("Lab Equipment Image", "lab-equipment.jpg", "/media/products/lab-equipment.jpg", 
            MediaAsset.MediaType.IMAGE, "Laboratory Equipment", "Precision laboratory testing equipment"));
        mediaAssets.add(createMediaAsset("Textile Machinery Image", "textile-machinery.jpg", "/media/products/textile-machinery.jpg", 
            MediaAsset.MediaType.IMAGE, "Textile Machinery", "Industrial textile production machinery"));
        mediaAssets.add(createMediaAsset("Medical Supplies Image", "medical-supplies.jpg", "/media/products/medical-supplies.jpg", 
            MediaAsset.MediaType.IMAGE, "Medical Supplies", "Essential medical supplies and equipment"));
        mediaAssets.add(createMediaAsset("Electronics Components Image", "electronics.jpg", "/media/products/electronics.jpg", 
            MediaAsset.MediaType.IMAGE, "Electronics Components", "Electronic components for industrial use"));
        mediaAssets.add(createMediaAsset("Packaging Materials Image", "packaging-materials.jpg", "/media/products/packaging-materials.jpg", 
            MediaAsset.MediaType.IMAGE, "Packaging Materials", "Sustainable packaging materials"));
        
        mediaAssetRepository.saveAll(mediaAssets);
        logger.info("Seeded {} media assets", mediaAssets.size());
    }
    
    private MediaAsset createMediaAsset(String name, String filename, String filePath, 
                                        MediaAsset.MediaType mediaType, String title, String caption) {
        MediaAsset asset = new MediaAsset(name, filename, filePath, mediaType);
        asset.setTitle(title);
        asset.setCaption(caption);
        asset.setAltText(title);
        asset.setTags("[\"product\",\"image\"]");
        asset.setIsPrimary(true);
        return asset;
    }
    
    private void seedProducts() {
        logger.info("Seeding products...");
        
        List<Product> products = new ArrayList<>();
        List<Vendor> vendors = vendorRepository.findAll();
        Set<String> usedSlugs = new HashSet<>();
        
        // Generate products for each vendor
        for (int i = 0; i < 50; i++) {
            Vendor vendor = vendors.get(random.nextInt(vendors.size()));
            String productName = generateProductName();
            String productSku = "SKU-" + String.format("%05d", i + 1);
            String productSlug = productName.toLowerCase().replace(" ", "-").replace(",", "").replace("/", "-");
            
            // Ensure slug is unique
            String uniqueSlug = productSlug;
            int counter = 1;
            while (usedSlugs.contains(uniqueSlug)) {
                uniqueSlug = productSlug + "-" + counter;
                counter++;
            }
            usedSlugs.add(uniqueSlug);
            
            Product product = new Product(productName, vendor.getId());
            product.setSlug(uniqueSlug);
            product.setSku(productSku);
            product.setDescription(generateProductDescription(productName));
            product.setShortDescription("High-quality " + productName + " for industrial use");
            product.setVendorId(vendor.getId());
            product.setStatus(Product.ProductStatus.PUBLISHED);
            product.setBasePrice(generatePrice());
            product.setCurrency("USD");
            product.setBrand(generateBrandName());
            product.setWeight(generateWeight());
            product.setDimensions(generateDimensions());
            product.setMinOrderQty(random.nextInt(10) + 1); // 1-10
            product.setMoq(random.nextInt(50) + 5); // 5-54
            product.setInventoryQty(random.nextInt(100) + 10); // 10-109
            product.setInventoryStatus(Product.InventoryStatus.IN_STOCK);
            
            products.add(product);
        }
        
        catalogRepository.saveAll(products);
        logger.info("Seeded {} products", products.size());
    }
    
    private String generateProductName() {
        String[] categories = {"Industrial Pump", "Steel Beam", "Tractor", "Solar Panel", "Food Processor", 
                              "Lab Equipment", "Textile Machine", "Medical Device", "Electronics", "Packaging"};
        String[] modifiers = {"Heavy Duty", "Compact", "Premium", "Eco-Friendly", "High Efficiency", 
                             "Industrial Grade", "Commercial", "Professional", "Advanced", "Smart"};
        
        String category = categories[random.nextInt(categories.length)];
        String modifier = modifiers[random.nextInt(modifiers.length)];
        
        return modifier + " " + category;
    }
    
    private String generateProductDescription(String name) {
        return "High-quality " + name + " with advanced features. Perfect for industrial and commercial applications in the GCC market. " +
               "Compliant with regional standards and certifications. Designed for durability and efficiency in challenging environments. " +
               "Our " + name + " meets the highest quality standards and comes with comprehensive warranty support.";
    }
    
    private BigDecimal generatePrice() {
        // Generate prices from $10 to $50,000
        double basePrice = random.nextDouble() * 49990 + 10;
        return BigDecimal.valueOf(Math.round(basePrice * 100.0) / 100.0);
    }
    
    private String generateBrandName() {
        String[] brands = {"GulfTech", "DesertPower", "ArabianIndustries", "MENA Solutions", "GCC Equipment", 
                          "Phoenix Manufacturing", "Golden Sands", "Oasis Technologies", "Dune Industries", "Pearl Engineering"};
        return brands[random.nextInt(brands.length)];
    }
    
    private BigDecimal generateWeight() {
        // Generate weights from 0.5kg to 500kg
        return BigDecimal.valueOf(Math.round((random.nextDouble() * 499.5 + 0.5) * 10.0) / 10.0);
    }
    
    private String generateDimensions() {
        // Generate dimensions as JSON
        double length = Math.round((random.nextDouble() * 199 + 1) * 10.0) / 10.0;
        double width = Math.round((random.nextDouble() * 99 + 1) * 10.0) / 10.0;
        double height = Math.round((random.nextDouble() * 99 + 1) * 10.0) / 10.0;
        
        return String.format("{\"length\":%.1f,\"width\":%.1f,\"height\":%.1f}", length, width, height);
    }
    
    private void seedProductAttributeValues() {
        logger.info("Seeding product attribute values...");
        
        List<ProductAttributeValue> attributeValues = new ArrayList<>();
        List<Product> products = catalogRepository.findAll();
        List<ProductAttribute> attributes = productAttributeRepository.findAll();
        
        for (Product product : products) {
            // Generate random attribute values for each product
            for (ProductAttribute attribute : attributes) {
                // Only assign values to about 60% of attributes for each product
                if (random.nextDouble() < 0.6) {
                    ProductAttributeValue value = new ProductAttributeValue();
                    value.setProductId(product.getId());
                    value.setAttributeId(attribute.getId());
                    
                    switch (attribute.getAttributeType()) {
                        case TEXT:
                            value.setValueText(generateAttributeValueText(attribute.getName()));
                            break;
                        case NUMBER:
                            // Generate a decimal value for weight, length, width, height
                            if (attribute.getName().equals("weight")) {
                                value.setValueNumber(generateWeight());
                            } else if (attribute.getName().equals("length")) {
                                value.setValueNumber(BigDecimal.valueOf(Math.round((random.nextDouble() * 199 + 1) * 10.0) / 10.0));
                            } else if (attribute.getName().equals("width")) {
                                value.setValueNumber(BigDecimal.valueOf(Math.round((random.nextDouble() * 99 + 1) * 10.0) / 10.0));
                            } else if (attribute.getName().equals("height")) {
                                value.setValueNumber(BigDecimal.valueOf(Math.round((random.nextDouble() * 99 + 1) * 10.0) / 10.0));
                            } else {
                                value.setValueNumber(BigDecimal.valueOf(Math.round((random.nextDouble() * 100) * 100.0) / 100.0));
                            }
                            break;
                        case BOOLEAN:
                            value.setValueBoolean(random.nextBoolean());
                            break;
                        case DATE:
                            // For demo purposes, set a random date in the last year
                            value.setValueDate(LocalDateTime.now().minusDays(random.nextInt(365)));
                            break;
                        case SELECT:
                            value.setValueText(generateAttributeValueText(attribute.getName()));
                            break;
                    }
                    
                    attributeValues.add(value);
                }
            }
        }
        
        productAttributeValueRepository.saveAll(attributeValues);
        logger.info("Seeded {} product attribute values", attributeValues.size());
    }
    
    private String generateAttributeValueText(String attributeName) {
        switch (attributeName.toLowerCase()) {
            case "material":
                String[] materials = {"Steel", "Aluminum", "Plastic", "Wood", "Ceramic", "Composite", "Titanium", "Copper", "Brass", "Iron"};
                return materials[random.nextInt(materials.length)];
            case "color":
                String[] colors = {"Red", "Blue", "Green", "Black", "White", "Silver", "Yellow", "Orange", "Purple", "Gray"};
                return colors[random.nextInt(colors.length)];
            case "size":
                String[] sizes = {"Small", "Medium", "Large", "X-Large", "XX-Large", "32", "34", "36", "38", "40", "42", "S", "M", "L", "XL"};
                return sizes[random.nextInt(sizes.length)];
            case "certification":
                String[] certs = {"ISO 9001", "ISO 14001", "CE", "UL", "ASTM", "SAARC", "GCC Conformity", "SASO", "PSI", "NF"};
                return certs[random.nextInt(certs.length)];
            case "brand":
                return generateBrandName();
            case "warranty":
                String[] warranties = {"1 Year", "2 Years", "3 Years", "5 Years", "Lifetime", "6 Months", "90 Days", "7 Years", "10 Years"};
                return warranties[random.nextInt(warranties.length)];
            default:
                // For other text attributes, generate generic values
                return "Value " + (random.nextInt(20) + 1);
        }
    }
    
    private void seedProductMediaLinks() {
        logger.info("Seeding product-media links...");
        
        List<ProductMedia> productMediaLinks = new ArrayList<>();
        List<Product> products = catalogRepository.findAll();
        List<MediaAsset> mediaAssets = mediaAssetRepository.findAll();
        
        // Link each product to 1-3 random media assets
        for (Product product : products) {
            int numMedia = random.nextInt(3) + 1; // 1-3 media assets per product
            List<Integer> usedIndexes = new ArrayList<>();
            
            for (int i = 0; i < numMedia; i++) {
                int mediaIndex;
                do {
                    mediaIndex = random.nextInt(mediaAssets.size());
                } while (usedIndexes.contains(mediaIndex));
                
                usedIndexes.add(mediaIndex);
                
                ProductMedia link = new ProductMedia();
                link.setProductId(product.getId());
                link.setMediaAssetId(mediaAssets.get(mediaIndex).getId());
                link.setSortOrder(i);
                
                productMediaLinks.add(link);
            }
        }
        
        productMediaRepository.saveAll(productMediaLinks);
        logger.info("Seeded {} product-media links", productMediaLinks.size());
    }
}