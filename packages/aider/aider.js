import { existsSync, globSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

export function cliRepoDir() {
  return dirname(fileURLToPath(import.meta.url));
}

export function monoRepoRootDir() {
  return resolve(cliRepoDir(), '../../');
}

export function resolvePackageFolder(packageName) {
  return resolve(monoRepoRootDir(), `packages/${packageName}`);
}

export function resolveAppFolder(appName) {
  return resolve(monoRepoRootDir(), `apps/${appName}`);
}

export function resolveConvention(conventionName) {
  return resolve(monoRepoRootDir(), `conventions/${conventionName}`);
}

export function hasExtension(fileName, extension) {
  return fileName.endsWith(extension);
}

export function findUiComponent(component) {
  let file = null;

  if (hasExtension(component, '.vue')) {
    const options = [
      resolve(resolveAppFolder(), component),
      resolve(resolvePackageFolder('ui/components'), component),
    ];

    file = options.find(file => existsSync(file));

    if (!file) {
      throw new Error(`Component ${component} not found`);
    }
  }
  else {
    const files = globSync(
      `packages/ui/components/${component}*.vue`,
      {
        cwd: monoRepoRootDir(),
        exclude: ['**/*.story.vue'],
      },
    );

    if (files.length === 0) {
      throw new Error(`Component ${component} not found in packages/ui/components`);
    }

    if (files.length > 1) {
      throw new Error(`Component ${component} found in multiple files, please be more specific: ${files.join(', ')}`);
    }

    file = files[0];
  }

  // Test file is tests/[componetnName].test.ts
  // Story file is component/[componentName].story.vue

  const testFile = file.replace(/\.vue$/, '.test.ts')
    .replace('packages/ui/components/', 'packages/ui/tests');

  const storyFile = file.replace(/\.vue$/, '.story.vue');

  return {
    file,
    testFile,
    storyFile,
  };
}

function buildShellCommand(command, args = []) {
  const escapedArgs = args.map((arg) =>
    /[^a-zA-Z0-9_/:=-]/.test(arg) ? `"${arg.replace(/(["\\$`])/g, '\\$1')}"` : arg
  );
  return [command, ...escapedArgs].join(' ');
}

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
   * @param {*} writeable Tell if the component can be edited by aider or not
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
    this.addFileIfExists(resolveConvention(conventioName), false);
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
      args.push('--read')
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
        cwd: monoRepoRootDir(),
      });
  
      child.on('error', reject);
  
      child.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });
  }
  
  addFileIfExists(file, writeable = false) {
    if (! existsSync(file)) {
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
