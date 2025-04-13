import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { buildShellCommand, findUiComponent, isDirectorySync, resolveConventionPath, resolveMonoRepoPath } from './utils.js';

export class Aider {
  constructor() {
    this.readFiles = [];
    this.writeFiles = [];
    this.prompt = '';
    this.model = null;
    this.prettend = false;
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

  setAiderOptionsFromCliOptions(options) {
    this.prettend = options.prettend || false;
    this.model = options.model || null;
    this.prompt = options.prompt || '';
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
    const args = [
      '--gitignore',
      '--subtree-only',
    ];

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
      console.log(`Running command:`);
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

  addMonoRepoPath(path, writeable = null) {
    this.addFileIfExists(resolveMonoRepoPath(path), writeable);
  }

  addFileIfExists(file, writeable = false) {
    if (!existsSync(file)) {
      throw new Error(`File ${file} not found`);
    }

    if (isDirectorySync(file)) {
      throw new Error(`File ${file} is a directory and it will not be added. Use addDirectoryIfExists`);
    }

    this.addFile(file, writeable);
  }

  addDirectoryIfExists(directory, writeable = false) {
    
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
