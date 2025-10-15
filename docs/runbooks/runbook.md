# P4 B2B Marketplace Runbook

## Table of Contents
1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Incident Response](#incident-response)
4. [Rollback Procedures](#rollback-procedures)
5. [Secret Rotation](#secret-rotation)
6. [Pause Deploys](#pause-deploys)
7. [Monitoring and Alerting](#monitoring-and-alerting)
8. [Emergency Contacts](#emergency-contacts)

## Introduction

This runbook provides operational procedures for the P4 B2B Marketplace application. It is intended for use by on-call engineers and technical operations staff.

### Application Overview
- **Frontend**: Angular 18 application hosted on Cloudflare Pages
- **Backend**: Spring Boot 3 application hosted on Azure App Service
- **Database**: PostgreSQL hosted on Neon
- **Cache**: Redis hosted on Upstash
- **Storage**: Object storage on Backblaze B2
- **CI/CD**: GitHub Actions

### Status Page
- [Status Page URL](https://your-project.status-page-url.com)

## System Architecture

The application consists of the following components:

1. **Frontend Layer**:
   - Angular 18 SPA
   - Deployed to Cloudflare Pages
   - Served via CDN with global edge locations

2. **Backend Services**:
   - Spring Boot 3 REST API
   - Deployed to Azure App Service
   - Java 21 runtime

3. **Data Layer**:
   - Primary database: Neon Postgres
   - Cache layer: Upstash Redis
   - Object storage: Backblaze B2

4. **CI/CD**:
   - Source control: GitHub
   - Pipelines: GitHub Actions
   - Deployment: Automated to staging and production

## Incident Response

### Severity Levels

- **SEV-1**: Critical incidents causing service downtime or data loss
  - Response time: < 15 minutes
  - Notification: All on-call engineers + manager

- **SEV-2**: High-priority incidents affecting user experience
  - Response time: < 1 hour
  - Notification: Primary on-call engineer

- **SEV-3**: Low-priority incidents with minimal impact
  - Response time: < 4 hours
  - Notification: Primary on-call engineer during business hours

### Incident Declaration Process

1. When an incident is detected, create an incident report in the tracking system
2. Assign a severity level based on the impact
3. Notify the relevant team members according to severity
4. Create a dedicated communication channel for the incident
5. Document all actions taken during the incident

## Rollback Procedures

### Frontend Rollback (Cloudflare Pages)

1. Log in to Cloudflare dashboard
2. Navigate to the Pages project for the frontend
3. Go to "Deployments" tab
4. Identify the last known good deployment
5. Click "Deploy this version" to revert to that version
6. Verify the rollback by checking the frontend application

### Backend Rollback (Azure App Service)

1. Log in to Azure Portal
2. Navigate to the App Service for the backend
3. Go to "Deployment Center"
4. Go to "Deployments" tab
5. Select the last known good deployment
6. Click "Redeploy" to restore that version
7. Verify the rollback by checking the health endpoints

### Database Rollback (Neon Postgres)

1. Log in to Neon Console
2. Navigate to the project and branch that needs to be rolled back
3. Identify the point-in-time to rollback to
4. Create a new branch from that point in time
5. Test the application with the new branch to verify functionality
6. Update the application configuration to use the new branch if successful
7. Monitor the application after the change

### Redis Cache Reset (Upstash)

1. Log in to Upstash Console
2. Navigate to the Redis instance
3. If needed to clear cache: use the "Console" to run `FLUSHALL` command
   (Note: This will clear all cache and may cause a performance impact)
4. Monitor application performance after cache clear

## Secret Rotation

### Azure App Service Secrets

1. Go to Azure Portal
2. Navigate to the App Service
3. Go to "Configuration" under "Settings"
4. Update the "Application Settings" or "Connection Strings" as needed
5. Restart the App Service for changes to take effect
6. Verify the application is running correctly

### Database Credentials (Neon)

1. Log in to Neon Console
2. Navigate to the project and branch
3. Go to "Settings" > "Connection Details" > "Users"
4. Create a new user with the same permissions or modify existing user password
5. Update the connection string in Azure App Service configuration
6. Restart the backend service to pick up the new credentials
7. Verify the application can connect to the database

### Redis Credentials (Upstash)

1. Log in to Upstash Console
2. Navigate to the Redis instance
3. Go to "Settings" > "Security"
4. Reset the password/token for the instance
5. Update the connection string in Azure App Service configuration
6. Restart the backend service to pick up the new credentials
7. Verify the application can connect to Redis

### Cloudflare API Tokens

1. Log in to Cloudflare Dashboard
2. Go to "My Profile" > "API Tokens"
3. Create a new token with the necessary permissions
4. Update any systems that use this token
5. Revoke the old token after confirming the new one works

### B2 Credentials

1. Log in to Backblaze B2 Console
2. Go to "Account" > "App Keys"
3. Create a new application key with the necessary permissions
4. Update the credentials in Azure App Service configuration
5. Verify the application can access B2 storage with the new credentials
6. Revoke the old application key after confirming the new one works

## Pause Deploys

### Pausing Frontend Deploys

1. Go to Cloudflare Dashboard
2. Navigate to the Pages project
3. Go to "Settings" > "Build & deployments"
4. Toggle "Production branch" protection to prevent auto-deployments
5. Alternatively, protect the "main" branch in the GitHub repository

### Pausing Backend Deploys

1. Go to Azure Portal
2. Navigate to the App Service
3. Go to "Deployment Center"
4. Temporarily disconnect the GitHub connection
5. Alternatively, disable the GitHub Actions workflow for deployment

### Pausing GitHub Actions

1. Go to the GitHub repository
2. Navigate to "Settings" > "Actions" > "General"
3. Select "Disable Actions" (temporarily)
4. Alternatively, disable specific workflows in the "Actions" tab

### Communication

When pausing deployments:
1. Notify all relevant team members
2. Update the team's status channel with the reason and expected duration
3. Document the reason in the team's deployment tracking system
4. Set a reminder to re-enable deployments after the required time

## Monitoring and Alerting

### Health Endpoints

- **Backend Health**: `https://your-backend.azurewebsites.net/actuator/health`
- **Backend Ready**: `https://your-backend.azurewebsites.net/actuator/ready`
- **Frontend Health**: `https://your-frontend.pages.dev`

### Key Metrics to Monitor

- Request latency and response times
- Error rates (4xx and 5xx responses)
- Database connection pool utilization
- Cache hit/miss ratios
- System resource utilization (CPU, memory)

### Alert Thresholds

- Response time > 2 seconds (warning), > 5 seconds (critical)
- Error rate > 1% (warning), > 5% (critical)
- Database connection pool > 80% utilization (warning)
- Cache miss ratio > 50% (warning)

## Emergency Contacts

### On-Call Engineer
- Name: [Name]
- Phone: [Phone number]
- Email: [Email address]

### Secondary Contact
- Name: [Name]
- Phone: [Phone number]
- Email: [Email address]

### Manager
- Name: [Name]
- Phone: [Phone number]
- Email: [Email address]

### Cloudflare Support
- URL: [https://community.cloudflare.com/](https://community.cloudflare.com/)
- Emergency contact: [Email or phone if available]

### Azure Support
- URL: [https://azure.microsoft.com/en-us/support/](https://azure.microsoft.com/en-us/support/)
- Emergency contact: [Email or phone if available]

### Neon Support
- URL: [https://neon.tech/docs/getting-started/support](https://neon.tech/docs/getting-started/support)
- Emergency contact: [Email or phone if available]

### Upstash Support
- URL: [https://docs.upstash.com/redis/miscellaneous/support](https://docs.upstash.com/redis/miscellaneous/support)
- Emergency contact: [Email or phone if available]

### B2 Support
- URL: [https://www.backblaze.com/company/contact](https://www.backblaze.com/company/contact)
- Emergency contact: [Email or phone if available]

---

### Document Version
- Version: 1.0
- Last Updated: October 2025
- Owner: P4 B2B Marketplace Team