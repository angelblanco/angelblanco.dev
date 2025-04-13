import { existsSync, globSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

export function resolveAppPath(...paths) {
  return resolveMonoRepoPath('apps', ...paths);
}

export function resolveConventionPath(...paths) {
  return resolveMonoRepoPath('conventions', ...paths);
}

export function hasExtension(fileName, extension) {
  return fileName.endsWith(extension);
}

export function findUiComponent(component) {
  let file = null;

  if (hasExtension(component, '.vue')) {
    const options = [
      resolveAppPath(component),
      resolvePackagePath('ui', 'components', component),
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
        cwd: resolveMonoRepoPath(),
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

export function buildShellCommand(command, args = []) {
  const escapedArgs = args.map(arg =>
    /[^\w/:=-]/.test(arg) ? `"${arg.replace(/(["\\$`])/g, '\\$1')}"` : arg,
  );
  return [command, ...escapedArgs].join(' ');
}
