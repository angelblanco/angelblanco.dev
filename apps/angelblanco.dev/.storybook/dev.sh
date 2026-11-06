#!/bin/sh
set -e

cd "$(dirname "$0")/.."

env_value() {
  sed -n "s/^$1=//p" .env 2>/dev/null | tail -n 1 | tr -d "\"'\r"
}

STORYBOOK_PORT="${STORYBOOK_PORT:-$(env_value STORYBOOK_PORT)}"
NUXT_PORT="${NUXT_PORT:-$(env_value NUXT_PORT)}"

if [ -z "$STORYBOOK_PORT" ]; then
  STORYBOOK_PORT="$((${NUXT_PORT:?NUXT_PORT is not set, run pnpm worktree env} + 3006))"
fi

exec storybook dev --port "$STORYBOOK_PORT" --exact-port --no-open "$@"
