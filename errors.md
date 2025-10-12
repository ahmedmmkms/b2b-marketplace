2025-10-11T20:27:00.467968Z	Cloning repository...
2025-10-11T20:27:01.109258Z	From https://github.com/ahmedmmkms/b2b-marketplace
2025-10-11T20:27:01.109685Z	 * branch            a732ae56ba20519ef10dc1f493feb2cde97fe8b6 -> FETCH_HEAD
2025-10-11T20:27:01.109798Z	
2025-10-11T20:27:01.158236Z	HEAD is now at a732ae5 Fix Cloudflare and Azure deployment issues
2025-10-11T20:27:01.158666Z	
2025-10-11T20:27:01.24396Z	
2025-10-11T20:27:01.244421Z	Using v2 root directory strategy
2025-10-11T20:27:01.267234Z	Success: Finished cloning repository files
2025-10-11T20:27:03.090946Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-10-11T20:27:03.091954Z	
2025-10-11T20:27:04.207244Z	No wrangler.toml file found. Continuing.
2025-10-11T20:27:04.286358Z	Detected the following tools from environment: nodejs@22.16.0, npm@10.9.2
2025-10-11T20:27:04.287041Z	Installing project dependencies: npm clean-install --progress=false
2025-10-11T20:27:16.949353Z	
2025-10-11T20:27:16.949666Z	added 21 packages, and audited 22 packages in 12s
2025-10-11T20:27:16.949834Z	
2025-10-11T20:27:16.949977Z	3 packages are looking for funding
2025-10-11T20:27:16.950049Z	  run `npm fund` for details
2025-10-11T20:27:16.950533Z	
2025-10-11T20:27:16.950661Z	found 0 vulnerabilities
2025-10-11T20:27:16.977849Z	Executing user command: cd frontend && pnpm install && pnpm build
2025-10-11T20:27:17.736483Z	Lockfile is up to date, resolution step is skipped
2025-10-11T20:27:17.787623Z	Progress: resolved 1, reused 0, downloaded 0, added 0
2025-10-11T20:27:18.002167Z	Packages: +655
2025-10-11T20:27:18.002565Z	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
2025-10-11T20:27:18.796235Z	Progress: resolved 655, reused 0, downloaded 99, added 77
2025-10-11T20:27:19.796699Z	Progress: resolved 655, reused 0, downloaded 197, added 136
2025-10-11T20:27:20.797972Z	Progress: resolved 655, reused 0, downloaded 314, added 255
2025-10-11T20:27:21.798061Z	Progress: resolved 655, reused 0, downloaded 475, added 399
2025-10-11T20:27:22.804197Z	Progress: resolved 655, reused 0, downloaded 645, added 537
2025-10-11T20:27:23.80555Z	Progress: resolved 655, reused 0, downloaded 654, added 653
2025-10-11T20:27:24.351986Z	Progress: resolved 655, reused 0, downloaded 655, added 655, done
2025-10-11T20:27:24.630618Z	
2025-10-11T20:27:24.630842Z	dependencies:
2025-10-11T20:27:24.631442Z	+ @radix-ui/react-alert-dialog 1.1.15
2025-10-11T20:27:24.631599Z	+ @radix-ui/react-dropdown-menu 2.1.16
2025-10-11T20:27:24.631748Z	+ @radix-ui/react-navigation-menu 1.2.14
2025-10-11T20:27:24.631842Z	+ @radix-ui/react-select 2.2.6
2025-10-11T20:27:24.632137Z	+ @tanstack/react-query 5.90.2
2025-10-11T20:27:24.632294Z	+ @types/node 20.19.21
2025-10-11T20:27:24.632412Z	+ @types/react 18.3.26
2025-10-11T20:27:24.632554Z	+ @types/react-dom 18.3.7
2025-10-11T20:27:24.632661Z	+ dayjs 1.11.18
2025-10-11T20:27:24.632789Z	+ jotai 2.15.0
2025-10-11T20:27:24.633144Z	+ lucide-react 0.408.0
2025-10-11T20:27:24.633341Z	+ next 14.2.33
2025-10-11T20:27:24.633621Z	+ next-intl 3.26.5
2025-10-11T20:27:24.633738Z	+ react 18.3.1
2025-10-11T20:27:24.63402Z	+ react-dom 18.3.1
2025-10-11T20:27:24.634266Z	+ react-hook-form 7.65.0
2025-10-11T20:27:24.634402Z	+ tailwindcss-animate 1.0.7
2025-10-11T20:27:24.634497Z	+ tailwindcss-rtl 0.9.0
2025-10-11T20:27:24.634591Z	+ typescript 5.9.3
2025-10-11T20:27:24.63469Z	+ zod 3.25.76
2025-10-11T20:27:24.634789Z	+ zustand 4.5.7
2025-10-11T20:27:24.634911Z	
2025-10-11T20:27:24.635Z	devDependencies:
2025-10-11T20:27:24.635086Z	+ @playwright/test 1.56.0
2025-10-11T20:27:24.635203Z	+ @radix-ui/react-slot 1.2.3
2025-10-11T20:27:24.63543Z	+ @shadcn/ui 0.0.4
2025-10-11T20:27:24.635569Z	+ @testing-library/jest-dom 6.9.1
2025-10-11T20:27:24.635675Z	+ @testing-library/react 16.3.0
2025-10-11T20:27:24.635753Z	+ @testing-library/user-event 14.6.1
2025-10-11T20:27:24.635817Z	+ @types/jest 29.5.14
2025-10-11T20:27:24.635904Z	+ @vitejs/plugin-react 4.7.0
2025-10-11T20:27:24.635978Z	+ autoprefixer 10.4.21
2025-10-11T20:27:24.636037Z	+ class-variance-authority 0.7.1
2025-10-11T20:27:24.636111Z	+ clsx 2.1.1
2025-10-11T20:27:24.636204Z	+ eslint 8.57.1
2025-10-11T20:27:24.6363Z	+ eslint-config-next 14.2.33
2025-10-11T20:27:24.636399Z	+ jsdom 24.1.3
2025-10-11T20:27:24.636496Z	+ openapi-generator-cli 1.0.0
2025-10-11T20:27:24.6366Z	+ postcss 8.5.6
2025-10-11T20:27:24.636697Z	+ prettier 3.6.2
2025-10-11T20:27:24.636791Z	+ tailwind-merge 2.6.0
2025-10-11T20:27:24.636919Z	+ tailwindcss 3.4.18
2025-10-11T20:27:24.636997Z	+ vitest 2.1.9
2025-10-11T20:27:24.637076Z	
2025-10-11T20:27:24.637261Z	╭ Warning ─────────────────────────────────────────────────────────────────────╮
2025-10-11T20:27:24.637393Z	│                                                                              │
2025-10-11T20:27:24.637558Z	│   Ignored build scripts: esbuild, unrs-resolver.                             │
2025-10-11T20:27:24.637669Z	│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
2025-10-11T20:27:24.637772Z	│   to run scripts.                                                            │
2025-10-11T20:27:24.638032Z	│                                                                              │
2025-10-11T20:27:24.638191Z	╰──────────────────────────────────────────────────────────────────────────────╯
2025-10-11T20:27:24.638337Z	
2025-10-11T20:27:24.684141Z	Done in 7.4s using pnpm v10.11.1
2025-10-11T20:27:25.325394Z	
2025-10-11T20:27:25.325647Z	> p4-frontend@0.1.0 build /opt/buildhome/repo/frontend
2025-10-11T20:27:25.325799Z	> next build
2025-10-11T20:27:25.325942Z	
2025-10-11T20:27:26.049573Z	⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
2025-10-11T20:27:26.05358Z	Attention: Next.js now collects completely anonymous telemetry regarding usage.
2025-10-11T20:27:26.053735Z	This information is used to shape Next.js' roadmap and prioritize features.
2025-10-11T20:27:26.053845Z	You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
2025-10-11T20:27:26.05397Z	https://nextjs.org/telemetry
2025-10-11T20:27:26.05404Z	
2025-10-11T20:27:26.11221Z	  ▲ Next.js 14.2.33
2025-10-11T20:27:26.112465Z	
2025-10-11T20:27:26.169853Z	   Creating an optimized production build ...
2025-10-11T20:27:35.731701Z	Failed to compile.
2025-10-11T20:27:35.732081Z	
2025-10-11T20:27:35.73252Z	./libs/i18n/i18n-config.ts:22:17
2025-10-11T20:27:35.732644Z	Module not found: Can't resolve '../messages'
2025-10-11T20:27:35.732906Z	[0m [90m 20 |[39m   [36mreturn[39m {[0m
2025-10-11T20:27:35.733154Z	[0m [90m 21 |[39m     messages[33m:[39m {[0m
2025-10-11T20:27:35.733338Z	[0m[31m[1m>[22m[39m[90m 22 |[39m       [33m...[39m([36mawait[39m [36mimport[39m([32m`../messages/${locale}.json`[39m))[33m.[39m[36mdefault[39m[33m,[39m[0m
2025-10-11T20:27:35.733474Z	[0m [90m    |[39m                 [31m[1m^[22m[39m[0m
2025-10-11T20:27:35.733643Z	[0m [90m 23 |[39m     }[33m,[39m[0m
2025-10-11T20:27:35.733927Z	[0m [90m 24 |[39m   }[33m;[39m[0m
2025-10-11T20:27:35.734062Z	[0m [90m 25 |[39m })[33m;[39m[0m
2025-10-11T20:27:35.73426Z	
2025-10-11T20:27:35.734418Z	https://nextjs.org/docs/messages/module-not-found
2025-10-11T20:27:35.73454Z	
2025-10-11T20:27:35.734675Z	Import trace for requested module:
2025-10-11T20:27:35.734841Z	./middleware.ts
2025-10-11T20:27:35.735028Z	
2025-10-11T20:27:35.735166Z	./middleware.ts:3:1
2025-10-11T20:27:35.735271Z	Module not found: Can't resolve 'next-i18n-router'
2025-10-11T20:27:35.735489Z	[0m [90m 1 |[39m [90m// middleware.ts[39m[0m
2025-10-11T20:27:35.735648Z	[0m [90m 2 |[39m [36mimport[39m { [33mNextRequest[39m[33m,[39m [33mNextResponse[39m } [36mfrom[39m [32m'next/server'[39m[33m;[39m[0m
2025-10-11T20:27:35.735792Z	[0m[31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m { i18nRouter } [36mfrom[39m [32m'next-i18n-router'[39m[33m;[39m[0m
2025-10-11T20:27:35.735952Z	[0m [90m   |[39m [31m[1m^[22m[39m[0m
2025-10-11T20:27:35.736069Z	[0m [90m 4 |[39m [36mimport[39m { i18n } [36mfrom[39m [32m'./libs/i18n/i18n-config'[39m[33m;[39m[0m
2025-10-11T20:27:35.736199Z	[0m [90m 5 |[39m[0m
2025-10-11T20:27:35.736306Z	[0m [90m 6 |[39m [36mexport[39m [36mfunction[39m middleware(request[33m:[39m [33mNextRequest[39m) {[0m
2025-10-11T20:27:35.736415Z	
2025-10-11T20:27:35.736518Z	https://nextjs.org/docs/messages/module-not-found
2025-10-11T20:27:35.736635Z	
2025-10-11T20:27:35.74556Z	
2025-10-11T20:27:35.746041Z	> Build failed because of webpack errors
2025-10-11T20:27:35.782255Z	 ELIFECYCLE  Command failed with exit code 1.
2025-10-11T20:27:35.81036Z	Failed: Error while executing user command. Exited with error code: 1
2025-10-11T20:27:35.822112Z	Failed: build command exited with code: 1
2025-10-11T20:27:36.959822Z	Failed: error occurred while running build command