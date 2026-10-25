import type { PortChecker } from './ports.ts';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { registryFile } from './commands.ts';
import { mainRepoRoot } from './git.ts';
import { BASE_PORTS, isPortFree } from './ports.ts';
import { readRegistry } from './registry.ts';

export interface GuardOptions {
  cwd: string;
  key: string;
  fallback: number;
  isFree?: PortChecker;
}

function portOwner(root: string, port: number): string {
  if (Object.values(BASE_PORTS).includes(port))
    return 'the main checkout';

  const owner = Object.values(readRegistry(registryFile(root)).worktrees)
    .find(entry => entry.ports.dev === port || entry.ports.e2e === port);

  return owner ? `worktree "${owner.name}"` : 'no registered worktree';
}

export async function guardPort({ cwd, key, fallback, isFree = isPortFree }: GuardOptions): Promise<number> {
  const envFile = join(cwd, '.env');

  if (existsSync(envFile))
    process.loadEnvFile(envFile);

  const port = Number(process.env[key] ?? fallback);

  if (!(await isFree(port)))
    throw new Error(`Port ${port} (${key}) is already in use. It belongs to ${portOwner(mainRepoRoot(cwd), port)}.`);

  return port;
}
