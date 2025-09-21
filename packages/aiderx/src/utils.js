import { existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globbySync } from 'globby';

export function resolveCliPackageRoot(...paths) {
  return resolve(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    ...paths,
  );
}

export function resolveMonoRepoPath(...paths) {
  return resolveCliPackageRoot('../../', ...paths);
}

export function resolvePackagePath(...paths) {
  return resolveMonoRepoPath('packages', ...paths);
}

export function resolveAppsPath(...paths) {
  return resolveMonoRepoPath('apps', ...paths);
}

export function resolveMainAppPath(...paths) {
  return resolveAppsPath('angelblanco.dev', ...paths);
}

export function resolveConventionPath(...paths) {
  return resolvePackagePath('conventions', ...paths);
}

export function hasExtension(fileName, extension) {
  return fileName.endsWith(extension);
}

export function globbyMonoRepoSync(patterns, options = {}) {
  const defaultOptions = {
    cwd: resolveMonoRepoPath(),
    gitignore: true,
    ignoreFiles: ['**/.gitignore', '**/.aiderignore'],
    absolute: true,
  };

  return globbySync(patterns, { ...defaultOptions, ...options });
}

export function findUiComponent(component) {
  let file = null;

  if (hasExtension(component, '.vue')) {
    const options = [
      // Relative or absolute path to component
      resolveMonoRepoPath(component),
      // Base pasth on angelblanco.dev app
      resolveMainAppPath('components', component),
    ];

    file = options.find(file => existsSync(file));

    if (!file) {
      throw new Error(`Component ${component} not found`);
    }
  }
  else {
    const files = globbyMonoRepoSync(
      `apps/angelblanco.dev/components/${component}*.vue`,
      {
        ignore: ['**/*.story.vue'],
      },
    );

    if (files.length === 0) {
      throw new Error(`Component ${component} not found in apps/angelblanco.dev/components`);
    }

    if (files.length > 1) {
      throw new Error(`Component ${component} found in multiple files, please be more specific: ${files.join(', ')}`);
    }

    file = files[0];
  }

  // Test file is tests/[component].test.ts
  const testFile = file.replace(/\.vue$/, '.test.ts')
    .replace('apps/angelblanco.dev/components/', 'apps/angelblanco.dev/tests/components');

  // Story file is component/[component].story.vue
  // const storyFile = file.replace(/\.vue$/, '.story.vue');

  return {
    file,
    testFile,
    // storyFile,
  };
}

export function isDirectorySync(path) {
  const stats = statSync(path);
  return stats.isDirectory();
}

export function buildShellCommand(command, args = []) {
  const escapedArgs = args.map(arg =>
    /[^\w/:=-]/.test(arg) ? `"${arg.replace(/(["\\$`])/g, '\\$1')}"` : arg,
  );
  return [command, ...escapedArgs].join(' ');
}

export function aiderCommand(program, command) {
  return program
    .command(command)
    .option('--prettend', 'Print the command rather than executing it')
    .option('--model <model>', 'Model to use')
    .option('--writable', 'Files are added as writeable by default')
    .option('--debug', 'Debug mode')
    .option('--prompt <prompt>', 'Prompt to use');
}
