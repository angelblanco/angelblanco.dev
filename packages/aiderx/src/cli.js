#!/usr/bin/env node

import { Command } from 'commander';
import { Aider } from './aider.js';
import { aiderCommand } from './utils.js';

const program = new Command();

program
  .name('aiderx')
  .version('0.0.1')
  .description('aiderx wrapper CLI for angelblanco.dev monorepo');

aiderCommand(program, 'cli')
  .description('Interact with aiderx cli package files')
  .action(async (options) => {
    const aider = new Aider();

    aider.setAiderOptionsFromCliOptions(options);
    aider.addConvention('aiderx.md');
    aider.addMonoRepoGlob('packages/aiderx/**/*', options.writeable);

    await aider.run();
  });

aiderCommand(program, 'blog')
  .argument('<file>', 'The file in markdown to create, edit or refine')
  .description('Create a blog post')
  .action(async (file, options) => {
    // File is required, kebab case and must end with .md
    if (!file || file.length === 0 || file.toLowerCase().trim() !== file || file !== file.replace(/[^a-z0-9-]/g, '') || !file.endsWith('.md')) {
      throw new Error('File is required and must be in kebab case, lower and end with .md');
    }

    const aider = new Aider();

    aider.setAiderOptionsFromCliOptions(options);
    aider.addMonoRepoPath(`apps/angelblanco.dev/content/blog/en/${file}`, true);

    await aider.run();
  });

program.parse();
