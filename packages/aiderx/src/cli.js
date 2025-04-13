#!/usr/bin/env node

import { Command } from 'commander';
import { Aider } from './aider.js';
import { aiderCommand } from './utils.js';

const program = new Command();

program
  .name('aiderx')
  .version('0.0.1')
  .description('aiderx wrapper CLI for angelblanco.dev monorepo');

aiderCommand(program, 'add-histoire')
  .description('Add histoire to a component in packages/ui')
  .arguments('<component>', 'Fuzzy component name')
  .action(async (component, options) => {
    const aider = new Aider();

    aider.setAiderOptionsFromCliOptions(options);
    aider.addConvention('base.md');
    aider.addConvention('components.md');
    aider.addComponent(component, { writeStory: true, writeComponent: false, addTest: false });
    aider.setPrompt(`Add story for ${component} use the variants if needed`);

    await aider.run();
  });

aiderCommand(program, 'cli')
  .description('Interact with aiderx cli package adding it completely interactively')
  .action(async (options) => {
    const aider = new Aider();

    aider.setAiderOptionsFromCliOptions(options);
    aider.addConvention('aiderx.md');
    aider.addMonoRepoPath('packages/aiderx', options.writeable);

    await aider.run();
  });

program.parse();
