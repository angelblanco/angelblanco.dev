import type { Ports } from './ports.ts';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export const ENV_FILES = ['apps/angelblanco.dev/.env', 'packages/playwright/.env'];
const ROOT_ENV_FILE = '.env';
const MANAGED_KEYS = ['NUXT_PORT', 'E2E_PORT'];

function unmanagedLines(file: string): string[] {
  if (!existsSync(file))
    return [];

  return readFileSync(file, 'utf8')
    .split('\n')
    .filter(line => line.trim() && !MANAGED_KEYS.some(key => line.startsWith(`${key}=`)));
}

export function writeEnvFiles(root: string, checkoutPath: string, ports: Ports): void {
  const rootEnv = join(checkoutPath, ROOT_ENV_FILE);

  if (checkoutPath !== root && !existsSync(rootEnv) && existsSync(join(root, ROOT_ENV_FILE)))
    copyFileSync(join(root, ROOT_ENV_FILE), rootEnv);

  const [appEnv] = ENV_FILES;
  const source = existsSync(join(checkoutPath, appEnv!)) ? checkoutPath : root;
  const content = [...unmanagedLines(join(source, appEnv!)), `NUXT_PORT=${ports.dev}`, `E2E_PORT=${ports.e2e}`, ''].join('\n');

  for (const file of ENV_FILES) {
    mkdirSync(dirname(join(checkoutPath, file)), { recursive: true });
    writeFileSync(join(checkoutPath, file), content);
  }
}
