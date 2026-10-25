#!/usr/bin/env node
import process from 'node:process';
import { Command } from 'commander';
import { listWorktrees, pruneRegistry, removeWorktreeEntry, setupWorktree } from './worktree/commands.ts';
import { guardPort } from './worktree/guard.ts';

const program = new Command('ab').description('angelblanco.dev monorepo tooling');
const worktree = program.command('worktree').description(`Manage git worktrees nested in .claude/worktrees`);

worktree
  .command('setup')
  .description('Create (or adopt) a worktree, assign free ports and install dependencies')
  .argument('<name>', 'worktree folder name, also used as branch name by default')
  .option('-b, --branch <branch>', 'branch to create or check out')
  .option('--base <ref>', 'ref the new branch starts from', 'master')
  .option('--no-install', 'skip pnpm install')
  .action(async (name: string, options: { branch?: string; base: string; install: boolean }) => {
    const entry = await setupWorktree(name, { cwd: process.cwd(), ...options });

    console.log(`\nWorktree "${entry.name}" ready at ${entry.path} (branch ${entry.branch})`);
    console.log(`  dev: http://localhost:${entry.ports.dev}`);
    console.log(`  e2e: http://localhost:${entry.ports.e2e}`);
  });

worktree
  .command('list')
  .description('List registered worktrees and their ports')
  .action(async () => {
    const worktrees = await listWorktrees(process.cwd());

    if (!worktrees.length) {
      console.log('No worktrees registered.');
      return;
    }

    console.table(worktrees.map(({ name, branch, slot, ports, exists, devInUse, e2eInUse }) => ({
      name,
      branch,
      slot,
      dev: `${ports.dev}${devInUse ? ' (running)' : ''}`,
      e2e: `${ports.e2e}${e2eInUse ? ' (running)' : ''}`,
      exists,
    })));
  });

worktree
  .command('remove')
  .description('Remove a worktree and release its ports')
  .argument('<name>', 'worktree name')
  .option('-d, --delete-branch', 'also delete its branch')
  .option('-f, --force', 'remove even with uncommitted changes and force-delete the branch')
  .action(async (name: string, options: { deleteBranch?: boolean; force?: boolean }) => {
    const entry = await removeWorktreeEntry(name, {
      cwd: process.cwd(),
      deleteBranch: !!options.deleteBranch,
      force: !!options.force,
    });

    console.log(`Removed worktree "${entry.name}" and released slot ${entry.slot}`);
  });

worktree
  .command('prune')
  .description('Drop registry entries whose worktree folder no longer exists')
  .action(async () => {
    const removed = await pruneRegistry(process.cwd());

    console.log(removed.length ? `Pruned: ${removed.join(', ')}` : 'Nothing to prune.');
  });

program
  .command('port-guard')
  .description('Fail unless the port in <key> (read from ./.env or the environment) is free')
  .argument('<key>', 'environment variable holding the port, e.g. NUXT_PORT')
  .requiredOption('--default <port>', 'port used when <key> is not set', Number)
  .action(async (key: string, options: { default: number }) => {
    await guardPort({ cwd: process.cwd(), key, fallback: options.default });
  });

try {
  await program.parseAsync();
}
catch (error) {
  console.error(`Error: ${(error as Error).message}`);
  process.exitCode = 1;
}
