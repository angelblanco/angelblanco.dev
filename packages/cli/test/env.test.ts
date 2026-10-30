import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ENV_FILES, writeEnvFiles } from '../src/worktree/env.ts';

let root: string;
let worktree: string;

function write(base: string, file: string, content: string): void {
  mkdirSync(dirname(join(base, file)), { recursive: true });
  writeFileSync(join(base, file), content);
}

function read(base: string, file: string): string {
  return readFileSync(join(base, file), 'utf8');
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'cli-env-'));
  worktree = join(root, '.claude/worktrees/foo');
  mkdirSync(worktree, { recursive: true });
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

describe('writeEnvFiles', () => {
  it('writes the same ports to the app and playwright .env files', () => {
    writeEnvFiles(root, worktree, { dev: 3001, e2e: 4001 });

    for (const file of ENV_FILES)
      expect(read(worktree, file)).toBe('NUXT_PORT=3001\nE2E_PORT=4001\n');
  });

  it('inherits the main checkout app .env without its port keys', () => {
    write(root, ENV_FILES[0]!, 'SECRET=abc\nNUXT_PORT=3000\n');

    writeEnvFiles(root, worktree, { dev: 3002, e2e: 4002 });

    for (const file of ENV_FILES)
      expect(read(worktree, file)).toBe('SECRET=abc\nNUXT_PORT=3002\nE2E_PORT=4002\n');
  });

  it('keeps the checkout own values, replaces its ports and resyncs the playwright copy', () => {
    write(worktree, ENV_FILES[0]!, 'LOCAL=1\nNUXT_PORT=3009\nE2E_PORT=4009\n');
    write(worktree, ENV_FILES[1]!, 'STALE=1\n');

    writeEnvFiles(root, worktree, { dev: 3003, e2e: 4003 });

    for (const file of ENV_FILES)
      expect(read(worktree, file)).toBe('LOCAL=1\nNUXT_PORT=3003\nE2E_PORT=4003\n');
  });

  it('copies the root .env into a worktree only when it has none', () => {
    write(root, '.env', 'NUXT_OG_IMAGE_SECRET=main\n');
    writeEnvFiles(root, worktree, { dev: 3001, e2e: 4001 });
    expect(read(worktree, '.env')).toBe('NUXT_OG_IMAGE_SECRET=main\n');

    write(worktree, '.env', 'NUXT_OG_IMAGE_SECRET=local\n');
    writeEnvFiles(root, worktree, { dev: 3001, e2e: 4001 });
    expect(read(worktree, '.env')).toBe('NUXT_OG_IMAGE_SECRET=local\n');
  });

  it('writes the main checkout files in place', () => {
    write(root, '.env', 'NUXT_OG_IMAGE_SECRET=main\n');

    writeEnvFiles(root, root, { dev: 3000, e2e: 4000 });

    expect(read(root, '.env')).toBe('NUXT_OG_IMAGE_SECRET=main\n');
    for (const file of ENV_FILES)
      expect(read(root, file)).toBe('NUXT_PORT=3000\nE2E_PORT=4000\n');
  });
});
