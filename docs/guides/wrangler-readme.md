# Cloudflare Deployment Configuration

This project includes a `wrangler.toml` file to help configure Cloudflare deployment.

## Setup for Cloudflare Pages

To deploy this application to Cloudflare Pages:

1. In your Cloudflare Pages project settings:
   - **Build Command**: `cd frontend && pnpm install && pnpm build`
   - **Build Output Directory**: `frontend/out`
   - **Root Directory**: `.` (project root)
   - **Environment Variables**: Set NEXT_PUBLIC_BACKEND_URL and NEXT_PUBLIC_ENVIRONMENT

2. Update the `wrangler.toml` file with your specific account ID:
   ```
   [env.production]
   account_id = "YOUR_ACCOUNT_ID"
   ```

## Notes

- The build command ensures dependencies are installed before building the Next.js application
- The project uses Next.js 14 with App Router, TypeScript, and Tailwind CSS
- The build output is located at `frontend/out` based on the Next.js static export configuration

## Troubleshooting

If you encounter build issues on Cloudflare:
- Make sure the NODE_VERSION environment variable is set to `22`
- Verify that your build command matches the one in this documentation
- Check that the build output directory is correctly specified as `frontend/out`
- Ensure all required environment variables are set in the Cloudflare dashboard