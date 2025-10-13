# Production Setup Guide

## Current Issue

The P4 Backend application currently has a circular dependency issue in the invoicing module:

- `InvoiceController` depends on `InvoiceService`
- `InvoiceService` depends on `InvoiceNotificationService`
- `InvoiceNotificationService` depends back on `InvoiceService`

This creates a circular dependency that prevents the application from starting, even when the `FEATURE_INVOICE_VAT` flag is set to `false`.

## Solution Required

To fully fix this issue, you need to refactor the invoicing module to break the circular dependency by:

1. Using lazy initialization or `@Lazy` annotation for one of the dependencies
2. Restructuring the classes to use a callback or event-based approach instead of direct dependency
3. Using setter injection instead of constructor injection for the circular dependency

## Temporary Workaround

For now, to run the application with invoicing features disabled, you would need to:

1. Either remove or comment out the invoicing module code temporarily
2. Or modify the invoicing classes to break the circular dependency

## Running with Current Setup

The `run-production.bat` script will continue to fail until the circular dependency is resolved in the source code. Once you've fixed the circular dependency issue in the invoicing module, you can use the `run-production.bat` script to run the application in production mode.