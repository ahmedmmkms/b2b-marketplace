# Toolchain Facts
- Node 20.19.5 (pnpm workspace root)
- pnpm 10.18.2
- Next.js 14.2.5 (build ran with 14.2.33)

# Current Error Fingerprint
- code: MISSING_MESSAGE
- gist:
  - The locale parameter in getRequestConfig is deprecated, please switch to wait requestLocale.
  - A locale is expected to be returned from getRequestConfig, but none was returned.
  - l [Error]: MISSING_MESSAGE: Catalog (ar)
  - at .next/server/chunks/399.js:1:61731
  - at t.createBaseTranslator (.next/server/chunks/399.js:1:61781)
  - at .next/server/chunks/399.js:1:59818
  - at t.eX (.next/server/chunks/399.js:1:59870)
  - at .next/server/chunks/399.js:1:44671
  - at processTicksAndRejections (node:internal/process/task_queues:95:5)
  - at async l (.next/server/app/[lng]/product/[id]/page.js:1:8171)
- top: .next/server/chunks/399.js:1:61731

# Decisions (<=13)
- Initialized RCL
- Build failed: missing next-intl config detection
- Applied next-intl plugin to CommonJS config
- Re-run build revealed missing Catalog(ar) message blocking export

# Open TODOs (<=5)
- Handle missing translations to unblock build (Catalog ar)
- Investigate static export bailouts from dynamic features
