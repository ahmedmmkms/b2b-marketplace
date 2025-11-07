#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$REPO_ROOT/frontend"

API_URL_BASE="${API_URL_BASE:-https://b2b-marketplace-dcd9azhpefdkdve4.canadacentral-01.azurewebsites.net}"
export API_URL_BASE

echo "Starting frontend dev server with API_URL_BASE=${API_URL_BASE}"
cd "$FRONTEND_DIR"
exec pnpm run dev
