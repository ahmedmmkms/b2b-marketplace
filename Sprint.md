# Sprint 0 Setup Guide: Getting Started with P4 B2B Marketplace

This guide will walk you through setting up all the required services, accounts, and local development environment for the P4 B2B Marketplace project.

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

### 2. Cloudflare Account (Pages + R2)
1. Go to [cloudflare.com](https://www.cloudflare.com/)
2. Sign up for a free account
3. Verify your email and set up your account
4. For Pages: Create a new project connected to your GitHub repository
5. For R2: Navigate to R2 in your dashboard and create a new bucket

### 3. Koyeb Account
1. Visit [koyeb.com](https://www.koyeb.com/)
2. Sign up for a free account (using GitHub for easy integration)
3. Link your GitHub account to enable repository access

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
   - [OpenJDK](https://openjdk.org/projects/jdk/21/) (official)
   - [Eclipse Temurin](https://adoptium.net/temurin/releases/?version=21) (recommended)
   - [Oracle JDK](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) (commercial)

2. Verify installation:
```bash
java -version
```
Should show version 21.x.x

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

### Creating GitHub Repositories
1. In your GitHub account, create two new public repositories:
   - `p4-frontend`
   - `p4-backend`

2. Add branch protection rules:
   - Protect `main` branch
   - Protect `release/*` branches
   - Require pull requests and status checks

### Cloning Repositories
```bash
# Create a workspace directory
mkdir p4-workspace && cd p4-workspace

# Clone repositories
git clone https://github.com/YOUR_USERNAME/p4-frontend.git
git clone https://github.com/YOUR_USERNAME/p4-backend.git
```

## Backend Setup (Spring Boot)

### Prerequisites
- Java 21 (installed earlier)
- Maven or Gradle (will be set up automatically in project)

### Initial Project Setup
1. Navigate to the backend directory:
```bash
cd p4-backend
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
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
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
<!-- Database driver dependencies will be added when connecting to services -->
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
1. Navigate to the frontend directory:
```bash
cd p4-frontend
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

### Cloudflare R2 Setup
1. Log into your Cloudflare dashboard
2. Go to R2 and create a new bucket (e.g., "p4-prod-assets")
3. Create an R2 API token with appropriate permissions
4. Note your Account ID, Access Key ID, and Secret Access Key

### Obtaining Connection Details
For use in your deployment environment, collect:
- **Neon**: Database URL (DB_URL)
- **Upstash**: Redis URL (REDIS_URL)
- **R2**: Account ID, Access Key ID, Secret Access Key, and Bucket Name

## Deployment & CI/CD Setup

### Cloudflare Pages Setup
1. In your Cloudflare dashboard, go to Pages
2. Click "Create a project"
3. Connect to your GitHub account and select the `p4-frontend` repository
4. Set build settings:
   - Framework preset: Angular
   - Build command: `nx build landing --prod`
   - Build output directory: `dist/apps/landing/browser`
5. Set environment variables:
   - `API_BASE_URL`: URL of your backend service
   - `ENV_NAME`: stg or prod
   - `FLAG_SOURCE`: Path to feature flags

### Koyeb Setup
1. In your Koyeb dashboard, click "Create App"
2. Connect to your GitHub account and select the `p4-backend` repository
3. Configure deployment:
   - Runtime: Buildpack (auto-detected)
   - Port: 8080
4. Set environment variables:
   - `SPRING_PROFILES_ACTIVE`: prod
   - `DB_URL`: Your Neon database URL
   - `DB_USERNAME`: Neon username
   - `DB_PASSWORD`: Neon password
   - `REDIS_URL`: Your Upstash Redis URL
   - `R2_ACCOUNT_ID`: Cloudflare Account ID
   - `R2_ACCESS_KEY_ID`: R2 Access Key ID
   - `R2_SECRET_ACCESS_KEY`: R2 Secret Access Key
   - `R2_BUCKET`: R2 Bucket name

### CI/CD Workflows
Create the following GitHub Actions workflows:

#### Backend Workflow (`.github/workflows/backend.yml`)
```yaml
name: Backend CI/CD

on:
  push:
    branches: [ main, release/* ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 21
      uses: actions/setup-java@v3
      with:
        java-version: '21'
        distribution: 'temurin'
        
    - name: Build with Maven
      run: ./mvnw clean test
      
    - name: Run integration tests
      run: ./mvnw verify

  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/heads/release/'))
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to Koyeb
      run: |
        # Add deployment commands here
        # This would typically use Koyeb CLI or API
```

#### Frontend Workflow (`.github/workflows/frontend.yml`)
```yaml
name: Frontend CI/CD

on:
  push:
    branches: [ main, release/* ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20.x'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Run tests
      run: npm run test:ci
      
    - name: Build
      run: nx build landing

  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/heads/release/'))
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20.x'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: nx build landing --prod
```

## Next Steps

After completing this setup:

1. **Sprint 0 Initial Development**:
   - Implement basic health/ready endpoints in the backend
   - Create a simple landing page in the frontend
   - Set up your CI/CD pipelines
   - Deploy to staging environments

2. **Verify Setup**:
   - Confirm your backend health endpoint is accessible
   - Ensure frontend builds and deploys successfully
   - Test that all service connections work properly

3. **Begin Sprint 0 Tasks**:
   - Follow the detailed task list in your P4 Dossier
   - Start with creating domain skeletons
   - Implement basic feature flag functionality