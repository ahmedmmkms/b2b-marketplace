2025-10-04T22:35:43.780322Z	Cloning repository...
2025-10-04T22:35:44.439352Z	From https://github.com/ahmedmmkms/b2b-marketplace
2025-10-04T22:35:44.439791Z	 * branch            120be47639cd9286af6453458dc98e3be2c78fc9 -> FETCH_HEAD
2025-10-04T22:35:44.439878Z	
2025-10-04T22:35:44.474266Z	HEAD is now at 120be47 Fix: Update angular.json schema, fix component config and icon provider
2025-10-04T22:35:44.474694Z	
2025-10-04T22:35:44.553986Z	
2025-10-04T22:35:44.554507Z	Using v2 root directory strategy
2025-10-04T22:35:44.578676Z	Success: Finished cloning repository files
2025-10-04T22:35:46.35698Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-10-04T22:35:46.357664Z	
2025-10-04T22:35:47.475838Z	No wrangler.toml file found. Continuing.
2025-10-04T22:35:47.543607Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-10-04T22:35:47.544139Z	Installing project dependencies: npm clean-install --progress=false
2025-10-04T22:36:00.199798Z	
2025-10-04T22:36:00.200024Z	added 21 packages, and audited 22 packages in 12s
2025-10-04T22:36:00.200144Z	
2025-10-04T22:36:00.200257Z	3 packages are looking for funding
2025-10-04T22:36:00.200324Z	  run `npm fund` for details
2025-10-04T22:36:00.20106Z	
2025-10-04T22:36:00.201163Z	found 0 vulnerabilities
2025-10-04T22:36:00.227393Z	Executing user command: cd frontend/p4-frontend && npm ci && npx nx build landing --prod
2025-10-04T22:36:04.439857Z	npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
2025-10-04T22:36:05.558957Z	npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
2025-10-04T22:36:05.74094Z	npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
2025-10-04T22:36:06.678023Z	npm warn deprecated critters@0.0.24: Ownership of Critters has moved to the Nuxt team, who will be maintaining the project going forward. If you'd like to keep using Critters, please switch to the actively-maintained fork at https://github.com/danielroe/beasties
2025-10-04T22:36:28.334212Z	
2025-10-04T22:36:28.334525Z	added 1329 packages, and audited 1330 packages in 28s
2025-10-04T22:36:28.334802Z	
2025-10-04T22:36:28.334917Z	205 packages are looking for funding
2025-10-04T22:36:28.335197Z	  run `npm fund` for details
2025-10-04T22:36:28.35377Z	
2025-10-04T22:36:28.354096Z	10 vulnerabilities (6 low, 4 moderate)
2025-10-04T22:36:28.354288Z	
2025-10-04T22:36:28.354435Z	To address issues that do not require attention, run:
2025-10-04T22:36:28.354575Z	  npm audit fix
2025-10-04T22:36:28.354692Z	
2025-10-04T22:36:28.354895Z	To address all issues (including breaking changes), run:
2025-10-04T22:36:28.355076Z	  npm audit fix --force
2025-10-04T22:36:28.355227Z	
2025-10-04T22:36:28.355362Z	Run `npm audit` for details.
2025-10-04T22:36:30.015176Z	
2025-10-04T22:36:30.01544Z	> nx run landing:build:production
2025-10-04T22:36:30.01557Z	
2025-10-04T22:36:31.864709Z	[33m❯[39m Building...
2025-10-04T22:36:39.419957Z	[32m✔[39m Building...
2025-10-04T22:36:39.421432Z	[37mApplication bundle generation failed. [7.555 seconds][39m
2025-10-04T22:36:39.421711Z	[37m[39m
2025-10-04T22:36:39.42366Z	[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCould not resolve "@ctrl/tinycolor"[0m[39m[22m
2025-10-04T22:36:39.423955Z	[1m[31m[39m[22m
2025-10-04T22:36:39.424404Z	[1m[31m    node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-color.mjs:1:47:[39m[22m
2025-10-04T22:36:39.424712Z	[1m[31m[37m      1 │ import { rgbToHsv, rgbToHex, inputToRGB } from [32m'@ctrl/tinycolor'[37m;[39m[22m
2025-10-04T22:36:39.424914Z	[1m[31m        ╵                                                [32m~~~~~~~~~~~~~~~~~[0m[39m[22m
2025-10-04T22:36:39.425027Z	[1m[31m[39m[22m
2025-10-04T22:36:39.425139Z	[1m[31m  You can mark the path "@ctrl/tinycolor" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.[39m[22m
2025-10-04T22:36:39.425298Z	[1m[31m[39m[22m
2025-10-04T22:36:39.425443Z	[1m[31m[39m[22m
2025-10-04T22:36:39.425575Z	[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCould not resolve "@ctrl/tinycolor"[0m[39m[22m
2025-10-04T22:36:39.42576Z	[1m[31m[39m[22m
2025-10-04T22:36:39.425871Z	[1m[31m    node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-config.mjs:5:26:[39m[22m
2025-10-04T22:36:39.426002Z	[1m[31m[37m      5 │ import { TinyColor } from [32m'@ctrl/tinycolor'[37m;[39m[22m
2025-10-04T22:36:39.426112Z	[1m[31m        ╵                           [32m~~~~~~~~~~~~~~~~~[0m[39m[22m
2025-10-04T22:36:39.426231Z	[1m[31m[39m[22m
2025-10-04T22:36:39.426355Z	[1m[31m  You can mark the path "@ctrl/tinycolor" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.[39m[22m
2025-10-04T22:36:39.426457Z	[1m[31m[39m[22m
2025-10-04T22:36:39.426552Z	[1m[31m[39m[22m
2025-10-04T22:36:39.549695Z	
2025-10-04T22:36:39.549953Z	
2025-10-04T22:36:39.550054Z	
2025-10-04T22:36:39.550247Z	 NX   Running target build for project landing failed
2025-10-04T22:36:39.551354Z	
2025-10-04T22:36:39.551624Z	Failed tasks:
2025-10-04T22:36:39.551772Z	
2025-10-04T22:36:39.551998Z	- landing:build:production
2025-10-04T22:36:39.552128Z	
2025-10-04T22:36:39.552236Z	Hint: run the command with --verbose for more details.
2025-10-04T22:36:39.552322Z	
2025-10-04T22:36:39.585252Z	node:events:652
2025-10-04T22:36:39.585679Z	    return this.listener.apply(this.target, arguments);
2025-10-04T22:36:39.58583Z	                         ^
2025-10-04T22:36:39.5859Z	
2025-10-04T22:36:39.585961Z	X [Error]: Error while executing user command. Exited with error code: 1
2025-10-04T22:36:39.586042Z	    at ChildProcess.<anonymous> (/snapshot/dist/run-build.js)
2025-10-04T22:36:39.586102Z	    at Object.onceWrapper (node:events:652:26)
2025-10-04T22:36:39.586158Z	    at ChildProcess.emit (node:events:537:28)
2025-10-04T22:36:39.586256Z	    at ChildProcess._handle.onexit (node:internal/child_process:291:12)
2025-10-04T22:36:39.586353Z	
2025-10-04T22:36:39.586453Z	Node.js v18.5.0
2025-10-04T22:36:39.597915Z	Failed: build command exited with code: 1
2025-10-04T22:36:40.786034Z	Failed: error occurred while running build command