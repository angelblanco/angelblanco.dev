import { execFileSync } from 'node:child_process';
import { dirname } from 'node:path';

function git(cwd: string, args: string[]): string {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

export function mainRepoRoot(cwd: string): string {
  return dirname(git(cwd, ['rev-parse', '--path-format=absolute', '--git-common-dir']));
}

export function topLevel(path: string): string {
  return git(path, ['rev-parse', '--show-toplevel']);
}

export function branchExists(root: string, branch: string): boolean {
  try {
    git(root, ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`]);
    return true;
  }
  catch {
    return false;
  }
}

export function currentBranch(path: string): string {
  return git(path, ['branch', '--show-current']);
}

export function addWorktree(root: string, path: string, branch: string, base: string): void {
  const args = branchExists(root, branch)
    ? ['worktree', 'add', path, branch]
    : ['worktree', 'add', '-b', branch, path, base];

  git(root, args);
}

export function removeWorktree(root: string, path: string, force: boolean): void {
  git(root, ['worktree', 'remove', ...(force ? ['--force'] : []), path]);
}

export function deleteBranch(root: string, branch: string, force: boolean): void {
  git(root, ['branch', force ? '-D' : '-d', branch]);
}

export function pruneWorktrees(root: string): void {
  git(root, ['worktree', 'prune']);
}
