import { describe, expect, it, vi } from 'vitest';

import {
  aiderCommand,
  buildShellCommand,
  findUiComponent,
  globbyMonoRepoSync,
  hasExtension,
  isDirectorySync,
  resolveAppsPath,
  resolveCliPackageRoot,
  resolveConventionPath,
  resolveMonoRepoPath,
  resolvePackagePath,
} from '../src/utils.js';

describe('aider utils', () => {
  it('cliRepoDir', () => {
    const dir = resolveCliPackageRoot();
    expect(dir).toBeDefined();
    expect(dir).toMatch(/packages\/aiderx$/);
  });

  it('resolveMonoRepoPath', () => {
    const path = resolveMonoRepoPath('packages/foo');
    expect(path).toBeDefined();
    expect(path).toMatch(/packages\/foo$/);
  });

  it('resolvePackagePath', () => {
    const path = resolvePackagePath('test');
    expect(path).toBeDefined();
    expect(path).toBe(
      resolveMonoRepoPath('packages/test'),
    );
  });

  it('resolveAppsPath', () => {
    const path = resolveAppsPath('www');
    expect(path).toBeDefined();
    expect(path).toMatch(/apps\/www$/);
  });

  it('resolveConventionPath', () => {
    const path = resolveConventionPath('test.md');
    expect(path).toBeDefined();
    expect(path).toMatch(/conventions\/test.md$/);
  });

  it('hasExtension', () => {
    expect(hasExtension('file.txt', '.txt')).toBe(true);
    expect(hasExtension('file.txt', '.md')).toBe(false);
  });

  it('globbyMonoRepoSync', () => {
    const files = globbyMonoRepoSync('packages/aiderx/**/*.js');
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBeGreaterThan(0);
  });

  it('findUiComponent with .vue extension', () => {
    const component = findUiComponent('UiHero.vue');
    expect(component.file).toBeDefined();
    expect(component.testFile).toBeDefined();
  });

  it('findUiComponent without extension', () => {
    const component = findUiComponent('UiHero');
    expect(component.file).toBeDefined();
    expect(component.testFile).toBeDefined();
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
    expect(command).toBe('aider --model gpt-4');
  });

  it('aiderCommand', () => {
    const program = { command: vi.fn().mockReturnThis(), option: vi.fn().mockReturnThis(), action: vi.fn() };
    aiderCommand(program, 'test-command');
    expect(program.command).toHaveBeenCalledWith('test-command');
    expect(program.option).toHaveBeenCalled();
  });
});
