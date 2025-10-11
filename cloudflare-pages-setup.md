# Cloudflare Pages Setup

This document explains how to properly configure Cloudflare Pages for this project.

## Prerequisites

This project uses an Angular Nx monorepo located in the `frontend2` directory.

## Cloudflare Pages Configuration

When setting up your Cloudflare Pages project, use the following settings:

### Build Configuration

- **Root Directory**: `frontend2/.`
- **Build Command**: `npm run build -- --configuration=production`
- **Build Output Directory**: `dist/frontend2`

### Environment Variables

No special environment variables are needed for the build process.

## Notes

- The `wrangler.toml` file in the repository contains minimal configuration required for Pages.
- The actual build command and settings should be configured in the Cloudflare dashboard as specified above.
- The frontend build output will be in the `dist/frontend2` directory relative to the root directory (which is `frontend2/`).
- The final output path from the repository root perspective will be `frontend2/dist/frontend2`.