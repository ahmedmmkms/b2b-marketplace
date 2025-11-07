2025-11-07T16:36:12.549815Z	Cloning repository...
2025-11-07T16:36:13.437904Z	From https://github.com/ahmedmmkms/b2b-marketplace
2025-11-07T16:36:13.438437Z	 * branch            2eb1a7c7ad5c3506017ddd3276e4f959fae6c10b -> FETCH_HEAD
2025-11-07T16:36:13.438596Z	
2025-11-07T16:36:13.598665Z	HEAD is now at 2eb1a7c Design Laning page
2025-11-07T16:36:13.599235Z	
2025-11-07T16:36:13.677647Z	
2025-11-07T16:36:13.678344Z	Using v2 root directory strategy
2025-11-07T16:36:13.701971Z	Success: Finished cloning repository files
2025-11-07T16:36:15.797444Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-11-07T16:36:15.798118Z	
2025-11-07T16:36:16.923388Z	No wrangler.toml file found. Continuing.
2025-11-07T16:36:17.005017Z	Detected the following tools from environment: nodejs@22.16.0
2025-11-07T16:36:17.005576Z	Executing user command: cd frontend && pnpm install && pnpm run cf:build
2025-11-07T16:36:17.322863Z	! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-8.15.7.tgz
2025-11-07T16:36:18.361682Z	 EACCES  EACCES: permission denied, mkdir '/mnt/d'
2025-11-07T16:36:18.362316Z	
2025-11-07T16:36:18.362703Z	pnpm: EACCES: permission denied, mkdir '/mnt/d'
2025-11-07T16:36:18.362859Z	    at async Object.mkdir (node:internal/fs/promises:852:10)
2025-11-07T16:36:18.362989Z	    at async createNewStoreController (/opt/buildhome/.cache/node/corepack/v1/pnpm/8.15.7/dist/pnpm.cjs:127582:7)
2025-11-07T16:36:18.363106Z	    at async installDeps (/opt/buildhome/.cache/node/corepack/v1/pnpm/8.15.7/dist/pnpm.cjs:187482:21)
2025-11-07T16:36:18.363277Z	    at async /opt/buildhome/.cache/node/corepack/v1/pnpm/8.15.7/dist/pnpm.cjs:216989:21
2025-11-07T16:36:18.363377Z	    at async main (/opt/buildhome/.cache/node/corepack/v1/pnpm/8.15.7/dist/pnpm.cjs:216952:34)
2025-11-07T16:36:18.363469Z	    at async runPnpm (/opt/buildhome/.cache/node/corepack/v1/pnpm/8.15.7/dist/pnpm.cjs:217213:5)
2025-11-07T16:36:18.363566Z	    at async /opt/buildhome/.cache/node/corepack/v1/pnpm/8.15.7/dist/pnpm.cjs:217205:7
2025-11-07T16:36:18.390993Z	Failed: Error while executing user command. Exited with error code: 243
2025-11-07T16:36:18.400109Z	Failed: build command exited with code: 1
2025-11-07T16:36:20.134275Z	Failed: error occurred while running build command