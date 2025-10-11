2025-10-11T20:22:18.111879Z	Cloning repository...
2025-10-11T20:22:18.773957Z	From https://github.com/ahmedmmkms/b2b-marketplace
2025-10-11T20:22:18.774544Z	 * branch            570ae311b6fa954321087d38fe41d0a59930fd95 -> FETCH_HEAD
2025-10-11T20:22:18.774737Z	
2025-10-11T20:22:18.822599Z	HEAD is now at 570ae31 Complete database reset and seeding with comprehensive test dataset
2025-10-11T20:22:18.823124Z	
2025-10-11T20:22:18.901764Z	
2025-10-11T20:22:18.9023Z	Using v2 root directory strategy
2025-10-11T20:22:18.924017Z	Success: Finished cloning repository files
2025-10-11T20:22:20.671914Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-10-11T20:22:20.672655Z	
2025-10-11T20:22:21.782575Z	No wrangler.toml file found. Continuing.
2025-10-11T20:22:21.86232Z	Detected the following tools from environment: nodejs@22.16.0, npm@10.9.2
2025-10-11T20:22:21.863041Z	Installing project dependencies: npm clean-install --progress=false
2025-10-11T20:22:34.642585Z	
2025-10-11T20:22:34.642921Z	added 21 packages, and audited 22 packages in 12s
2025-10-11T20:22:34.643082Z	
2025-10-11T20:22:34.643218Z	3 packages are looking for funding
2025-10-11T20:22:34.643349Z	  run `npm fund` for details
2025-10-11T20:22:34.643928Z	
2025-10-11T20:22:34.64411Z	found 0 vulnerabilities
2025-10-11T20:22:34.672834Z	Executing user command: cd frontend && pnpm install && pnpm build
2025-10-11T20:22:35.456323Z	Lockfile is up to date, resolution step is skipped
2025-10-11T20:22:35.507998Z	Progress: resolved 1, reused 0, downloaded 0, added 0
2025-10-11T20:22:35.675379Z	Packages: +655
2025-10-11T20:22:35.675782Z	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
2025-10-11T20:22:36.564254Z	Progress: resolved 655, reused 0, downloaded 100, added 81
2025-10-11T20:22:37.565778Z	Progress: resolved 655, reused 0, downloaded 170, added 138
2025-10-11T20:22:38.565481Z	Progress: resolved 655, reused 0, downloaded 266, added 216
2025-10-11T20:22:39.565347Z	Progress: resolved 655, reused 0, downloaded 393, added 327
2025-10-11T20:22:40.565688Z	Progress: resolved 655, reused 0, downloaded 523, added 423
2025-10-11T20:22:41.566232Z	Progress: resolved 655, reused 0, downloaded 654, added 654
2025-10-11T20:22:42.045576Z	Progress: resolved 655, reused 0, downloaded 655, added 655, done
2025-10-11T20:22:42.299626Z	
2025-10-11T20:22:42.299932Z	dependencies:
2025-10-11T20:22:42.300082Z	+ @radix-ui/react-alert-dialog 1.1.15
2025-10-11T20:22:42.300311Z	+ @radix-ui/react-dropdown-menu 2.1.16
2025-10-11T20:22:42.300463Z	+ @radix-ui/react-navigation-menu 1.2.14
2025-10-11T20:22:42.300605Z	+ @radix-ui/react-select 2.2.6
2025-10-11T20:22:42.300746Z	+ @tanstack/react-query 5.90.2
2025-10-11T20:22:42.300868Z	+ @types/node 20.19.21
2025-10-11T20:22:42.300981Z	+ @types/react 18.3.26
2025-10-11T20:22:42.301107Z	+ @types/react-dom 18.3.7
2025-10-11T20:22:42.301222Z	+ dayjs 1.11.18
2025-10-11T20:22:42.301315Z	+ jotai 2.15.0
2025-10-11T20:22:42.301442Z	+ lucide-react 0.408.0
2025-10-11T20:22:42.301616Z	+ next 14.2.33
2025-10-11T20:22:42.301838Z	+ next-intl 3.26.5
2025-10-11T20:22:42.30194Z	+ react 18.3.1
2025-10-11T20:22:42.302044Z	+ react-dom 18.3.1
2025-10-11T20:22:42.302161Z	+ react-hook-form 7.65.0
2025-10-11T20:22:42.302261Z	+ tailwindcss-animate 1.0.7
2025-10-11T20:22:42.302422Z	+ tailwindcss-rtl 0.9.0
2025-10-11T20:22:42.302489Z	+ typescript 5.9.3
2025-10-11T20:22:42.30263Z	+ zod 3.25.76
2025-10-11T20:22:42.302828Z	+ zustand 4.5.7
2025-10-11T20:22:42.30356Z	
2025-10-11T20:22:42.30372Z	devDependencies:
2025-10-11T20:22:42.303856Z	+ @playwright/test 1.56.0
2025-10-11T20:22:42.303968Z	+ @radix-ui/react-slot 1.2.3
2025-10-11T20:22:42.30407Z	+ @shadcn/ui 0.0.4
2025-10-11T20:22:42.304172Z	+ @testing-library/jest-dom 6.9.1
2025-10-11T20:22:42.304278Z	+ @testing-library/react 16.3.0
2025-10-11T20:22:42.304576Z	+ @testing-library/user-event 14.6.1
2025-10-11T20:22:42.304824Z	+ @types/jest 29.5.14
2025-10-11T20:22:42.304983Z	+ @vitejs/plugin-react 4.7.0
2025-10-11T20:22:42.305151Z	+ autoprefixer 10.4.21
2025-10-11T20:22:42.305301Z	+ class-variance-authority 0.7.1
2025-10-11T20:22:42.305395Z	+ clsx 2.1.1
2025-10-11T20:22:42.305505Z	+ eslint 8.57.1
2025-10-11T20:22:42.305626Z	+ eslint-config-next 14.2.33
2025-10-11T20:22:42.305748Z	+ jsdom 24.1.3
2025-10-11T20:22:42.306107Z	+ openapi-generator-cli 1.0.0
2025-10-11T20:22:42.306414Z	+ postcss 8.5.6
2025-10-11T20:22:42.306513Z	+ prettier 3.6.2
2025-10-11T20:22:42.30658Z	+ tailwind-merge 2.6.0
2025-10-11T20:22:42.306782Z	+ tailwindcss 3.4.18
2025-10-11T20:22:42.306892Z	+ vitest 2.1.9
2025-10-11T20:22:42.307197Z	
2025-10-11T20:22:42.307379Z	╭ Warning ─────────────────────────────────────────────────────────────────────╮
2025-10-11T20:22:42.307559Z	│                                                                              │
2025-10-11T20:22:42.307681Z	│   Ignored build scripts: esbuild, unrs-resolver.                             │
2025-10-11T20:22:42.307811Z	│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
2025-10-11T20:22:42.307926Z	│   to run scripts.                                                            │
2025-10-11T20:22:42.308025Z	│                                                                              │
2025-10-11T20:22:42.308191Z	╰──────────────────────────────────────────────────────────────────────────────╯
2025-10-11T20:22:42.308427Z	
2025-10-11T20:22:42.3524Z	Done in 7.3s using pnpm v10.11.1
2025-10-11T20:22:43.003859Z	
2025-10-11T20:22:43.004163Z	> p4-frontend@0.1.0 build /opt/buildhome/repo/frontend
2025-10-11T20:22:43.004461Z	> next build
2025-10-11T20:22:43.004658Z	
2025-10-11T20:22:43.72379Z	⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
2025-10-11T20:22:43.727876Z	Attention: Next.js now collects completely anonymous telemetry regarding usage.
2025-10-11T20:22:43.728085Z	This information is used to shape Next.js' roadmap and prioritize features.
2025-10-11T20:22:43.728201Z	You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
2025-10-11T20:22:43.728303Z	https://nextjs.org/telemetry
2025-10-11T20:22:43.728443Z	
2025-10-11T20:22:43.785003Z	  ▲ Next.js 14.2.33
2025-10-11T20:22:43.785248Z	
2025-10-11T20:22:43.84323Z	   Creating an optimized production build ...
2025-10-11T20:22:50.384741Z	Failed to compile.
2025-10-11T20:22:50.385191Z	
2025-10-11T20:22:50.385428Z	./app/layout.tsx
2025-10-11T20:22:50.385566Z	Module not found: Can't resolve './globals.css'
2025-10-11T20:22:50.385696Z	
2025-10-11T20:22:50.385832Z	https://nextjs.org/docs/messages/module-not-found
2025-10-11T20:22:50.385947Z	
2025-10-11T20:22:50.39679Z	
2025-10-11T20:22:50.397195Z	> Build failed because of webpack errors
2025-10-11T20:22:50.444464Z	 ELIFECYCLE  Command failed with exit code 1.
2025-10-11T20:22:50.473369Z	Failed: Error while executing user command. Exited with error code: 1
2025-10-11T20:22:50.487211Z	Failed: build command exited with code: 1
2025-10-11T20:22:51.67492Z	Failed: error occurred while running build command