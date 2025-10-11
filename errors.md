2025-10-11T09:32:43.380201505Z	Cloning repository...
2025-10-11T09:32:44.073243486Z	From https://github.com/ahmedmmkms/b2b-marketplace
2025-10-11T09:32:44.073792936Z	 * branch            d6a99ec6a6be9896ff72d6b8d8e278ee6735c5d8 -> FETCH_HEAD
2025-10-11T09:32:44.073926329Z	
2025-10-11T09:32:44.136442454Z	HEAD is now at d6a99ec Fix package-lock.json to resolve build issues
2025-10-11T09:32:44.136735999Z	
2025-10-11T09:32:44.217055525Z	
2025-10-11T09:32:44.217515325Z	Using v2 root directory strategy
2025-10-11T09:32:44.239106004Z	Success: Finished cloning repository files
2025-10-11T09:32:46.036574718Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-10-11T09:32:46.037072781Z	
2025-10-11T09:32:47.139710597Z	No wrangler.toml file found. Continuing.
2025-10-11T09:32:47.223483151Z	Detected the following tools from environment: nodejs@20.19.2, npm@10.9.2
2025-10-11T09:32:47.223515941Z	Installing nodejs 20.19.2
2025-10-11T09:32:48.327701561Z	Trying to update node-build... ok
2025-10-11T09:32:48.490495831Z	To follow progress, use 'tail -f /tmp/node-build.20251011093248.495.log' or pass --verbose
2025-10-11T09:32:48.595024371Z	Downloading node-v20.19.2-linux-x64.tar.gz...
2025-10-11T09:32:48.797534767Z	-> https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-x64.tar.gz
2025-10-11T09:32:50.436265929Z	
2025-10-11T09:32:50.436306429Z	WARNING: node-v20.19.2-linux-x64 is in LTS Maintenance mode and nearing its end of life.
2025-10-11T09:32:50.436331803Z	It only receives *critical* security updates, *critical* bug fixes and documentation updates.
2025-10-11T09:32:50.436342565Z	
2025-10-11T09:32:50.436348322Z	Installing node-v20.19.2-linux-x64...
2025-10-11T09:32:50.836807824Z	Installed node-v20.19.2-linux-x64 to /opt/buildhome/.asdf/installs/nodejs/20.19.2
2025-10-11T09:32:50.837157048Z	
2025-10-11T09:32:51.866777464Z	Installing project dependencies: npm clean-install --progress=false
2025-10-11T09:32:53.769750215Z	npm warn ERESOLVE overriding peer dependency
2025-10-11T09:32:53.770485946Z	npm warn While resolving: @swc-node/core@1.14.1
2025-10-11T09:32:53.770572444Z	npm warn Found: @swc/core@1.5.29
2025-10-11T09:32:53.770665029Z	npm warn node_modules/@swc/core
2025-10-11T09:32:53.770886433Z	npm warn   dev @swc/core@"~1.5.7" from the root project
2025-10-11T09:32:53.770902317Z	npm warn   3 more (@swc-node/register, nx, ts-node)
2025-10-11T09:32:53.771021105Z	npm warn
2025-10-11T09:32:53.771098694Z	npm warn Could not resolve dependency:
2025-10-11T09:32:53.771260269Z	npm warn peer @swc/core@">= 1.13.3" from @swc-node/core@1.14.1
2025-10-11T09:32:53.771436567Z	npm warn node_modules/@swc-node/core
2025-10-11T09:32:53.771493814Z	npm warn   @swc-node/core@"^1.13.1" from @swc-node/register@1.9.2
2025-10-11T09:32:53.771682374Z	npm warn   node_modules/@swc-node/register
2025-10-11T09:32:53.771692649Z	npm warn
2025-10-11T09:32:53.771795417Z	npm warn Conflicting peer dependency: @swc/core@1.13.5
2025-10-11T09:32:53.771903581Z	npm warn node_modules/@swc/core
2025-10-11T09:32:53.772027808Z	npm warn   peer @swc/core@">= 1.13.3" from @swc-node/core@1.14.1
2025-10-11T09:32:53.772294845Z	npm warn   node_modules/@swc-node/core
2025-10-11T09:32:53.772313314Z	npm warn     @swc-node/core@"^1.13.1" from @swc-node/register@1.9.2
2025-10-11T09:32:53.772498864Z	npm warn     node_modules/@swc-node/register
2025-10-11T09:32:54.063437816Z	npm warn ERESOLVE overriding peer dependency
2025-10-11T09:32:54.063742826Z	npm warn While resolving: vite@7.1.5
2025-10-11T09:32:54.063797013Z	npm warn Found: @types/node@18.16.9
2025-10-11T09:32:54.063946607Z	npm warn node_modules/@types/node
2025-10-11T09:32:54.064121379Z	npm warn   dev @types/node@"18.16.9" from the root project
2025-10-11T09:32:54.064218716Z	npm warn   129 more (@inquirer/checkbox, @inquirer/confirm, @inquirer/core, ...)
2025-10-11T09:32:54.064315059Z	npm warn
2025-10-11T09:32:54.064544391Z	npm warn Could not resolve dependency:
2025-10-11T09:32:54.064748861Z	npm warn peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.1.5
2025-10-11T09:32:54.064761537Z	npm warn node_modules/vite
2025-10-11T09:32:54.064766849Z	npm warn   vite@"7.1.5" from @angular/build@20.3.5
2025-10-11T09:32:54.065768779Z	npm warn   node_modules/@angular/build
2025-10-11T09:32:54.065797016Z	npm warn   1 more (@vitejs/plugin-basic-ssl)
2025-10-11T09:32:54.065803137Z	npm warn
2025-10-11T09:32:54.065807167Z	npm warn Conflicting peer dependency: @types/node@24.7.1
2025-10-11T09:32:54.065810975Z	npm warn node_modules/@types/node
2025-10-11T09:32:54.065814596Z	npm warn   peerOptional @types/node@"^20.19.0 || >=22.12.0" from vite@7.1.5
2025-10-11T09:32:54.065817819Z	npm warn   node_modules/vite
2025-10-11T09:32:54.065820842Z	npm warn     vite@"7.1.5" from @angular/build@20.3.5
2025-10-11T09:32:54.065823931Z	npm warn     node_modules/@angular/build
2025-10-11T09:32:54.065826919Z	npm warn     1 more (@vitejs/plugin-basic-ssl)
2025-10-11T09:32:59.429102444Z	npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
2025-10-11T09:33:00.278825544Z	npm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
2025-10-11T09:33:00.806949534Z	npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
2025-10-11T09:33:03.403026215Z	npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
2025-10-11T09:33:04.207765821Z	npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
2025-10-11T09:33:04.921304697Z	npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
2025-10-11T09:33:05.414113003Z	npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
2025-10-11T09:33:06.602718939Z	npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported