import type { AddressInfo } from 'node:net';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { registryFile } from '../src/worktree/commands.ts';
import { guardPort } from '../src/worktree/guard.ts';
import { writeRegistry } from '../src/worktree/registry.ts';

let root: string;

beforeEach(() => {
  root = realpathSync(mkdtempSync(join(tmpdir(), 'cli-guard-')));
  execFileSync('git', ['init', '--quiet', root]);
  delete process.env.GUARD_TEST_PORT;
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
  delete process.env.GUARD_TEST_PORT;
});

describe('guardPort', () => {
  it('returns the fallback port when the key is not set', async () => {
    expect(await guardPort({ cwd: root, key: 'GUARD_TEST_PORT', fallback: 3000, isFree: async () => true })).toBe(3000);
  });

  it('reads the port from the local .env', async () => {
    writeFileSync(join(root, '.env'), 'GUARD_TEST_PORT=3005\n');

    expect(await guardPort({ cwd: root, key: 'GUARD_TEST_PORT', fallback: 3000, isFree: async () => true })).toBe(3005);
  });

  it('names the registered owner when the port is busy', async () => {
    writeRegistry(registryFile(root), {
      worktrees: {
        other: { name: 'other', path: '.claude/worktrees/other', branch: 'other', slot: 2, ports: { dev: 3002, e2e: 4002 }, createdAt: '' },
      },
    });
    process.env.GUARD_TEST_PORT = '3002';

    await expect(guardPort({ cwd: root, key: 'GUARD_TEST_PORT', fallback: 3000, isFree: async () => false }))
      .rejects
      .toThrow('Port 3002 (GUARD_TEST_PORT) is already in use. It belongs to worktree "other".');
  });

  it('detects a real listener on the port', async () => {
    const server = createServer();
    await new Promise<void>(resolve => server.listen(0, resolve));
    process.env.GUARD_TEST_PORT = String((server.address() as AddressInfo).port);

    await expect(guardPort({ cwd: root, key: 'GUARD_TEST_PORT', fallback: 3000 })).rejects.toThrow('already in use');

    await new Promise(resolve => server.close(resolve));
  });
});
