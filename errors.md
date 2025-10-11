2025-10-11T09:27:05.186611Z	Cloning repository...
2025-10-11T09:27:05.88555Z	From https://github.com/ahmedmmkms/b2b-marketplace
2025-10-11T09:27:05.88621Z	 * branch            ff2c6f95a6db4e8c4942d0bd262e5ced21f1be0b -> FETCH_HEAD
2025-10-11T09:27:05.886352Z	
2025-10-11T09:27:05.9482Z	HEAD is now at ff2c6f9 Fix: Convert frontend2 from submodule to regular directory for Cloudflare Pages compatibility
2025-10-11T09:27:05.948708Z	
2025-10-11T09:27:06.032294Z	
2025-10-11T09:27:06.03286Z	Using v2 root directory strategy
2025-10-11T09:27:06.055607Z	Success: Finished cloning repository files
2025-10-11T09:27:07.885467Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-10-11T09:27:07.886128Z	
2025-10-11T09:27:08.985475Z	No wrangler.toml file found. Continuing.
2025-10-11T09:27:09.071263Z	Detected the following tools from environment: nodejs@20.19.2, npm@10.9.2
2025-10-11T09:27:09.072002Z	Installing nodejs 20.19.2
2025-10-11T09:27:10.128629Z	Trying to update node-build... ok
2025-10-11T09:27:10.229893Z	To follow progress, use 'tail -f /tmp/node-build.20251011092710.495.log' or pass --verbose
2025-10-11T09:27:10.330887Z	Downloading node-v20.19.2-linux-x64.tar.gz...
2025-10-11T09:27:10.570152Z	-> https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-x64.tar.gz
2025-10-11T09:27:12.22784Z	
2025-10-11T09:27:12.228102Z	WARNING: node-v20.19.2-linux-x64 is in LTS Maintenance mode and nearing its end of life.
2025-10-11T09:27:12.228608Z	It only receives *critical* security updates, *critical* bug fixes and documentation updates.
2025-10-11T09:27:12.228748Z	
2025-10-11T09:27:12.228867Z	Installing node-v20.19.2-linux-x64...
2025-10-11T09:27:12.643301Z	Installed node-v20.19.2-linux-x64 to /opt/buildhome/.asdf/installs/nodejs/20.19.2
2025-10-11T09:27:12.643938Z	
2025-10-11T09:27:13.70436Z	Installing project dependencies: npm clean-install --progress=false
2025-10-11T09:27:16.453745Z	npm warn ERESOLVE overriding peer dependency
2025-10-11T09:27:16.454506Z	npm warn While resolving: @swc-node/core@1.14.1
2025-10-11T09:27:16.454735Z	npm warn Found: @swc/core@1.5.29
2025-10-11T09:27:16.454885Z	npm warn node_modules/@swc/core
2025-10-11T09:27:16.455019Z	npm warn   dev @swc/core@"~1.5.7" from the root project
2025-10-11T09:27:16.455147Z	npm warn   3 more (@swc-node/register, nx, ts-node)
2025-10-11T09:27:16.455268Z	npm warn
2025-10-11T09:27:16.45537Z	npm warn Could not resolve dependency:
2025-10-11T09:27:16.455479Z	npm warn peer @swc/core@">= 1.13.3" from @swc-node/core@1.14.1
2025-10-11T09:27:16.455602Z	npm warn node_modules/@swc-node/core
2025-10-11T09:27:16.455826Z	npm warn   @swc-node/core@"^1.13.1" from @swc-node/register@1.9.2
2025-10-11T09:27:16.456103Z	npm warn   node_modules/@swc-node/register
2025-10-11T09:27:16.456248Z	npm warn
2025-10-11T09:27:16.45635Z	npm warn Conflicting peer dependency: @swc/core@1.13.5
2025-10-11T09:27:16.456481Z	npm warn node_modules/@swc/core
2025-10-11T09:27:16.45658Z	npm warn   peer @swc/core@">= 1.13.3" from @swc-node/core@1.14.1
2025-10-11T09:27:16.45667Z	npm warn   node_modules/@swc-node/core
2025-10-11T09:27:16.45676Z	npm warn     @swc-node/core@"^1.13.1" from @swc-node/register@1.9.2
2025-10-11T09:27:16.456852Z	npm warn     node_modules/@swc-node/register
2025-10-11T09:27:17.161618Z	npm warn ERESOLVE overriding peer dependency
2025-10-11T09:27:17.162013Z	npm warn While resolving: vite@7.1.5
2025-10-11T09:27:17.162176Z	npm warn Found: @types/node@18.16.9
2025-10-11T09:27:17.162289Z	npm warn node_modules/@types/node
2025-10-11T09:27:17.162396Z	npm warn   dev @types/node@"18.16.9" from the root project
2025-10-11T09:27:17.162532Z	npm warn   129 more (@inquirer/checkbox, @inquirer/confirm, @inquirer/core, ...)
2025-10-11T09:27:17.162651Z	npm warn
2025-10-11T09:27:17.162747Z	npm warn Could not resolve dependency:
2025-10-11T09:27:17.162847Z	npm warn peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.1.5
2025-10-11T09:27:17.16297Z	npm warn node_modules/vite
2025-10-11T09:27:17.163081Z	npm warn   vite@"7.1.5" from @angular/build@20.3.5
2025-10-11T09:27:17.163167Z	npm warn   node_modules/@angular/build
2025-10-11T09:27:17.16327Z	npm warn   1 more (@vitejs/plugin-basic-ssl)
2025-10-11T09:27:17.16335Z	npm warn
2025-10-11T09:27:17.163529Z	npm warn Conflicting peer dependency: @types/node@24.7.1
2025-10-11T09:27:17.163637Z	npm warn node_modules/@types/node
2025-10-11T09:27:17.16371Z	npm warn   peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.1.5
2025-10-11T09:27:17.163817Z	npm warn   node_modules/vite
2025-10-11T09:27:17.163879Z	npm warn     vite@"7.1.5" from @angular/build@20.3.5
2025-10-11T09:27:17.163965Z	npm warn     node_modules/@angular/build
2025-10-11T09:27:17.164047Z	npm warn     1 more (@vitejs/plugin-basic-ssl)
2025-10-11T09:27:17.205324Z	npm error code EUSAGE
2025-10-11T09:27:17.205699Z	npm error
2025-10-11T09:27:17.205839Z	npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
2025-10-11T09:27:17.205997Z	npm error
2025-10-11T09:27:17.206105Z	npm error Missing: react@19.2.0 from lock file
2025-10-11T09:27:17.206236Z	npm error Missing: react-dom@19.2.0 from lock file
2025-10-11T09:27:17.206351Z	npm error Missing: react-refresh@0.18.0 from lock file
2025-10-11T09:27:17.206606Z	npm error Missing: @angular/animations@20.3.4 from lock file
2025-10-11T09:27:17.206729Z	npm error Missing: scheduler@0.27.0 from lock file
2025-10-11T09:27:17.206798Z	npm error
2025-10-11T09:27:17.206871Z	npm error Clean install a project
2025-10-11T09:27:17.20693Z	npm error
2025-10-11T09:27:17.207024Z	npm error Usage:
2025-10-11T09:27:17.207253Z	npm error npm ci
2025-10-11T09:27:17.207406Z	npm error
2025-10-11T09:27:17.207515Z	npm error Options:
2025-10-11T09:27:17.20764Z	npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
2025-10-11T09:27:17.207767Z	npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
2025-10-11T09:27:17.207938Z	npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
2025-10-11T09:27:17.208074Z	npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
2025-10-11T09:27:17.208193Z	npm error [--no-bin-links] [--no-fund] [--dry-run]
2025-10-11T09:27:17.208333Z	npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
2025-10-11T09:27:17.208448Z	npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
2025-10-11T09:27:17.208752Z	npm error
2025-10-11T09:27:17.20886Z	npm error aliases: clean-install, ic, install-clean, isntall-clean
2025-10-11T09:27:17.208965Z	npm error
2025-10-11T09:27:17.209061Z	npm error Run "npm help ci" for more info
2025-10-11T09:27:17.209225Z	npm error A complete log of this run can be found in: /opt/buildhome/.npm/_logs/2025-10-11T09_27_14_030Z-debug-0.log
2025-10-11T09:27:17.223726Z	Error: Exit with error code: 1
2025-10-11T09:27:17.224414Z	    at ChildProcess.<anonymous> (/snapshot/dist/run-build.js)
2025-10-11T09:27:17.224552Z	    at Object.onceWrapper (node:events:652:26)
2025-10-11T09:27:17.224674Z	    at ChildProcess.emit (node:events:537:28)
2025-10-11T09:27:17.22478Z	    at ChildProcess._handle.onexit (node:internal/child_process:291:12)
2025-10-11T09:27:17.234274Z	Failed: build command exited with code: 1
2025-10-11T09:27:18.364975Z	Failed: error occurred while running build command