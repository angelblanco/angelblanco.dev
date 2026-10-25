import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { APP_ENV_FILE, writeWorktreeEnv } from '../src/worktree/env.ts';

let root: string;
let worktree: string;

function write(base: string, file: string, content: string): void {
  mkdirSync(dirname(join(base, file)), { recursive: true });
  writeFileSync(join(base, file), content);
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'cli-env-'));
  worktree = join(root, '.claude/worktrees/foo');
  mkdirSync(join(worktree, dirname(APP_ENV_FILE)), { recursive: true });
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

describe('writeWorktreeEnv', () => {
  it('writes the worktree ports to the app .env', () => {
    writeWorktreeEnv(root, worktree, { dev: 3001, e2e: 4001 });

    expect(readFileSync(join(worktree, APP_ENV_FILE), 'utf8')).toBe('NUXT_PORT=3001\nE2E_PORT=4001\n');
  });

  it('inherits the main checkout app .env without its port keys', () => {
    write(root, APP_ENV_FILE, 'SECRET=abc\nNUXT_PORT=3000\n');

    writeWorktreeEnv(root, worktree, { dev: 3002, e2e: 4002 });

    expect(readFileSync(join(worktree, APP_ENV_FILE), 'utf8')).toBe('SECRET=abc\nNUXT_PORT=3002\nE2E_PORT=4002\n');
  });

  it('keeps the worktree own values and replaces its ports on rerun', () => {
    write(worktree, APP_ENV_FILE, 'LOCAL=1\nNUXT_PORT=3009\nE2E_PORT=4009\n');

    writeWorktreeEnv(root, worktree, { dev: 3003, e2e: 4003 });

    expect(readFileSync(join(worktree, APP_ENV_FILE), 'utf8')).toBe('LOCAL=1\nNUXT_PORT=3003\nE2E_PORT=4003\n');
  });

  it('copies the root .env only when the worktree has none', () => {
    write(root, '.env', 'NUXT_OG_IMAGE_SECRET=main\n');
    writeWorktreeEnv(root, worktree, { dev: 3001, e2e: 4001 });
    expect(readFileSync(join(worktree, '.env'), 'utf8')).toBe('NUXT_OG_IMAGE_SECRET=main\n');

    write(worktree, '.env', 'NUXT_OG_IMAGE_SECRET=local\n');
    writeWorktreeEnv(root, worktree, { dev: 3001, e2e: 4001 });
    expect(readFileSync(join(worktree, '.env'), 'utf8')).toBe('NUXT_OG_IMAGE_SECRET=local\n');
  });
});
