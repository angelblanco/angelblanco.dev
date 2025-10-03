#!/bin/bash

# Clean all compiled assets and run a fresh install

pnpm cleanup || echo 'PNPM cleanup failed'

rm -rf node_modules
rm -rf .turbo

rm -rf */**/node_modules
rm -rf */**/.nuxt
rm -rf */**/.turbo
rm -rf */**/.output

pnpm install
