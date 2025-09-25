import { Aider } from '../aider.js';
import { aiderCommand } from '../utils.js';

export function blogCommand(program) {
  aiderCommand(program, 'blog')
    .argument('<file>', 'The file in markdown to create, edit or refine')
    .description('Create a blog post')
    .action(async (file, options) => {
      // File is required, kebab case and must end with .md
      if (!file || file.length === 0 || file.toLowerCase().trim() !== file || file !== file.replace(/[^a-z0-9-]/g, '') || !file.endsWith('.md')) {
        throw new Error('File is required and must be in kebab case, lower and end with .md');
      }

      const aider = new Aider();

      aider.setAiderOptionsFromCliOptions(options);
      aider.addMonoRepoPath(`apps/angelblanco.dev/content/blog/en/${file}`, true);

      await aider.run();
    });
}
