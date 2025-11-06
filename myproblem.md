D:\Projects\b2b-marketplace\frontend>pnpm install && pnpm build
Lockfile is up to date, resolution step is skipped
Already up to date

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: esbuild.                                                          │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 1.5s using pnpm v10.15.1

> frontend@0.1.0 build D:\Projects\b2b-marketplace\frontend
> next build

   ▲ Next.js 14.1.0

   Creating an optimized production build ...
 ⚠ Compiled with warnings

./node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js
Module not found: ESM packages (supports-color) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals

Import trace for requested module:
./node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js
./node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js
./node_modules/.pnpm/follow-redirects@1.15.11/node_modules/follow-redirects/debug.js
./node_modules/.pnpm/follow-redirects@1.15.11/node_modules/follow-redirects/index.js
./node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/adapters/http.js
./node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/adapters/adapters.js
./node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js
./node_modules/.pnpm/axios@1.13.2/node_modules/axios/index.js
./libs/api/client.ts
./libs/api/generated.ts
./app/[lng]/layout.tsx

 ✓ Linting and checking validity of types    

> Build error occurred
Error: Page "/api/orders/[orderId]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
    at D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\build\index.js:1102:59
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Span.traceAsyncFn (D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\trace\trace.js:151:20)
    at async Promise.all (index 25)
    at async D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\build\index.js:981:17
    at async Span.traceAsyncFn (D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\trace\trace.js:151:20)
    at async D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\build\index.js:918:124
    at async Span.traceAsyncFn (D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\trace\trace.js:151:20)
    at async build (D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\build\index.js:374:9)
    at async main (D:\Projects\b2b-marketplace\frontend\node_modules\.pnpm\next@14.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0\node_modules\next\dist\bin\next:155:5)
   Collecting page data  . ELIFECYCLE  Command failed with exit code 1.

D:\Projects\b2b-marketplace\frontend>