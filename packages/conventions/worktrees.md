# Git Worktree Conventions

This document explains how to work on several branches of the monorepo at the same time using git worktrees, without port or cache conflicts between them.

## TL;DR

```bash
pnpm worktree setup my-feature          # create .claude/worktrees/my-feature on a new branch from master
cd .claude/worktrees/my-feature
pnpm dev                                # http://localhost:<dev port of the worktree>
pnpm worktree list                      # every worktree, its branch and ports
pnpm worktree remove my-feature -d      # delete the worktree and its branch, release its ports
```

## Rules

1. **Always create worktrees with `pnpm worktree setup`.** Never run `git worktree add` by hand. If a worktree was created another way (for example by a coding agent), run `pnpm worktree setup <name>` on it to register it.
2. **Worktrees live in `.claude/worktrees/<name>`.** The folder is git-ignored, so worktrees are never committed, linted or picked up by the main checkout.
3. **Each worktree owns its ports.** Never hardcode ports or override `NUXT_PORT`/`E2E_PORT` manually; the registry assigns them.
4. **Remove worktrees with `pnpm worktree remove`.** Deleting the folder by hand leaves a stale registry entry; clean it with `pnpm worktree prune`.

## How it works

The tooling lives in [`packages/cli`](../cli) and runs TypeScript directly with Node (no build step).

### Registry

`.claude/worktrees/worktrees.json` stores every worktree created from the main checkout:

```json
{
  "worktrees": {
    "my-feature": {
      "name": "my-feature",
      "path": ".claude/worktrees/my-feature",
      "branch": "my-feature",
      "slot": 1,
      "ports": { "dev": 3001, "e2e": 4001 },
      "createdAt": "2026-10-25T12:00:00.000Z"
    }
  }
}
```

- The registry always belongs to the **main checkout**, even when the command runs inside a worktree, so worktrees are never nested inside other worktrees.
- Writes are protected by a lock file, so parallel `setup` commands never get the same slot.

### Ports

Each worktree gets an incremental **slot** `N`:

| Checkout        | Slot | Dev (`pnpm dev`) | E2E (Playwright) |
| --------------- | ---- | ---------------- | ---------------- |
| Main            | 0    | 3000             | 4000             |
| First worktree  | 1    | 3001             | 4001             |
| Second worktree | 2    | 3002             | 4002             |

- `setup` picks the lowest slot that is not registered and whose two ports are free right now.
- Slots released by `remove` are reused.
- The ports are written to `apps/angelblanco.dev/.env` of the worktree (`NUXT_PORT`, `E2E_PORT`). Nuxt reads that file natively and the Playwright config loads it.

### Conflict protection

- **Dev server:** `pnpm dev` runs `port-guard` before `nuxt dev --strictPort`. If the port is taken it fails and names its owner, e.g. `Port 3001 (NUXT_PORT) is already in use. It belongs to worktree "my-feature".` The guard is needed because Nuxt binds with `SO_REUSEPORT`, so `--strictPort` alone would let two servers share a port silently, and without it Nuxt jumps to a port owned by another worktree.
- **E2E server:** `runServer.sh` serves the build with `serve --no-port-switching`, so it fails instead of moving to another port.

### Environment files

- `setup` copies the root `.env` of the main checkout into the worktree if the worktree has none.
- `apps/angelblanco.dev/.env` keeps any existing values and only rewrites `NUXT_PORT` and `E2E_PORT`. Running `setup` again regenerates them if they are lost.

### Caches

`node_modules`, `.turbo`, `.nuxt`, `.output` and `.cache` (og-images) live inside each worktree. `pnpm install` is fast because the pnpm store is shared through hard links, but the first build of a new worktree regenerates the og-images.

## Commands

| Command                       | Description                                                                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm worktree setup <name>`  | Create the worktree on branch `<name>` from `master` (or adopt an existing one), assign its ports, write its `.env` and run `pnpm install`. Safe to run again. |
| `--branch <branch>`           | Use another branch name, e.g. `feat/blog-search`. Existing branches are checked out.                                                                           |
| `--base <ref>`                | Start the new branch from another ref instead of `master`.                                                                                                     |
| `--no-install`                | Skip `pnpm install`.                                                                                                                                           |
| `pnpm worktree list`          | Show every worktree with its branch, ports, whether they are running and whether its folder still exists.                                                      |
| `pnpm worktree remove <name>` | Remove the worktree and release its slot. Fails if it has uncommitted changes.                                                                                 |
| `-d, --delete-branch`         | Also delete its branch (only if merged).                                                                                                                       |
| `-f, --force`                 | Remove even with uncommitted changes and force-delete the branch.                                                                                              |
| `pnpm worktree prune`         | Drop registry entries whose folder no longer exists.                                                                                                           |
