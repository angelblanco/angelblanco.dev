import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { listWorktrees, pruneRegistry, registryFile, removeWorktreeEntry, setupWorktree, syncEnv } from '../src/worktree/commands.ts';
import { ENV_FILES } from '../src/worktree/env.ts';
import { readRegistry } from '../src/worktree/registry.ts';

let root: string;

const alwaysFree = async () => true;

function git(cwd: string, ...args: string[]): string {
  return execFileSync('git', ['-c', 'user.name=test', '-c', 'user.email=test@example.com', ...args], { cwd, encoding: 'utf8' }).trim();
}

function setup(name: string, cwd = root) {
  return setupWorktree(name, { cwd, base: 'master', install: false, isFree: alwaysFree });
}

beforeEach(() => {
  root = realpathSync(mkdtempSync(join(tmpdir(), 'cli-worktree-')));
  git(root, 'init', '--quiet', '-b', 'master');
  writeFileSync(join(root, '.gitignore'), '**/.env\n.claude/worktrees/\n');
  git(root, 'add', '.gitignore');
  git(root, 'commit', '--quiet', '-m', 'init');
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

describe('setupWorktree', () => {
  it('creates a nested worktree on a new branch and registers its ports', async () => {
    const entry = await setup('feature-a');
    const path = join(root, '.claude/worktrees/feature-a');

    expect(entry).toMatchObject({ name: 'feature-a', branch: 'feature-a', slot: 1, ports: { dev: 3001, e2e: 4001 } });
    expect(git(path, 'branch', '--show-current')).toBe('feature-a');
    expect(readRegistry(registryFile(root)).worktrees['feature-a']).toEqual(entry);
    for (const file of ENV_FILES)
      expect(readFileSync(join(path, file), 'utf8')).toBe('NUXT_PORT=3001\nE2E_PORT=4001\n');
  });

  it('assigns incremental slots', async () => {
    expect((await setup('a')).slot).toBe(1);
    expect((await setup('b')).slot).toBe(2);
    expect((await setup('c')).slot).toBe(3);
  });

  it('is idempotent for an already registered worktree', async () => {
    const first = await setup('a');

    expect(await setup('a')).toEqual(first);
    expect(Object.keys(readRegistry(registryFile(root)).worktrees)).toEqual(['a']);
  });

  it('uses the main repository registry when run from inside a worktree', async () => {
    await setup('a');
    const entry = await setup('b', join(root, '.claude/worktrees/a'));

    expect(entry.slot).toBe(2);
    expect(existsSync(join(root, '.claude/worktrees/b'))).toBe(true);
    expect(existsSync(join(root, '.claude/worktrees/a/.claude/worktrees'))).toBe(false);
  });

  it('gives distinct slots to parallel setups', async () => {
    const entries = await Promise.all(['a', 'b', 'c', 'd'].map(name => setup(name)));

    expect(entries.map(entry => entry.slot).sort()).toEqual([1, 2, 3, 4]);
  });

  it('adopts a worktree created outside the CLI', async () => {
    git(root, 'worktree', 'add', '--quiet', '-b', 'external', join(root, '.claude/worktrees/adopted'));

    expect(await setup('adopted')).toMatchObject({ branch: 'external', slot: 1 });
  });

  it('checks out an existing branch with --branch', async () => {
    git(root, 'branch', 'feat/existing');

    expect(await setupWorktree('existing', { cwd: root, base: 'master', branch: 'feat/existing', install: false, isFree: alwaysFree }))
      .toMatchObject({ branch: 'feat/existing' });
  });

  it('rejects invalid names', async () => {
    await expect(setup('../escape')).rejects.toThrow('Invalid worktree name');
    await expect(setup('.hidden')).rejects.toThrow('Invalid worktree name');
  });

  it('refuses a folder that is not a git worktree', async () => {
    mkdirSync(join(root, '.claude/worktrees/plain'), { recursive: true });

    await expect(setup('plain')).rejects.toThrow('is not a git worktree');
    expect(readRegistry(registryFile(root)).worktrees).toEqual({});
  });
});

describe('syncEnv', () => {
  it('writes the base ports in the main checkout', () => {
    expect(syncEnv(root)).toEqual({ name: 'the main checkout', ports: { dev: 3000, e2e: 4000 } });

    for (const file of ENV_FILES)
      expect(readFileSync(join(root, file), 'utf8')).toBe('NUXT_PORT=3000\nE2E_PORT=4000\n');
  });

  it('restores the registered ports of a worktree, also from a subfolder', async () => {
    await setup('a');
    await setup('b');
    const path = join(root, '.claude/worktrees/b');
    rmSync(join(path, ENV_FILES[1]!));

    expect(syncEnv(join(path, 'packages'))).toEqual({ name: 'worktree "b"', ports: { dev: 3002, e2e: 4002 } });
    expect(readFileSync(join(path, ENV_FILES[1]!), 'utf8')).toBe('NUXT_PORT=3002\nE2E_PORT=4002\n');
  });

  it('fails in a worktree that is not registered', () => {
    git(root, 'worktree', 'add', '--quiet', '-b', 'loose', join(root, '.claude/worktrees/loose'));

    expect(() => syncEnv(join(root, '.claude/worktrees/loose'))).toThrow('is not a registered worktree');
  });
});

describe('removeWorktreeEntry', () => {
  it('removes the worktree, releases its slot and optionally deletes the branch', async () => {
    await setup('a');
    await setup('b');

    await removeWorktreeEntry('a', { cwd: root, deleteBranch: true, force: false });

    expect(existsSync(join(root, '.claude/worktrees/a'))).toBe(false);
    expect(git(root, 'branch', '--list', 'a')).toBe('');
    expect((await setup('c')).slot).toBe(1);
  });

  it('keeps a worktree with uncommitted changes unless forced', async () => {
    await setup('a');
    writeFileSync(join(root, '.claude/worktrees/a/wip.txt'), 'wip');

    await expect(removeWorktreeEntry('a', { cwd: root, deleteBranch: false, force: false })).rejects.toThrow('--force');
    expect(readRegistry(registryFile(root)).worktrees.a).toBeDefined();

    await removeWorktreeEntry('a', { cwd: root, deleteBranch: false, force: true });
    expect(readRegistry(registryFile(root)).worktrees.a).toBeUndefined();
  });

  it('fails for an unknown worktree', async () => {
    await expect(removeWorktreeEntry('nope', { cwd: root, deleteBranch: false, force: false })).rejects.toThrow('not registered');
  });
});

describe('listWorktrees and pruneRegistry', () => {
  it('reports missing folders and prunes them', async () => {
    await setup('a');
    await setup('b');
    rmSync(join(root, '.claude/worktrees/a'), { recursive: true, force: true });

    const listed = await listWorktrees(root, alwaysFree);
    expect(listed.map(({ name, exists }) => ({ name, exists }))).toEqual([{ name: 'a', exists: false }, { name: 'b', exists: true }]);

    expect(await pruneRegistry(root)).toEqual(['a']);
    expect(Object.keys(readRegistry(registryFile(root)).worktrees)).toEqual(['b']);
  });
});
