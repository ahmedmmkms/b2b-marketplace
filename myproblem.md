D:\Projects\b2b-marketplace\frontend>pnpm gen:api

> frontend@0.1.0 gen:api D:\Projects\b2b-marketplace\frontend
> pnpm exec openapi-typescript ../docs/openapi.yaml -o libs/api/types.ts && pnpm exec orval --config libs/api/orval.config.ts

✨ openapi-typescript 6.7.6
🚀 ../docs/openapi.yaml → file:///D:/Projects/b2b-marketplace/frontend/libs/api/types.ts [81ms]
🍻 Start orval v6.31.0 - A swagger client generator for typescript
▲ [WARNING] Cannot find base config file "next/tsconfig.json" [tsconfig.json]

    tsconfig.json:2:13:
      2 │   "extends": "next/tsconfig.json",
        ╵              ~~~~~~~~~~~~~~~~~~~~

🛑 miniMvp - Error: ENOENT: no such file or directory, open 'D:\Projects\b2b-marketplace\frontend\libs\api\libs\api\client.ts'