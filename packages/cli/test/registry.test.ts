import type { Registry } from '../src/worktree/registry.ts';
import { existsSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readRegistry, withRegistry, writeRegistry } from '../src/worktree/registry.ts';

let dir: string;
let file: string;

function entry(name: string, slot: number) {
  return {
    name,
    path: `.claude/worktrees/${name}`,
    branch: name,
    slot,
    ports: { dev: 3000 + slot, e2e: 4000 + slot },
    createdAt: '2026-10-25T00:00:00.000Z',
  };
}

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'cli-registry-'));
  file = join(dir, 'nested', 'worktrees.json');
});

afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe('registry', () => {
  it('reads an empty registry when the file does not exist', () => {
    expect(readRegistry(file)).toEqual({ worktrees: {} });
  });

  it('round-trips through disk, creating parent folders', () => {
    const registry: Registry = { worktrees: { foo: entry('foo', 1) } };
    writeRegistry(file, registry);

    expect(readRegistry(file)).toEqual(registry);
  });

  it('persists changes and releases the lock', async () => {
    await withRegistry(file, (registry) => {
      registry.worktrees.foo = entry('foo', 1);
    });

    expect(readRegistry(file).worktrees.foo?.slot).toBe(1);
    expect(existsSync(`${file}.lock`)).toBe(false);
  });

  it('does not persist and releases the lock when the callback throws', async () => {
    await expect(withRegistry(file, (registry) => {
      registry.worktrees.foo = entry('foo', 1);
      throw new Error('boom');
    })).rejects.toThrow('boom');

    expect(readRegistry(file)).toEqual({ worktrees: {} });
    expect(existsSync(`${file}.lock`)).toBe(false);
  });

  it('serializes concurrent writers', async () => {
    await Promise.all(Array.from({ length: 10 }, (_, index) => withRegistry(file, async (registry) => {
      const slot = Object.keys(registry.worktrees).length + 1;
      await new Promise(resolve => setTimeout(resolve, 5));
      registry.worktrees[`wt-${index}`] = entry(`wt-${index}`, slot);
    })));

    const slots = Object.values(readRegistry(file).worktrees).map(worktree => worktree.slot).sort((a, b) => a - b);

    expect(slots).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('breaks a stale lock left by a crashed process', async () => {
    writeRegistry(file, { worktrees: {} });
    writeFileSync(`${file}.lock`, '');
    const old = new Date(Date.now() - 60_000);
    utimesSync(`${file}.lock`, old, old);

    await withRegistry(file, (registry) => {
      registry.worktrees.foo = entry('foo', 1);
    });

    expect(readRegistry(file).worktrees.foo).toBeDefined();
  });
});
