import { Aider } from '../aider.js';
import { aiderCommand } from '../utils.js';

export function cliCommand(program) {
  aiderCommand(program, 'cli')
    .description('Interact with aiderx cli package files')
    .action(async (options) => {
      const aider = new Aider();

      aider.setAiderOptionsFromCliOptions(options);
      aider.addConvention('aiderx.md');
      aider.addMonoRepoGlob('packages/aiderx/**/*', true);

      await aider.run();
    });
}
