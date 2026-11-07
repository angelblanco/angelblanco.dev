import type { App } from 'vue';

type SetupFunction = (app: App, storyContext: unknown) => unknown;

interface SetupGlobal {
  PLUGINS_SETUP_FUNCTIONS?: Set<SetupFunction>;
}

export function serializeNuxtApps() {
  const setups = (globalThis as SetupGlobal).PLUGINS_SETUP_FUNCTIONS;
  if (!setups)
    throw new Error('serializeNuxtApps: globalThis.PLUGINS_SETUP_FUNCTIONS is missing, check the @storybook-vue/nuxt upgrade');

  const originals = [...setups];
  let queue: Promise<unknown> = Promise.resolve();

  setups.clear();
  setups.add((app, storyContext) => {
    const run = queue.then(() => Promise.all(originals.map(setup => setup(app, storyContext))));
    queue = run.catch(() => {}).then(() => new Promise(resolve => setTimeout(resolve)));
    return run;
  });
}
