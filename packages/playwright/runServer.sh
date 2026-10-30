#!/bin/bash
set -e

# Get the directory of the script
SCRIPT_DIR=$(dirname "$0")

# Go to the root of the repository
cd "$SCRIPT_DIR/../.."

# Build for production and then run the server. If the build has already been made turbo repo cache will hit otherwise it will build
# but we will always get the current server status.
pnpm build
npx serve apps/angelblanco.dev/.output/public --listen "${E2E_PORT:?E2E_PORT is not set, run pnpm worktree env}" --no-port-switching
