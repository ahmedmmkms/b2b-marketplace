# Sprint 0 Setup Guide: Getting Started with P4 B2B Marketplace (Monorepo)

This guide will walk you through setting up all the required services, accounts, and local development environment for the P4 B2B Marketplace project using a monorepo approach with both frontend and backend in the same repository.

## Table of Contents
1. [Required Accounts & Services](#required-accounts--services)
2. [Local Development Environment](#local-development-environment)
3. [Repository Setup](#repository-setup)
4. [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
5. [Frontend Setup (Angular)](#frontend-setup-angular)
6. [Database & Storage Setup](#database--storage-setup)
7. [Deployment & CI/CD Setup](#deployment--cicd-setup)

## Required Accounts & Services

### 1. GitHub Account
- Sign up at [github.com](https://github.com) if you don't already have one
- Create an access token with appropriate permissions for CI/CD

### 2. Cloudflare Account (Pages) + Backblaze B2
1. Go to [cloudflare.com](https://www.cloudflare.com/)
2. Sign up for a free account
3. Verify your email and set up your account
4. For Pages: Create a new project connected to your GitHub repository
5. For B2: Go to [backblaze.com](https://www.backblaze.com/) and sign up for a free account without requiring a credit card

### 3. Azure Account (Primary Cloud Provider)
1. Visit [azure.microsoft.com](https://azure.microsoft.com/)
2. Sign up for a free account (requires credit card verification for identity purposes, but many services remain free)
3. Access the Azure portal dashboard after verification
4. Take advantage of the $200 credit for the first 30 days and 12 months of free services
5. For Java hosting: Use Azure App Service to deploy your Spring Boot application directly using JAR files
6. Link your GitHub account for seamless deployment integration (optional)

### 4. Neon Account (PostgreSQL)
1. Go to [neon.tech](https://neon.tech/)
2. Sign up for a free account
3. Create a new project and take note of your connection details

### 5. Upstash Account (Redis)
1. Visit [upstash.com](https://upstash.com/)
2. Sign up for a free account
3. Create a new Redis database and note the connection URL

## Local Development Environment

### Java 21
1. Download and install OpenJDK 21 from one of these sources:
   - [OpenJDK](https://openjdk.org/projects/jdk/25/) (official)
   - [Eclipse Temurin](https://adoptium.net/) (recommended) - check for JDK 25 when available
   - [Oracle JDK](https://www.oracle.com/java/technologies/) (commercial) - check for JDK 25 when available

2. Verify installation:
```bash
java -version
```
Should show version 25.x.x

### Node.js and npm
1. Download and install Node.js (v20.x or higher) from [nodejs.org](https://nodejs.org/)
2. This will also install npm automatically
3. Verify installation:
```bash
node --version
npm --version
```

### Angular CLI
1. Install globally using npm:
```bash
npm install -g @angular/cli
```

2. Verify installation:
```bash
ng version
```

### Git
1. Download and install Git from [git-scm.com](https://git-scm.com/)
2. Configure Git:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### IDE Recommendations
- **IntelliJ IDEA** or **Eclipse** for Java/Spring Boot development
- **Visual Studio Code** for Angular development (with Angular extension pack)

## Repository Setup

### Creating GitHub Repository
1. In your GitHub account, create a new public repository:
   - `p4-monorepo` (or `p4-marketplace`)

2. Add branch protection rules:
   - Protect `main` branch
   - Protect `release/*` branches
   - Require pull requests and status checks

### Cloning Repository
```bash
# Create a workspace directory
mkdir p4-workspace && cd p4-workspace

# Clone repository
git clone https://github.com/YOUR_USERNAME/p4-monorepo.git
cd p4-monorepo
```

## Backend Setup (Spring Boot)

### Prerequisites
- Java 21 (installed earlier)
- Maven or Gradle (will be set up automatically in project)

### Initial Project Setup
1. In your monorepo root directory, create the backend directory:
```bash
mkdir backend && cd backend
```

2. Create a basic Spring Boot project structure:
```bash
curl https://start.spring.io/starter.tgz \
  -d dependencies=web,actuator,devtools,h2,data-jpa,cache,validation \
  -d javaVersion=21 \
  -d packageName=com.p4.backend \
  -d type=maven-project \
  -d name=p4-backend \
  -d artifactId=p4-backend | tar -xzf -
```

3. Create the main modules directories:
```bash
mkdir -p src/main/java/com/p4/backend/{catalog,rfq,orders,payments,invoicing,wallet,loyalty,identity,ops,shared}
```

4. Add required dependencies to `pom.xml`:
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-cache</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-batch</artifactId>
    </dependency>
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.1.0</version>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

5. Create basic module structure with initial interfaces and entities:
```bash
# Create package structure for catalog module
mkdir -p src/main/java/com/p4/backend/catalog/{controller,entity,repository,service,model}

# Create Product.java
cat > src/main/java/com/p4/backend/catalog/entity/Product.java << 'EOF'
package com.p4.backend.catalog.entity;

import com.p4.backend.shared.entity.BaseEntity;
import com.p4.backend.shared.vo.Money;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "product")
public class Product extends BaseEntity {
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true)
    private String slug;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String shortDescription;
    
    @Column(unique = true)
    private String sku;
    
    private String upc;
    private String gtin;
    private String mpn;
    private String brand;
    
    @Column(name = "category_id")
    private String categoryId;
    
    @Column(name = "vendor_id", nullable = false)
    private String vendorId;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ProductStatus status = ProductStatus.DRAFT;
    
    private String currency = "USD";
    
    @Column(name = "base_price", precision = 19, scale = 4)
    private BigDecimal basePrice;
    
    @Column(name = "tax_class")
    private String taxClass;
    
    @Column(name = "meta_title")
    private String metaTitle;
    
    @Column(name = "meta_description")
    private String metaDescription;
    
    @Column(name = "meta_keywords")
    private String metaKeywords;
    
    private BigDecimal weight;
    
    @Column(columnDefinition = "JSONB")
    private String dimensions; // JSON string for length, width, height
    
    @Column(columnDefinition = "JSONB")
    private String packagingInfo; // JSON string for packaging details
    
    @Column(name = "min_order_qty")
    private Integer minOrderQty = 1;
    
    @Column(name = "moq")
    private Integer moq; // Minimum Order Quantity
    
    @Column(name = "inventory_tracking")
    private Boolean inventoryTracking = false;
    
    @Column(name = "inventory_qty")
    private Integer inventoryQty = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "inventory_status", length = 20)
    private InventoryStatus inventoryStatus = InventoryStatus.IN_STOCK;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Product() {
        super();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Product(String name, String vendorId) {
        super();
        this.name = name;
        this.vendorId = vendorId;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public String getUpc() { return upc; }
    public void setUpc(String upc) { this.upc = upc; }
    
    public String getGtin() { return gtin; }
    public void setGtin(String gtin) { this.gtin = gtin; }
    
    public String getMpn() { return mpn; }
    public void setMpn(String mpn) { this.mpn = mpn; }
    
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    
    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }
    
    public String getVendorId() { return vendorId; }
    public void setVendorId(String vendorId) { this.vendorId = vendorId; }
    
    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }
    
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    
    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }
    
    public String getTaxClass() { return taxClass; }
    public void setTaxClass(String taxClass) { this.taxClass = taxClass; }
    
    public String getMetaTitle() { return metaTitle; }
    public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
    
    public String getMetaDescription() { return metaDescription; }
    public void setMetaDescription(String metaDescription) { this.metaDescription = metaDescription; }
    
    public String getMetaKeywords() { return metaKeywords; }
    public void setMetaKeywords(String metaKeywords) { this.metaKeywords = metaKeywords; }
    
    public BigDecimal getWeight() { return weight; }
    public void setWeight(BigDecimal weight) { this.weight = weight; }
    
    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }
    
    public String getPackagingInfo() { return packagingInfo; }
    public void setPackagingInfo(String packagingInfo) { this.packagingInfo = packagingInfo; }
    
    public Integer getMinOrderQty() { return minOrderQty; }
    public void setMinOrderQty(Integer minOrderQty) { this.minOrderQty = minOrderQty; }
    
    public Integer getMoq() { return moq; }
    public void setMoq(Integer moq) { this.moq = moq; }
    
    public Boolean getInventoryTracking() { return inventoryTracking; }
    public void setInventoryTracking(Boolean inventoryTracking) { this.inventoryTracking = inventoryTracking; }
    
    public Integer getInventoryQty() { return inventoryQty; }
    public void setInventoryQty(Integer inventoryQty) { this.inventoryQty = inventoryQty; }
    
    public InventoryStatus getInventoryStatus() { return inventoryStatus; }
    public void setInventoryStatus(InventoryStatus inventoryStatus) { this.inventoryStatus = inventoryStatus; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Enums
    public enum ProductStatus {
        DRAFT, PUBLISHED, UNPUBLISHED, SUSPENDED
    }
    
    public enum InventoryStatus {
        IN_STOCK, OUT_OF_STOCK, BACKORDER, DISCONTINUED
    }
    
    // Helper methods
    public Money getPrice() {
        if (basePrice != null && currency != null) {
            return Money.of(basePrice, currency);
        }
        return Money.zero("USD"); // Default fallback
    }
}
EOF

# Create CatalogRepository.java
cat > src/main/java/com/p4/backend/catalog/repository/CatalogRepository.java << 'EOF'
package com.p4.backend.catalog.repository;

import com.p4.backend.catalog.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatalogRepository extends JpaRepository<Product, String> {
    List<Product> findByVendorId(String vendorId);
    List<Product> findByNameContainingIgnoreCase(String name);
}
EOF

# Create CatalogService.java
cat > src/main/java/com/p4/backend/catalog/service/CatalogService.java << 'EOF'
package com.p4.backend.catalog.service;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogService {
    
    @Autowired
    private CatalogRepository catalogRepository;
    
    public List<Product> getAllProducts() {
        return catalogRepository.findAll();
    }
    
    public Optional<Product> getProductById(String id) {
        return catalogRepository.findById(id);
    }
    
    public Product saveProduct(Product product) {
        return catalogRepository.save(product);
    }
    
    public void deleteProduct(String id) {
        catalogRepository.deleteById(id);
    }
    
    public List<Product> getProductsByVendor(String vendorId) {
        return catalogRepository.findByVendorId(vendorId);
    }
    
    public List<Product> searchProducts(String name) {
        return catalogRepository.findByNameContainingIgnoreCase(name);
    }
}
EOF

# Create CatalogController.java
cat > src/main/java/com/p4/backend/catalog/controller/CatalogController.java << 'EOF'
package com.p4.backend.catalog.controller;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    
    @Autowired
    private CatalogService catalogService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = catalogService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = catalogService.getProductById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = catalogService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        if (!catalogService.getProductById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        product.setId(id);
        Product updatedProduct = catalogService.saveProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        if (!catalogService.getProductById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        catalogService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<Product>> getProductsByVendor(@PathVariable String vendorId) {
        List<Product> products = catalogService.getProductsByVendor(vendorId);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String name) {
        List<Product> products = catalogService.searchProducts(name);
        return ResponseEntity.ok(products);
    }
}
EOF
```

5. Add application properties for development:
```yaml
# src/main/resources/application.yaml
spring:
  application:
    name: p4-backend
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: password
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
    show-sql: true
  h2:
    console:
      enabled: true
  cache:
    type: simple
  flyway:
    enabled: true
    locations: classpath:db/migration
  lifecycle:
    timeout-per-shutdown-phase: 30s
server:
  port: 8080
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: when-authorized
    info:
      enabled: true
logging:
  level:
    com.p4: DEBUG
    org.springframework.security: DEBUG
---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: ${DB_URL}
    driver-class-name: org.postgresql.Driver
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: validate
    open-in-view: false
  cache:
    type: redis
    redis:
      time-to-live: 60000
  redis:
    url: ${REDIS_URL}
  flyway:
    enabled: true
    locations: classpath:db/migration

### Health Endpoints
Create basic health and info endpoints by adding this controller:
```java
// src/main/java/com/p4/backend/common/HealthController.java
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
```

## Frontend Setup (Angular)

### Prerequisites
- Node.js and npm (installed earlier)
- Angular CLI (installed earlier)

### Initial Project Setup
1. Navigate to the monorepo root directory and create frontend directory:
```bash
cd .. # Go back to root if you're in backend
mkdir frontend && cd frontend
```

2. Create a new Nx workspace with Angular preset:
```bash
npx create-nx-workspace@latest p4-frontend --preset=angular-standalone --appName=landing --style=scss --no-nx-cloud
```

3. Navigate to the workspace directory:
```bash
cd p4-frontend
```

4. Generate additional libraries:
```bash
ng g @nx/angular:lib ui
ng g @nx/angular:lib i18n
ng g @nx/angular:lib shared
```

5. Install required dependencies:
```bash
npm install @angular/cdk @angular/material @angular/flex-layout
npm install ng-zorro-antd
npm install @ngx-translate/core @ngx-translate/http-loader
```

6. Set up internationalization files for Arabic/English support:
```bash
# Create translation files directory
mkdir -p src/assets/i18n

# Create English translation file
cat > src/assets/i18n/en.json << 'EOF'
{
  "WELCOME_MESSAGE": "Welcome to P4 B2B Marketplace",
  "NAVIGATION": {
    "HOME": "Home",
    "CATALOG": "Catalog",
    "RFQ": "RFQ",
    "ORDERS": "Orders",
    "ACCOUNT": "Account"
  },
  "BUTTONS": {
    "LOGIN": "Login",
    "SIGNUP": "Sign Up",
    "SEARCH": "Search"
  },
  "CATALOG": {
    "TITLE": "Product Catalog",
    "SEARCH_PLACEHOLDER": "Search products...",
    "NO_PRODUCTS": "No products found."
  }
}
EOF

# Create Arabic translation file
cat > src/assets/i18n/ar.json << 'EOF'
{
  "WELCOME_MESSAGE": "مرحبا بكم في سوق بيزنيس لبيزنيس",
  "NAVIGATION": {
    "HOME": "الرئيسية",
    "CATALOG": "المنتجات",
    "RFQ": "طلب عروض الأسعار",
    "ORDERS": "الطلبات",
    "ACCOUNT": "الحساب"
  },
  "BUTTONS": {
    "LOGIN": "تسجيل الدخول",
    "SIGNUP": "إنشاء حساب",
    "SEARCH": "بحث"
  },
  "CATALOG": {
    "TITLE": "كتالوج المنتجات",
    "SEARCH_PLACEHOLDER": "ابحث عن المنتجات...",
    "NO_PRODUCTS": "لم يتم العثور على منتجات."
  }
}
EOF
```

7. Create a basic catalog component to test integration:
```bash
# Generate catalog component
ng generate component catalog
```

Then update the generated catalog component files:

```bash
# Update src/app/catalog/catalog.component.ts
cat > src/app/catalog/catalog.component.ts << 'EOF'
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  vendorId: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule
  ],
  template: `
    <div class="catalog-container">
      <div class="search-section">
        <nz-input-group [nzSuffix]="suffixIcon" size="large">
          <input 
            type="text" 
            nz-input 
            [placeholder]="'CATALOG.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange()"
          />
        </nz-input-group>
        <ng-template #suffixIcon>
          <span nz-icon nzType="search"></span>
        </ng-template>
      </div>

      <div class="products-grid">
        <div nz-row [nzGutter]="[16, 16]">
          <div nz-col nzSpan="8" *ngFor="let product of filteredProducts">
            <nz-card 
              [nzTitle]="product.name" 
              [nzExtra]="extraTemplate"
              class="product-card">
              <p>{{ product.description }}</p>
              <p class="price">${{ product.price }}</p>
              <button nz-button nzType="primary">View Details</button>
            </nz-card>
          </div>
        </div>
      </div>

      <div class="no-products" *ngIf="filteredProducts.length === 0">
        {{ 'CATALOG.NO_PRODUCTS' | translate }}
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: 20px;
    }
    
    .search-section {
      margin-bottom: 30px;
    }
    
    .products-grid {
      margin-top: 20px;
    }
    
    .product-card {
      height: 200px;
    }
    
    .price {
      font-size: 18px;
      font-weight: bold;
      color: #1890ff;
      margin: 10px 0;
    }
    
    .no-products {
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #8c8c8c;
    }
  `]
})
export class CatalogComponent implements OnInit {
  searchTerm: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Initialize with sample data
    this.products = [
      { id: '1', name: 'Sample Product 1', description: 'This is a sample product', price: 99.99, vendorId: 'vendor-1' },
      { id: '2', name: 'Sample Product 2', description: 'Another sample product', price: 149.99, vendorId: 'vendor-2' },
      { id: '3', name: 'Sample Product 3', description: 'Yet another sample product', price: 199.99, vendorId: 'vendor-1' }
    ];
    this.filteredProducts = [...this.products];
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
EOF

# Update app.component.ts to add the catalog route
# First, create a basic routing setup
ng generate component home

# Create app.routes.ts
cat > src/app/app.routes.ts << 'EOF'
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '**', redirectTo: '' }
];
EOF

# Update app.config.ts to include routing
cat > src/app/app.config.ts << 'EOF'
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};
EOF

# Update src/app/app.component.ts to include router outlet
cat > src/app/app.component.ts << 'EOF'
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule
  ],
  template: `
    <nz-layout class="app-layout">
      <nz-header>
        <div class="logo">P4 B2B Marketplace</div>
        <ul nz-menu nzTheme="dark" nzMode="horizontal" class="nav-menu">
          <li nz-menu-item [nzSelected]="true">
            <a routerLink="/">{{ 'NAVIGATION.HOME' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a routerLink="/catalog">{{ 'NAVIGATION.CATALOG' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a>{{ 'NAVIGATION.RFQ' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a>{{ 'NAVIGATION.ORDERS' | translate }}</a>
          </li>
          <li nz-menu-item style="float: right;">
            <button nz-button nzType="primary">{{ 'BUTTONS.LOGIN' | translate }}</button>
          </li>
        </ul>
      </nz-header>
      <nz-layout>
        <nz-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
    }
    
    .logo {
      float: left;
      color: white;
      font-size: 18px;
      line-height: 64px;
      padding: 0 20px;
      font-weight: bold;
    }
    
    .nav-menu {
      float: left;
    }
    
    .content {
      padding: 24px;
      min-height: 280px;
    }
    
    nz-header {
      padding: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang || 'en');
  }
}
EOF
```

6. Add internationalization support by updating `app/app.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <h1>{{ 'WELCOME_MESSAGE' | translate }}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang || 'en');
  }
}
```

7. Add Material and NG-Zorro themes to `styles.scss`:
```scss
@import '@angular/material/prebuilt-themes/indigo-pink.css';
@import 'ng-zorro-antd/ng-zorro-antd.min.css';

html, body { 
  height: 100%; 
  margin: 0;
  padding: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}

// RTL support for Arabic
[dir='rtl'] {
  direction: rtl;
  text-align: right;
}
```

## Database & Storage Setup

### Neon PostgreSQL Setup
1. Log into your Neon account
2. Create a new project (e.g., "p4-prod")
3. Note the connection details (will be in the format: postgres://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname)
4. Create a production branch if needed

### Upstash Redis Setup
1. Log into your Upstash account
2. Create a new Redis database
3. Select the region closest to your users
4. Note the connection URL (rediss://host:port)

### Backblaze B2 Setup
1. Go to [backblaze.com](https://www.backblaze.com/) and sign up for a free account
2. Create a B2 Cloud Storage bucket (e.g., "p4-prod-assets")
3. Create an application key with read/write access to the bucket
4. Note your Account ID, Application Key ID, and Application Key

### Obtaining Connection Details
For use in your deployment environment, collect:
- **Neon**: Database URL (DB_URL)
- **Upstash**: Redis URL (REDIS_URL)
- **B2**: Account ID, Application Key ID, Application Key, and Bucket Name

## Deployment & CI/CD Setup

### Cloudflare Pages Setup
1. In your Cloudflare dashboard, go to Pages
2. Click "Create a project"
3. Connect to your GitHub account and select the `p4-monorepo` repository
4. Set build settings:
   - Build command: `cd frontend/p4-frontend && npm ci && nx build landing --prod`
   - Build output directory: `frontend/p4-frontend/dist/landing`
   - Root directory: `p4-monorepo`
5. Set environment variables:
   - `API_BASE_URL`: `https://your-backend-app.azurewebsites.net` (for Azure) or `https://your-backend-service.koyeb.app` (for Koyeb)
   - `ENV_NAME`: `prod` (or `stg` for staging)
   - `FLAG_SOURCE`: `/feature-flags.json`

### Azure Setup (Primary Cloud Provider)
1. In your Azure portal, navigate to "App Services"
2. Create a new resource and select "App Service"
3. Configure your app service with:
   - Subscription: Your selected Azure subscription
   - Resource Group: Select or create a new one
   - Name: A globally unique name for your app
   - Publish: Code
   - Runtime stack: JAVA 21
   - Java version: 21
   - Region: Choose a region close to your users
4. Review + create the resource and wait for deployment
5. Once created, go to your App Service and navigate to "Deployment Center"
6. Configure your CI/CD by connecting to your GitHub repository
7. Set up application settings in "Configuration" > "Application Settings":
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DB_URL`: `your_neon_database_url`
   - `DB_USERNAME`: `neon_username`
   - `DB_PASSWORD`: `neon_password`
   - `REDIS_URL`: `your_upstash_redis_url`
   - `B2_ACCOUNT_ID`: `your_b2_account_id`
   - `B2_APPLICATION_KEY_ID`: `your_b2_application_key_id`
   - `B2_APPLICATION_KEY`: `your_b2_application_key`
   - `B2_BUCKET`: `your_b2_bucket`
8. To deploy manually, you can package your application as a JAR file and upload it:
   ```bash
   cd backend
   ./mvnw clean package -DskipTests
   # Then deploy using Azure CLI or the portal
   ```

### CI/CD Workflows
Create the following GitHub Actions workflows:

#### Monorepo Workflow (`.github/workflows/monorepo.yml`)
```yaml
name: Monorepo CI/CD

on:
  push:
    branches: [ main, release/* ]
  pull_request:
    branches: [ main ]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 21
      uses: actions/setup-java@v3
      with:
        java-version: '21'
        distribution: 'temurin'
        
    - name: Build with Maven
      run: cd backend && ./mvnw clean test
      
    - name: Run integration tests
      run: cd backend && ./mvnw verify

  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend/p4-frontend
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20.x'
        
    - name: Install dependencies
      run: npm ci
      working-directory: ./frontend/p4-frontend
      
    - name: Run linting
      run: npm run lint
      working-directory: ./frontend/p4-frontend
      
    - name: Run tests
      run: npm run test:ci
      working-directory: ./frontend/p4-frontend
      
    - name: Build
      run: nx build landing
      working-directory: ./frontend/p4-frontend

  deploy:
    runs-on: ubuntu-latest
    needs: [backend-test, frontend-test]
    if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/heads/release/'))
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to Azure
      run: |
        # Deploy to Azure App Service
        # This requires setting up Azure credentials and configuring the deployment
        # Azure App Service approach supports direct JAR deployment
        # Build and deploy the backend application
        cd backend
        ./mvnw clean package -DskipTests
```

## Sprint 6: Hardening & Open Beta

### Sprint Overview
**Objective:** Perf, a11y/RTL polish, security review, widen access.
- Performance optimization and hardening
- Accessibility and RTL improvements
- Security review and enhancements
- Open beta preparation and rollout

### Sprint 6 Tasks

#### P4-S6-T001 — Search tuning; cache headers; DB indexes review
- [ ] Review and optimize PostgreSQL full-text search queries
- [ ] Fine-tune search ranking algorithms for better relevance
- [ ] Implement search caching to reduce database load
- [ ] Add faceted filtering to enhance search capabilities
- [ ] Optimize search response times to meet performance budgets (p95 < 500 ms)

#### P4-S6-T002 — A11y audit (contrast, focus, keyboard, AR language tags)
- [ ] Conduct comprehensive accessibility audit using tools like axe-core
- [ ] Check for sufficient color contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text)
- [ ] Ensure proper focus management and visible focus indicators
- [ ] Verify keyboard navigation works for all interactive elements
- [ ] Add proper ARIA attributes and roles where needed
- [ ] Test screen reader compatibility
- [ ] Ensure all form elements have proper labels

#### P4-S6-T003 — Security sweep (headers, rate-limits, secrets rotation)
- [ ] Implement security headers (HSTS, CSP, etc.)
- [ ] Implement rate limiting for API endpoints
- [ ] Plan secrets rotation procedures
- [ ] Perform security scanning of dependencies
- [ ] Review authentication and authorization implementations

#### P4-S6-T004 — Error budget dashboards + alerts; SLO gates for deploy
- [ ] Set up monitoring for error rates and establish error budget thresholds
- [ ] Create dashboards to visualize error budget consumption
- [ ] Configure alerts for when error budget consumption exceeds defined thresholds
- [ ] Implement SLO gates for deployments
- [ ] Define SLOs for key metrics (availability, latency, error rates)

#### P4-S6-T005 — Public API docs (OpenAPI) + client SDK publish
- [ ] Enhance OpenAPI documentation with detailed descriptions and examples
- [ ] Generate and publish client SDKs for major platforms
- [ ] Set up public documentation portal with API reference
- [ ] Create API usage guides and tutorials for developers

#### P4-S6-T006 — Lift flags to beta cohort; vendor onboarding outside pilot
- [ ] Review all current feature flags to determine which ones are ready for beta release
- [ ] Create a beta cohort user group with specific access permissions
- [ ] Gradually enable feature flags for the beta cohort following a rollout schedule
- [ ] Modify vendor onboarding workflow to remove pilot-specific restrictions
- [ ] Implement proper validation and approval processes for public vendor signups

#### P4-S6-T007 — Run restore drill (Neon), object restore from R2
- [ ] Perform database restore drills to ensure backup integrity
- [ ] Test object storage (R2) restore procedures
- [ ] Document the restore procedures in the runbook
- [ ] Validate that restores can be performed within acceptable RTO/RPO targets

#### P4-S6-T008 — Frontend complete redesign and rebuild with elegant landing page and catchy theme
- [ ] Implement modern UI/UX design principles with focus on user experience
- [ ] Create an elegant, professional landing page with compelling value proposition
- [ ] Develop a catchy and consistent theme throughout the application
- [ ] Ensure consistent design language across all pages and components
- [ ] Create reusable UI components library
- [ ] Implement smooth animations and transitions

#### P4-S6-T009 — Implement advanced search features with faceted filtering
- [ ] Add faceted filtering to search functionality
- [ ] Implement advanced search options (price range, category, vendor, etc.)
- [ ] Optimize search performance with proper indexing
- [ ] Add search result sorting options

#### P4-S6-T010 — Performance optimization and bundle size reduction
- [ ] Analyze frontend bundle size and identify optimization opportunities
- [ ] Implement lazy loading for modules that are not immediately needed
- [ ] Optimize images and assets for faster loading
- [ ] Implement code splitting strategies
- [ ] Optimize backend API response times and reduce payload sizes

#### P4-S6-T011 — Integration testing for all major user flows
- [ ] Create comprehensive integration tests for all major user flows
- [ ] Test cross-module interactions
- [ ] Verify API endpoints work correctly with different input parameters
- [ ] Test database operations and data consistency

#### P4-S6-T012 — Comprehensive end-to-end testing automation
- [ ] Set up end-to-end testing automation using Playwright
- [ ] Create test scenarios that cover both English and Arabic interfaces
- [ ] Implement automated accessibility tests as part of the CI pipeline
- [ ] Run end-to-end tests in staging environment to simulate real user behavior

### Next Steps

After completing Sprint 6:

1. **Monitor Open Beta**:
   - Collect feedback from beta users
   - Monitor system performance and error rates
   - Address any issues discovered during the beta

2. **Prepare for Production**:
   - Complete any remaining hardening tasks
   - Finalize security measures
   - Ensure all monitoring and alerting are in place

3. **Plan for Sprints 7+**:
   - Analyze feedback from the open beta
   - Prioritize features and improvements for subsequent sprints