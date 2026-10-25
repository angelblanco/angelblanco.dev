import type { Ports } from './ports.ts';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export const APP_ENV_FILE = 'apps/angelblanco.dev/.env';
const ROOT_ENV_FILE = '.env';
const MANAGED_KEYS = ['NUXT_PORT', 'E2E_PORT'];

export function writeWorktreeEnv(root: string, worktreePath: string, ports: Ports): void {
  const rootEnv = join(worktreePath, ROOT_ENV_FILE);

  if (!existsSync(rootEnv) && existsSync(join(root, ROOT_ENV_FILE)))
    copyFileSync(join(root, ROOT_ENV_FILE), rootEnv);

  const appEnv = join(worktreePath, APP_ENV_FILE);
  const source = existsSync(appEnv) ? appEnv : join(root, APP_ENV_FILE);
  const kept = existsSync(source)
    ? readFileSync(source, 'utf8').split('\n').filter(line => line.trim() && !MANAGED_KEYS.some(key => line.startsWith(`${key}=`)))
    : [];

  mkdirSync(dirname(appEnv), { recursive: true });
  writeFileSync(appEnv, [...kept, `NUXT_PORT=${ports.dev}`, `E2E_PORT=${ports.e2e}`, ''].join('\n'));
}
