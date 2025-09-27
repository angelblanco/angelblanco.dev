import { vi } from 'vitest';

export function mockedProgram() {
  return { command: vi.fn().mockReturnThis(), description: vi.fn().mockReturnThis(), option: vi.fn().mockReturnThis(), action: vi.fn() };
}

export function mockInquirer() {
  vi.mock('inquirer');
}
