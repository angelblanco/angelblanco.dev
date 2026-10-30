import type { PortChecker, Ports } from './ports.ts';
import type { WorktreeEntry } from './registry.ts';
import { spawnSync } from 'node:child_process';
import { existsSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { writeEnvFiles } from './env.ts';
import { addWorktree, currentBranch, deleteBranch, mainRepoRoot, pruneWorktrees, removeWorktree, topLevel } from './git.ts';
import { BASE_PORTS, findFreeSlot, isPortFree, portsForSlot } from './ports.ts';
import { readRegistry, withRegistry } from './registry.ts';

export const WORKTREES_DIR = '.claude/worktrees';
const NAME_PATTERN = /^[\w-][\w.-]*$/;

export interface SetupOptions {
  cwd: string;
  base: string;
  branch?: string;
  install: boolean;
  isFree?: PortChecker;
}

export interface RemoveOptions {
  cwd: string;
  deleteBranch: boolean;
  force: boolean;
}

export interface WorktreeStatus extends WorktreeEntry {
  exists: boolean;
  devInUse: boolean;
  e2eInUse: boolean;
}

export function registryFile(root: string): string {
  return join(root, WORKTREES_DIR, 'worktrees.json');
}

function assertValidName(name: string): void {
  if (!NAME_PATTERN.test(name))
    throw new Error(`Invalid worktree name "${name}". Use letters, numbers, ".", "_" or "-".`);
}

export async function setupWorktree(name: string, options: SetupOptions): Promise<WorktreeEntry> {
  assertValidName(name);

  const root = mainRepoRoot(options.cwd);
  const relativePath = join(WORKTREES_DIR, name);
  const path = join(root, relativePath);

  const entry = await withRegistry(registryFile(root), async (registry) => {
    if (!existsSync(path))
      addWorktree(root, path, options.branch ?? name, options.base);
    else if (realpathSync(topLevel(path)) !== realpathSync(path))
      throw new Error(`${relativePath} exists but is not a git worktree`);

    const existing = registry.worktrees[name];

    if (existing)
      return existing;

    const usedSlots = new Set(Object.values(registry.worktrees).map(worktree => worktree.slot));
    const slot = await findFreeSlot(usedSlots, options.isFree);
    const created: WorktreeEntry = {
      name,
      path: relativePath,
      branch: currentBranch(path),
      slot,
      ports: portsForSlot(slot),
      createdAt: new Date().toISOString(),
    };

    registry.worktrees[name] = created;
    return created;
  });

  writeEnvFiles(root, path, entry.ports);

  if (options.install) {
    const result = spawnSync('pnpm', ['install'], { cwd: path, stdio: 'inherit' });

    if (result.status !== 0)
      throw new Error(`pnpm install failed in ${relativePath}`);
  }

  return entry;
}

export function syncEnv(cwd: string): { name: string; ports: Ports } {
  const root = realpathSync(mainRepoRoot(cwd));
  const checkout = realpathSync(topLevel(cwd));

  if (checkout === root) {
    writeEnvFiles(root, root, BASE_PORTS);
    return { name: 'the main checkout', ports: BASE_PORTS };
  }

  const entry = Object.values(readRegistry(registryFile(root)).worktrees)
    .find(worktree => existsSync(join(root, worktree.path)) && realpathSync(join(root, worktree.path)) === checkout);

  if (!entry)
    throw new Error(`${checkout} is not a registered worktree. Run \`pnpm worktree setup <name>\` from the main checkout.`);

  writeEnvFiles(root, checkout, entry.ports);
  return { name: `worktree "${entry.name}"`, ports: entry.ports };
}

export async function listWorktrees(cwd: string, isFree: PortChecker = isPortFree): Promise<WorktreeStatus[]> {
  const root = mainRepoRoot(cwd);
  const entries = Object.values(readRegistry(registryFile(root)).worktrees).sort((a, b) => a.slot - b.slot);

  return Promise.all(entries.map(async entry => ({
    ...entry,
    exists: existsSync(join(root, entry.path)),
    devInUse: !(await isFree(entry.ports.dev)),
    e2eInUse: !(await isFree(entry.ports.e2e)),
  })));
}

export async function removeWorktreeEntry(name: string, options: RemoveOptions): Promise<WorktreeEntry> {
  const root = mainRepoRoot(options.cwd);

  const entry = await withRegistry(registryFile(root), (registry) => {
    const existing = registry.worktrees[name];

    if (!existing)
      throw new Error(`Worktree "${name}" is not registered`);

    if (existsSync(join(root, existing.path)))
      removeWorktree(root, join(root, existing.path), options.force);

    delete registry.worktrees[name];
    return existing;
  });

  if (options.deleteBranch)
    deleteBranch(root, entry.branch, options.force);

  return entry;
}

export async function pruneRegistry(cwd: string): Promise<string[]> {
  const root = mainRepoRoot(cwd);
  pruneWorktrees(root);

  return withRegistry(registryFile(root), (registry) => {
    const stale = Object.values(registry.worktrees).filter(entry => !existsSync(join(root, entry.path)));

    for (const entry of stale)
      delete registry.worktrees[entry.name];

    return stale.map(entry => entry.name);
  });
}
