import { describe, expect, it, vi } from 'vitest';
import inquirer from 'inquirer';
import { composablesCommand } from '../../src/commands/composables.js';

// Mock inquirer
vi.mock('inquirer');

describe('composables command', () => {
  it('should be defined', () => {
    const program = { command: vi.fn().mockReturnThis(), option: vi.fn().mockReturnThis(), action: vi.fn() };
    composablesCommand(program);
    expect(program.command).toHaveBeenCalled();
  });
});
