import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { buildShellCommand, findUiComponent, resolveConventionPath, resolveMonoRepoPath } from './utils';

export class Aider {
  constructor() {
    this.readFiles = [];
    this.writeFiles = [];
    this.prompt = '';
  }

  /**
   * If component contains .vue extension, it must exist as it is and marked as new even if not exist.
   *
   * If no exstension is passed it will be searched and will fail if not found.
   *
   * @param {*} componentName The name of the component to be added
   */
  addComponent(componentName, opts = { writeStory: true, writeTest: true, writeComponent: true, addTest: true, addStory: true }) {
    const { file, testFile, storyFile } = findUiComponent(componentName);

    this.addFile(file, opts.writeComponent);

    if (opts.addTest !== false) {
      this.addFile(testFile, opts.writeTest);
    }

    if (opts.addStory !== false) {
      this.addFile(storyFile, opts.writeStory);
    }
  }

  addConvention(conventioName) {
    this.addFileIfExists(resolveConventionPath(conventioName), false);
  }

  setPrompt(prompt) {
    this.prompt = prompt;
  }

  getPrompt() {
    return this.prompt;
  }

  appendPrompt(prompt) {
    this.prompt += prompt;
  }

  appendPromptLine(prompt) {
    this.prompt += `${prompt}\n`;
  }

  async run(prettend = false) {
    if (this.prompt === '') {
      throw new Error('No prompt set');
    }

    const args = [
      '--message',
      this.prompt,
    ];

    this.readFiles.forEach((file) => {
      args.push('--read');
      args.push(file);
    });

    this.writeFiles.forEach((file) => {
      args.push(file);
    });

    const underlyingShellCommand = buildShellCommand('aider', args);

    if (!prettend) {
      console.log(`Running command:`);
    }

    console.log(underlyingShellCommand);

    if (prettend) {
      return;
    }

    return new Promise((resolve, reject) => {
      const child = spawn('aider', args, {
        stdio: 'inherit',
        cwd: resolveMonoRepoPath(),
      });

      child.on('error', reject);

      child.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        }
        else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });
  }

  addFileIfExists(file, writeable = false) {
    if (!existsSync(file)) {
      throw new Error(`File ${file} not found`);
    }

    this.addFile(file, writeable);
  }

  addFile(file, writeable = false) {
    if (writeable) {
      this.writeFiles.push(file);
    }
    else {
      this.readFiles.push(file);
    }
  }
}
