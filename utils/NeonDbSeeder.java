import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class NeonDbSeeder {
    
    // Database credentials
    private static final String DB_URL = "jdbc:postgresql://ep-damp-feather-adc322wz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
    private static final String DB_USER = "neondb_owner";
    private static final String DB_PASSWORD = "npg_QTE70VJgbcdp";
    
    public static void main(String[] args) {
        System.out.println("Starting Neon database seeding process...");
        
        try {
            // Load PostgreSQL driver
            Class.forName("org.postgresql.Driver");
            
            // Connect to the database
            System.out.println("Connecting to Neon database...");
            Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            
            // Seed the data
            seedData(connection);
            
            // Close connection
            connection.close();
            System.out.println("Database seeding completed successfully!");
            
        } catch (Exception e) {
            System.err.println("Error during database seeding: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private static void seedData(Connection connection) throws Exception {
        System.out.println("Reading products from CSV...");
        
        // Read products from the CSV file
        List<ProductData> products = readProductsFromCsv("seed/products.csv");
        System.out.println("Found " + products.size() + " products to seed");
        
        // Check if vendor organization exists, create if not
        String vendorId = ensureVendorExists(connection);
        System.out.println("Using vendor ID: " + vendorId);
        
        // Insert products into the database
        insertProducts(connection, products, vendorId);
        
        System.out.println("Successfully seeded " + products.size() + " products");
    }
    
    private static List<ProductData> readProductsFromCsv(String csvPath) throws Exception {
        List<ProductData> products = new ArrayList<>();
        
        try (BufferedReader br = new BufferedReader(new FileReader(csvPath))) {
            String line;
            boolean isFirstLine = true; // Skip header
            
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Skip header line
                    continue;
                }
                
                if (line.trim().isEmpty()) {
                    continue; // Skip empty lines
                }
                
                String[] fields = parseCsvLine(line);
                if (fields.length < 6) { // Need at least sku, name, description, price, category, media_url
                    System.out.println("Warning: Line has insufficient fields, skipping: " + line);
                    continue;
                }
                
                ProductData product = new ProductData();
                product.sku = fields[0].trim(); // sku
                product.name = fields[1].trim(); // name
                product.description = fields[2].trim(); // description
                product.price = new BigDecimal(fields[3].trim()); // price
                product.category = fields[4].trim(); // category
                product.mediaUrl = fields[5].trim(); // media_url
                
                products.add(product);
            }
        }
        
        return products;
    }
    
    // Improved CSV parsing that properly handles quoted fields containing commas and quotes
    private static String[] parseCsvLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder currentField = new StringBuilder();
        boolean inQuotes = false;
        
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            
            if (c == '"') {
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    // This is an escaped quote inside a quoted field
                    currentField.append('"');
                    i++; // Skip the next quote
                } else {
                    // Toggle the inQuotes flag
                    inQuotes = !inQuotes;
                }
            } else if (c == ',' && !inQuotes) {
                // End of field
                fields.add(currentField.toString());
                currentField = new StringBuilder();
            } else {
                currentField.append(c);
            }
        }
        
        // Add the last field
        fields.add(currentField.toString());
        return fields.toArray(new String[0]);
    }
    
    private static String ensureVendorExists(Connection connection) throws Exception {
        // Check if a vendor organization already exists
        String selectSql = "SELECT id FROM organizations WHERE role = 'vendor' LIMIT 1";
        try (PreparedStatement selectStmt = connection.prepareStatement(selectSql)) {
            ResultSet rs = selectStmt.executeQuery();
            if (rs.next()) {
                return rs.getString("id"); // Return existing vendor ID
            }
        }
        
        // If no vendor exists, create one
        String vendorId = generateUlid();
        String insertSql = "INSERT INTO organizations (id, name, role, is_active, created_at, updated_at) VALUES (?, ?, 'vendor', true, NOW(), NOW())";
        
        try (PreparedStatement insertStmt = connection.prepareStatement(insertSql)) {
            insertStmt.setString(1, vendorId);
            insertStmt.setString(2, "Default Vendor Inc.");
            insertStmt.executeUpdate();
            System.out.println("Created new vendor organization with ID: " + vendorId);
        }
        
        return vendorId;
    }
    
    private static void insertProducts(Connection connection, List<ProductData> products, String vendorId) throws Exception {
        // Prepare the insert statement
        String insertSql = "INSERT INTO products (id, vendor_id, sku, name, description, category, reference_price, media_urls, attributes, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?::jsonb, ?::jsonb, true, NOW(), NOW())";
        
        int insertedCount = 0;
        int skippedCount = 0;
        
        for (ProductData productData : products) {
            // Check if product with same vendor_id and sku already exists
            if (productExists(connection, vendorId, productData.sku)) {
                System.out.println("Product with SKU " + productData.sku + " already exists, skipping");
                skippedCount++;
                continue;
            }
            
            try (PreparedStatement insertStmt = connection.prepareStatement(insertSql)) {
                insertStmt.setString(1, generateUlid()); // id
                insertStmt.setString(2, vendorId); // vendor_id
                insertStmt.setString(3, productData.sku); // sku
                insertStmt.setString(4, productData.name); // name
                insertStmt.setString(5, productData.description); // description
                insertStmt.setString(6, productData.category); // category
                insertStmt.setBigDecimal(7, productData.price); // reference_price
                
                // Properly format media_urls as JSON array
                String mediaUrlsJson = "[\"" + productData.mediaUrl.replace("\"", "\\\"") + "\"]";
                insertStmt.setString(8, mediaUrlsJson); // media_urls as JSON array
                
                insertStmt.setString(9, "{}"); // attributes as empty JSON object
                
                insertStmt.executeUpdate();
                insertedCount++;
            }
        }
        
        System.out.println("Inserted " + insertedCount + " new products, skipped " + skippedCount + " existing products");
    }
    
    private static boolean productExists(Connection connection, String vendorId, String sku) throws Exception {
        String selectSql = "SELECT 1 FROM products WHERE vendor_id = ? AND sku = ? LIMIT 1";
        try (PreparedStatement selectStmt = connection.prepareStatement(selectSql)) {
            selectStmt.setString(1, vendorId);
            selectStmt.setString(2, sku);
            ResultSet rs = selectStmt.executeQuery();
            return rs.next(); // Returns true if a record exists
        }
    }
    
    // Simple ULID generator for demo purposes
    private static String generateUlid() {
        // ULIDs are 26-character strings using Crockford's base32
        String chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's base32
        Random random = new Random();
        StringBuilder ulid = new StringBuilder();
        
        // Generate 26 random characters from the allowed set
        for (int i = 0; i < 26; i++) {
            ulid.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        return ulid.toString();
    }
    
    // Helper class to hold product data
    private static class ProductData {
        String sku;
        String name;
        String description;
        BigDecimal price;
        String category;
        String mediaUrl;
    }
}