import { describe, expect, it, vi } from 'vitest';

import { 
  resolveCliPackageRoot, 
  resolveMonoRepoPath, 
  resolvePackagePath, 
  resolveAppPath, 
  resolveConventionPath, 
  hasExtension, 
  globbyMonoRepoSync, 
  findUiComponent, 
  isDirectorySync, 
  buildShellCommand, 
  aiderCommand 
} from '../src/utils';

describe('aider utils', () => {
  it('cliRepoDir', () => {
    const dir = resolveCliPackageRoot();
    expect(dir).toBeDefined();
    expect(dir).toMatch(/packages\/aiderx$/);
  });

  it('resolveMonoRepoPath', () => {
    const path = resolveMonoRepoPath('test');
    expect(path).toBeDefined();
    expect(path).toMatch(/packages\/aiderx\/\.\.\/\.\.\/test$/);
  });

  it('resolvePackagePath', () => {
    const path = resolvePackagePath('test');
    expect(path).toBeDefined();
    expect(path).toMatch(/packages\/aiderx\/\.\.\/\.\.\/packages\/test$/);
  });

  it('resolveAppPath', () => {
    const path = resolveAppPath('test');
    expect(path).toBeDefined();
    expect(path).toMatch(/packages\/aiderx\/\.\.\/\.\.\/apps\/test$/);
  });

  it('resolveConventionPath', () => {
    const path = resolveConventionPath('test');
    expect(path).toBeDefined();
    expect(path).toMatch(/packages\/aiderx\/\.\.\/\.\.\/conventions\/test$/);
  });

  it('hasExtension', () => {
    expect(hasExtension('file.txt', '.txt')).toBe(true);
    expect(hasExtension('file.txt', '.md')).toBe(false);
  });

  it('globbyMonoRepoSync', () => {
    const files = globbyMonoRepoSync('**/*.vue');
    expect(files).toBeInstanceOf(Array);
  });

  it('findUiComponent with .vue extension', () => {
    const component = findUiComponent('UiHero.vue');
    expect(component.file).toBeDefined();
    expect(component.testFile).toBeDefined();
    expect(component.storyFile).toBeDefined();
  });

  it('findUiComponent without extension', () => {
    const component = findUiComponent('UiHero');
    expect(component.file).toBeDefined();
    expect(component.testFile).toBeDefined();
    expect(component.storyFile).toBeDefined();
  });

  it('isDirectorySync for directory', () => {
    const isDir = isDirectorySync(__dirname);
    expect(isDir).toBe(true);
  });

  it('isDirectorySync for file', () => {
    const isDir = isDirectorySync(__filename);
    expect(isDir).toBe(false);
  });

  it('buildShellCommand', () => {
    const command = buildShellCommand('aider', ['--model', 'gpt-4']);
    expect(command).toBe('aider --model "gpt-4"');
  });

  it('aiderCommand', () => {
    const program = { command: vi.fn().mockReturnThis(), option: vi.fn().mockReturnThis(), action: vi.fn() };
    aiderCommand(program, 'test-command');
    expect(program.command).toHaveBeenCalledWith('test-command');
    expect(program.option).toHaveBeenCalledTimes(5);
    expect(program.action).toHaveBeenCalledTimes(1);
  });
});
