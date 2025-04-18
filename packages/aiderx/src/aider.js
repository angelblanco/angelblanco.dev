import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { buildShellCommand, findUiComponent, globbyMonoRepoSync, isDirectorySync, resolveConventionPath, resolveMonoRepoPath } from './utils.js';

export class Aider {
  constructor() {
    this.readFiles = [];
    this.writeFiles = [];
    this.prompt = '';
    this.model = null;
    this.prettend = false;
    this.debugging = false;
  }

  /**
   * If component contains .vue extension, it must exist as it is and marked as new even if not exist.
   *
   * If no exstension is passed it will be searched and will fail if not found.
   *
   * @param {*} componentName The name of the component to be added
   */
  addComponent(componentName, opts = { writeStory: true, writeTest: true, writeComponent: true, addTest: true }) {
    const { file, testFile } = findUiComponent(componentName);

    this.addFile(file, opts.writeComponent);

    if (opts.addTest !== false) {
      this.addFile(testFile, opts.writeTest);
    }
  }

  setAiderOptionsFromCliOptions(options) {
    this.prettend = options.prettend || false;
    this.model = options.model || null;
    this.prompt = options.prompt || '';
    this.debugging = options.debug || false;
  }

  addConvention(conventioName, writeable = false) {
    this.addFileIfExists(resolveConventionPath(conventioName), writeable);
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

  async run() {
    const args = [];

    if (this.model) {
      args.push(
        '--model',
        this.model,
      );
    }

    // If no prompt is passed aider will start interactively
    if (this.prompt.length > 0) {
      args.push(
        '--message',
        this.prompt,
      );
    }

    this.readFiles.forEach((file) => {
      args.push(
        '--read',
        file,
      );
    });

    this.writeFiles.forEach((file) => {
      args.push(file);
    });

    const underlyingShellCommand = buildShellCommand('aider', args);

    if (!this.prettend) {
      this.debug(`Running command:`);
    }

    console.log(underlyingShellCommand);

    if (this.prettend) {
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

  addMonoRepoPath(path, writeable = false) {
    this.addFileIfExists(resolveMonoRepoPath(path), writeable);
  }

  addMonoRepoGlob(patterns, writeable = false, globOptions = {}) {
    const files = globbyMonoRepoSync(patterns, globOptions);

    if (files.length === 0) {
      throw new Error(`No files found for pattern ${patterns}`);
    }

    files.forEach((file) => {
      this.addFile(file, writeable);
    });
  }

  addFileIfExists(file, writeable = false) {
    if (!existsSync(file)) {
      throw new Error(`File ${file} not found`);
    }

    if (isDirectorySync(file)) {
      throw new Error(`File ${file} is a directory and it will not be added. Use addMonoRepoGlob instead`);
    }

    this.addFile(file, writeable);
  }

  addFile(file, writeable = false) {
    if (writeable) {
      this.debug(`Adding file ${file} as writeable`);
      this.writeFiles.push(file);
    }
    else {
      this.debug(`Adding file ${file} as read only`);
      this.readFiles.push(file);
    }
  }

  debug(...args) {
    if (this.debugging) {
      console.log(...args);
    }
  }
}
