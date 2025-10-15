# Cloudflare Pages Setup

This document explains how to properly configure Cloudflare Pages for this project.

## Prerequisites

This project uses a Next.js 14 application located in the `frontend` directory with App Router, TypeScript, and Tailwind CSS.

## Cloudflare Pages Configuration

When setting up your Cloudflare Pages project, use the following settings:

### Build Configuration

- **Root Directory**: `.` (project root)
- **Build Command**: `cd frontend && pnpm install && pnpm build`
- **Build Output Directory**: `frontend/out`

### Environment Variables

Required environment variables to be set in the Cloudflare Pages dashboard:

- `NEXT_PUBLIC_BACKEND_URL`: The URL of your backend API (e.g., https://your-backend.koyeb.app)
- `NEXT_PUBLIC_ENVIRONMENT`: Current environment (development, staging, production)
- `NODE_VERSION`: Set to `22` to match the project requirements

### Functions Configuration

- **Functions Directory**: Not used (Next.js handles all routing)

## Notes

- The build command ensures dependencies are installed before building the Next.js application
- The build output directory `frontend/out` corresponds to the Next.js static export configuration
- The build output directory is specified in the Cloudflare dashboard, NOT in any configuration files
- The actual build command and settings should be configured in the Cloudflare dashboard as specified above