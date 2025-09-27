import { describe, expect, it } from 'vitest';
import { composablesCommand } from '../../src/commands/composables.js';
import { mockedProgram, mockInquirer } from './mocksCommands.js';

describe('composables command', () => {
  it('should be defined', () => {
    mockInquirer();
    const program = mockedProgram();
    composablesCommand(program);
    expect(program.command).toHaveBeenCalled();
  });
});
