That error is from next-intl: the Next.js plugin can’t find your i18n config module. Fix it by adding the expected config file and wiring the plugin.

1) Install & check versions
npm i next-intl

2) Add the request-scoped config file the plugin looks for

Create src/i18n/request.ts (or i18n/request.ts at project root if you don’t use src/):

// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Supported locales
  const locales = ['en', 'ar'] as const;

  // Fallback if middleware didn’t set one
  const locale = locales.includes((requestLocale as any) ?? '') ? requestLocale : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});


The plugin looks for this module by default; if it can’t resolve it, you get “Couldn’t find next-intl config file.” 
next-intl.dev
+1

3) Wire the Next.js plugin to that file

Edit next.config.(js|mjs|ts):

// next.config.mjs (ESM)
import createNextIntlPlugin from 'next-intl/plugin';

// If your file is at a non-default path, pass it: createNextIntlPlugin('./src/i18n/request.ts')
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // your config…
};

export default withNextIntl(nextConfig);


The plugin links your i18n/request.ts to Next.js. Without it (or if the file path is wrong), you’ll see this error. 
Phrase
+1

4) (Recommended) Locale routing & middleware

Add src/i18n/routing.ts and middleware.ts so routes get a locale:

// src/i18n/routing.ts
export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en';

// middleware.ts at project root
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './src/i18n/routing';

export default createMiddleware({locales, defaultLocale});

// Run on all pages (adjust as needed)
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};


Without the middleware (or with a wrong matcher), you may hit related “unable to find locale” errors. 
next-intl.dev
+1

5) Put your messages

Create files like src/messages/en.json, src/messages/ar.json and use them with useTranslations() in components.

Common gotchas

Wrong file path/name: It must be exactly i18n/request.ts (under src/ or project root) with a default export from getRequestConfig. 
next-intl.dev

Plugin not applied: Ensure withNextIntl(nextConfig) wraps your Next config (ESM vs CJS matters). 
GitHub
+1

Turbopack dev: Some versions don’t resolve the config correctly with next dev --turbo—run without --turbo if you hit odd resolution issues. 
GitHub

Middleware matcher: A too-narrow or too-broad matcher can cause 404s or missing locales. Use a tested pattern as above. 

You’re hitting Next’s static prerender step while next-intl can’t see its config. Fix by adding the exact files/paths next-intl expects and wiring the plugin + middleware.

1) Create the request-scoped config file

next-intl looks for i18n/request.ts (either at the project root or under src/). Make sure it exists and has a default export from getRequestConfig.

/src
  /i18n
    request.ts
    routing.ts
  /messages
    en.json
    ar.json

// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Supported locales
  const locales = ['en', 'ar'] as const;
  const locale =
    (requestLocale && locales.includes(requestLocale as any))
      ? (requestLocale as typeof locales[number])
      : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});


Why this matters: the “Couldn’t find next-intl config file” error is thrown when this module can’t be resolved. 
next-intl.dev
+1

2) Add routing helpers and middleware
// src/i18n/routing.ts
export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en';

// middleware.ts (project root)
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './src/i18n/routing';

export default createMiddleware({locales, defaultLocale});

// Exclude Next internals & static assets
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
};


If the middleware doesn’t run (or is mismatched), you’ll see related locale/config errors during prerender. 
next-intl.dev

3) Wrap your Next config with the plugin

In next.config.mjs (ESM) or next.config.js (CJS):

// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

// If your config file is NOT at the default path, pass it:
// const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // ...your existing config
};

export default withNextIntl(nextConfig);


This connects the config file to the build. Wrong/missing plugin setup also triggers the same error. 
peturgeorgievv.com
+1

4) Make your [lng] segment statically known (since you’re prerendering/exporting)

Because you’re exporting /ar, /en, etc., ensure the locale param is generated:

// app/[lng]/layout.tsx (or app/[lng]/page.tsx)
export function generateStaticParams() {
  return [{lng: 'en'}, {lng: 'ar'}];
}


This avoids other prerender issues when using App Router + i18n. 
Next.js
+1

5) Put your message files
// src/messages/en.json
{ "hello": "Hello" }

// src/messages/ar.json
{ "hello": "مرحبا" }


Use them in components via useTranslations() as per docs. 
next-intl.dev

6) Clean & rebuild

After adding/moving these files, clear caches so the resolver picks them up:

rm -rf .next node_modules
pnpm i   # or npm i / yarn
pnpm build

Quick checklist (common causes)

The file is named exactly i18n/request.ts (and exported as default). 
next-intl.dev

The plugin wraps your Next config (ESM vs CJS path). 
peturgeorgievv.com

Middleware matcher isn’t excluding your pages (common source of i18n/runtime errors). 
next-intl.dev

If you’re using Turbopack and still see odd resolution issues, try without Turbopack or adjust its config (there are known reports). 
Stack Ove