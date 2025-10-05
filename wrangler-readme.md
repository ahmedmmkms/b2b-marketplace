# Cloudflare Deployment Configuration

This project includes a `wrangler.toml` file to help configure Cloudflare deployment.

## Setup for Cloudflare Pages

To deploy this application to Cloudflare Pages:

1. In your Cloudflare Pages project settings:
   - **Build Command**: `cd frontend/p4-frontend && npm ci && npm run build`
   - **Build Output Directory**: `frontend/p4-frontend/dist/landing`
   - **Root Directory**: `.` (project root)

2. Update the `wrangler.toml` file with your specific account ID:
   ```
   [env.production]
   account_id = "YOUR_ACCOUNT_ID"
   ```

## Notes

- The `@ctrl/tinycolor` dependency issue should be resolved with the `nodejs_compat` compatibility flag
- The project uses Angular 18+ with the new application builder
- The build output is located at `frontend/p4-frontend/dist/landing`

## Troubleshooting

If you encounter build issues on Cloudflare:
- Make sure your account_id is correctly set in wrangler.toml
- Verify that your build command matches the one in this documentation
- Check that the build output directory is correctly specified