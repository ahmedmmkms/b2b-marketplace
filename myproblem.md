## Summary

Next.js was returning 404s for every `/_next/static/...` request while the actual bundles existed on disk. The middleware config (`frontend/middleware.ts`) degraded to the default `/:path*` matcher because the exported `config.matcher` used a conditional expression that Next cannot statically analyze. With the default matcher in place, the middleware also ran for internal asset requests and rewrote them according to the locale logic, which surfaced as missing static chunks.

## Fix

- Replace the dynamic matcher logic with the literal expression recommended by Next so `_next`, `api`, `_vercel`, and direct file hits are excluded from middleware execution.
- Verified with `pnpm run build` (frontend) that the warning is gone and the generated `middleware-manifest.json` now contains the negative-lookahead regex.

## Log excerpt (pre-fix)

 GET /_next/static/chunks/webpack.js?v=1762526808301 404 in 35198ms
 GET /_next/static/chunks/main-app.js?v=1762526808301 404 in 211ms
 GET /_next/static/chunks/app/%5Blng%5D/page.js 404 in 197ms
 GET /_next/static/chunks/app-pages-internals.js 404 in 191ms
 GET /_next/static/chunks/app/layout.js 404 in 270ms
 ○ Compiling /[lng]/catalog ...
 ✓ Compiled /[lng]/catalog in 3.9s (1351 modules)
 GET /catalog 200 in 5844ms
 GET /_next/static/media/7d9a813ffbcaadee-s.p.woff2 404 in 286ms
 GET /_next/static/chunks/webpack.js?v=1762526903539 404 in 282ms
 GET /_next/static/chunks/main-app.js?v=1762526903539 404 in 275ms
 GET /_next/static/css/app/layout.css?v=1762526903539 404 in 268ms
 GET /_next/static/chunks/app/%5Blng%5D/catalog/page.js 404 in 262ms
 GET /_next/static/chunks/app-pages-internals.js 404 in 261ms
 GET /_next/static/chunks/app/layout.js 404 in 55ms
 GET /_next/static/chunks/main-app.js?v=1762526808301 404 in 262ms
 GET /_next/static/media/7d9a813ffbcaadee-s.p.woff2 404 in 243ms
 GET /_next/static/chunks/webpack.js?v=1762526808301 404 in 253ms
 GET /_next/static/css/app/layout.css?v=1762526808301 404 in 239ms
 GET /_next/static/chunks/app/%5Blng%5D/page.js 404 in 232ms
 GET /_next/static/chunks/app-pages-internals.js 404 in 230ms
 GET /_next/static/chunks/app/layout.js 404 in 54ms
