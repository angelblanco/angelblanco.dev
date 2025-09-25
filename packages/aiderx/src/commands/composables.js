import inquirer from 'inquirer';
import { Aider } from '../aider.js';
import { aiderCommand, globbyMonoRepoSync } from '../utils.js';

export function composablesCommand(program) {
  aiderCommand(program, 'composables')
    .description('Select composables to implement tests for')
    .action(async (options) => {
      // Find all composable files
      const composableFiles = globbyMonoRepoSync('apps/angelblanco.dev/app/composables/use*.ts');

      // Find all test files to see which composables already have tests
      const testFiles = globbyMonoRepoSync('apps/angelblanco.dev/tests/composables/use*.test.ts');

      // Extract composable names
      const composableNames = composableFiles.map((file) => {
        const match = file.match(/use([A-Za-z]+)\.ts$/);
        return match ? `use${match[1]}` : null;
      }).filter(Boolean);

      // Extract tested composable names
      const testedComposableNames = testFiles.map((file) => {
        const match = file.match(/use([A-Za-z]+)\.test\.ts$/);
        return match ? `use${match[1]}` : null;
      }).filter(Boolean);

      // Filter out composables that already have tests
      const untestedComposables = composableNames.filter(name => !testedComposableNames.includes(name));

      // Prompt user to select composables
      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedComposables',
          message: 'Select composables to implement tests for:',
          choices: untestedComposables,
          validate: (answer) => {
            if (answer.length < 1) {
              return 'You must choose at least one composable.';
            }
            return true;
          },
        },
      ]);

      const aider = new Aider();
      aider.setAiderOptionsFromCliOptions(options);

      // Add selected composables and their test files
      answers.selectedComposables.forEach((composableName) => {
        // Add the composable file as read-only
        const composableFile = composableFiles.find(file => file.includes(`${composableName}.ts`));
        if (composableFile) {
          aider.addFile(composableFile, false);
        }

        // Add the test file as writable (it will be created if it doesn't exist)
        const testFile = `apps/angelblanco.dev/tests/composables/${composableName}.test.ts`;
        aider.addFile(testFile, true);
      });

      // Set the default prompt
      aider.setPrompt('Implement the tests for these composables acting as a senior vue developer that doesn\'t introduce duplication in tests who covers all edge cases. If something is badly implemented in the origin class implement tests that may fail due to bad implementation. Do not assert types, as typescript it\'s used');

      await aider.run();
    });
}
