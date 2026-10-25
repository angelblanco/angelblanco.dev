import type { Ports } from './ports.ts';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { open } from 'node:fs/promises';
import { dirname } from 'node:path';
import process from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';

export interface WorktreeEntry {
  name: string;
  path: string;
  branch: string;
  slot: number;
  ports: Ports;
  createdAt: string;
}

export interface Registry {
  worktrees: Record<string, WorktreeEntry>;
}

const LOCK_TIMEOUT_MS = 10_000;
const STALE_LOCK_MS = 30_000;

export function readRegistry(file: string): Registry {
  if (!existsSync(file))
    return { worktrees: {} };

  return JSON.parse(readFileSync(file, 'utf8')) as Registry;
}

export function writeRegistry(file: string, registry: Registry): void {
  mkdirSync(dirname(file), { recursive: true });

  const tmp = `${file}.${process.pid}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(registry, null, 2)}\n`);
  renameSync(tmp, file);
}

async function acquireLock(lockFile: string): Promise<void> {
  mkdirSync(dirname(lockFile), { recursive: true });
  const deadline = Date.now() + LOCK_TIMEOUT_MS;

  while (true) {
    try {
      const handle = await open(lockFile, 'wx');
      await handle.close();
      return;
    }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
        throw error;

      const lock = statSync(lockFile, { throwIfNoEntry: false });

      if (!lock)
        continue;

      if (Date.now() - lock.mtimeMs > STALE_LOCK_MS)
        rmSync(lockFile, { force: true });
      else if (Date.now() > deadline)
        throw new Error(`Timed out waiting for registry lock: ${lockFile}`);
      else
        await sleep(50);
    }
  }
}

export async function withRegistry<T>(file: string, fn: (registry: Registry) => Promise<T> | T): Promise<T> {
  const lockFile = `${file}.lock`;
  await acquireLock(lockFile);

  try {
    const registry = readRegistry(file);
    const result = await fn(registry);
    writeRegistry(file, registry);
    return result;
  }
  finally {
    rmSync(lockFile, { force: true });
  }
}
