#!/usr/bin/env node

import { Command } from 'commander';
import { Aider } from './aider.js';

const program = new Command();

program
  .name('ab-aider')
  .version('0.0.1')
  .description('@angelblanco.dev aider wrapper CLI');

program
  .command('add-histoire')
  .arguments('<component>', 'Fuzzy component name')
  .option('--prettend', 'Print the command rather than executing it')
  .action(async (component, options) => {
    const aider = new Aider();

    aider.addConvention('base.md');
    aider.addConvention('components.md');
    aider.addComponent(component, { writeStory: true, writeComponent: false, addTest: false });
    aider.setPrompt(`Add story for ${component}`);

    await aider.run(options.prettend || false);
  });

program.parse();
