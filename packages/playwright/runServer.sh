#!/bin/bash
set -e

# Get the directory of the script
SCRIPT_DIR=$(dirname "$0")

# Go to the root of the repository
cd "$SCRIPT_DIR/../.."

# Run the server
npx serve apps/angelblanco.dev/.output/public
