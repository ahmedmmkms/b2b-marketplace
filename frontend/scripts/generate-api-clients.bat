@echo off
REM api:generate script for Windows

echo Generating OpenAPI clients for backend modules...

REM List of backend modules
set modules=catalog rfq quotes orders payments invoicing wallet loyalty identity

REM Base URL for the backend API (this would normally come from environment variables)
set BACKEND_URL=%BACKEND_URL:http://localhost:8080%

for %%m in (%modules%) do (
    echo Generating client for %%m module...
    
    REM Create directory if it doesn't exist
    if not exist "libs\api\%%m" mkdir "libs\api\%%m"
    
    REM For now, we'll create a placeholder to show where the generated code would go
    echo // This file would contain the generated OpenAPI client for the %%m module > "libs\api\%%m\index.ts"
    echo // Generated from: %%BACKEND_URL%%/v3/api-docs/%%m >> "libs\api\%%m\index.ts"
    echo. >> "libs\api\%%m\index.ts"
    echo // Placeholder exports - in the real implementation, these would be the generated API client functions >> "libs\api\%%m\index.ts"
    echo export const %%m = { >> "libs\api\%%m\index.ts"
    echo   // Generated API methods would go here >> "libs\api\%%m\index.ts"
    echo   placeholder: () =^> console.log('API client for %%m module would be generated here') >> "libs\api\%%m\index.ts"
    echo }; >> "libs\api\%%m\index.ts"
    echo. >> "libs\api\%%m\index.ts"
    echo // Export all types and interfaces >> "libs\api\%%m\index.ts"
    echo export type { >> "libs\api\%%m\index.ts"
    echo   // Generated types would go here >> "libs\api\%%m\index.ts"
    echo }; >> "libs\api\%%m\index.ts"
    
    echo Generated placeholder client for %%m module
)

echo OpenAPI client generation complete!