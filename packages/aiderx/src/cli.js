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

program.parse();
