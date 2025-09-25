#!/usr/bin/env node

import { Command } from 'commander';
import { blogCommand } from './commands/blog.js';
import { cliCommand } from './commands/cli.js';
import { composablesCommand } from './commands/composables.js';

const program = new Command();

program
  .name('aiderx')
  .version('0.0.1')
  .description('aiderx wrapper CLI for angelblanco.dev monorepo');

// Register commands
cliCommand(program);
blogCommand(program);
composablesCommand(program);

program.parse();
