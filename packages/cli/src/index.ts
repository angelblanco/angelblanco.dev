#!/usr/bin/env node
import process from 'node:process';
import { Command } from 'commander';
import { checkUrls } from './blog/links.ts';
import { allSlugs, changedSlugs, checkSlugs, resolveSlug } from './blog/posts.ts';
import { listWorktrees, pruneRegistry, removeWorktreeEntry, setupWorktree, syncEnv } from './worktree/commands.ts';
import { topLevel } from './worktree/git.ts';

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
    const entry = await setupWorktree(name, {
      cwd: process.cwd(),
      ...options,
    });

    console.log(`\nWorktree "${entry.name}" ready at ${entry.path} (branch ${entry.branch})`);
    console.log(`  dev: http://localhost:${entry.ports.dev}`);
    console.log(`  e2e: http://localhost:${entry.ports.e2e}`);
  });

worktree
  .command('env')
  .description('Write the .env files of the current checkout (main or registered worktree)')
  .action(() => {
    const { name, ports } = syncEnv(process.cwd());

    console.log(`Wrote .env files for ${name}: NUXT_PORT=${ports.dev} E2E_PORT=${ports.e2e}`);
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

    console.log(removed.length
      ? `Pruned: ${removed.join(', ')}`
      : 'Nothing to prune.');
  });

const blog = program.command('blog').description('Blog post tooling');

blog
  .command('check')
  .description('Validate bilingual blog posts: frontmatter, EN/ES parity, headings, code fences, links and automd')
  .argument('[posts...]', 'post slugs or paths (default: posts changed against master)')
  .option('-a, --all', 'check every post')
  .option('-l, --links', 'also request every external link')
  .action(async (inputs: string[], options: { all?: boolean; links?: boolean }) => {
    const root = topLevel(process.cwd());
    const slugs = options.all
      ? allSlugs(root)
      : inputs.length
        ? inputs.map(input => resolveSlug(root, input))
        : changedSlugs(root);

    if (!slugs.length) {
      console.log('No blog posts changed against master. Pass slugs or --all.');
      return;
    }

    const { posts, issues } = checkSlugs(root, [
      ...new Set(slugs),
    ]);

    if (options.links) {
      const lines = new Map<string, string>();

      for (const post of posts) {
        for (const link of post.links) {
          if (/^https?:\/\//.test(link.url) && !lines.has(link.url))
            lines.set(link.url, `${post.file}:${link.line}`);
        }
      }

      for (const result of await checkUrls([
        ...lines.keys(),
      ])) {
        const [file, line] = lines.get(result.url)!.split(':');
        const issue = {
          file: file!,
          line: Number(line),
        };

        if (result.error)
          issues.push({ ...issue, level: 'error', message: `${result.url} failed: ${result.error}` });
        else if (result.status === 403 || result.status === 429)
          issues.push({ ...issue, level: 'warn', message: `${result.url} returned ${result.status}, it may block automated requests: open it in a browser` });
        else if (result.status! >= 400)
          issues.push({ ...issue, level: 'error', message: `${result.url} returned ${result.status}` });
        else if (result.finalUrl)
          issues.push({ ...issue, level: 'warn', message: `${result.url} redirects to ${result.finalUrl}` });
      }
    }

    issues.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

    for (const issue of issues) {
      console.log(`${issue.level === 'error'
        ? 'ERROR'
        : 'WARN '} ${issue.file}:${issue.line} ${issue.message}`);
    }

    const errors = issues.filter(issue => issue.level === 'error').length;

    console.log(`\nChecked ${slugs.length} post(s): ${errors} error(s), ${issues.length - errors} warning(s).`);

    if (errors)
      process.exitCode = 1;
  });

try {
  await program.parseAsync();
}
catch (error) {
  console.error(`Error: ${(error as Error).message}`);
  process.exitCode = 1;
}
