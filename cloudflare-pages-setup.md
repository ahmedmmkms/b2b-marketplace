# Cloudflare Pages Setup

This document explains how to properly configure Cloudflare Pages for this project.

## Prerequisites

This project uses an Angular Nx monorepo located in the `frontend2` directory.

## Cloudflare Pages Configuration

When setting up your Cloudflare Pages project, use the following settings:

### Build Configuration

- **Build Command**: `cd frontend2 && npm ci && npm run build`
- **Build Output Directory**: `frontend2/dist/frontend2`
- **Root Directory**: `.` (project root)

### Environment Variables

No special environment variables are needed for the build process.

## Notes

- The `wrangler.toml` file in the repository contains minimal configuration required for Pages.
- The actual build command and settings should be configured in the Cloudflare dashboard as specified above.
- The frontend build output will be in the `frontend2/dist/frontend2` directory after the build process.