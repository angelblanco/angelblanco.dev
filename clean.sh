#!/bin/bash

# Clean javascript files that tend to be courrupted after pnpm updates

rm -rf node_modules
rm -rf .turbo

rm -rf */**/node_modules
rm -rf */**/.nuxt
rm -rf */**/.turbo

