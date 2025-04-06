import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule } from '@nuxt/kit'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtModule(async (options, nuxt) => {
  nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: join(__dirname, 'components'),
      prefix: 'Ui',
    });
  });
});
