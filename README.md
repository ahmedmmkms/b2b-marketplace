# B2B Marketplace Project

## Overview
This repository contains the code for the P4 GCC/MENA B2B Marketplace - a comprehensive B2B platform with multi-vendor support, RFQ flows, invoicing, and loyalty programs.

For complete project documentation, see [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

## Repository Structure
- `backend/` - Spring Boot application
- `frontend/` - Angular application  
- `docs/` - All documentation organized by topic
- `scripts/` - Utility and setup scripts
- `tests/` - Tests organized by module

## Quick Start
1. For backend development: navigate to `backend/` directory
2. For frontend development: navigate to `frontend/` directory
3. For documentation: browse the `docs/` directory

## Current Status
- Tasks 1.1-4.4 implemented (Infrastructure, Identity & Access Management)
- Tasks 5.1-14.3 pending (Catalog, RFQ, Orders, Payments, etc.)

## Architecture
Modular monolith with hexagonal architecture pattern, planned to split into microservices later.

## Technology Stack
- Backend: Java 21, Spring Boot 3
- Frontend: Angular 18, Nx workspace
- Database: PostgreSQL 16 (Neon)
- Cache: Redis
- Deployment: Cloudflare Pages (frontend), Koyeb (backend)