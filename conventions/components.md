# General guidelines

- Shared components must be placed in `packages/ui/components`.
- A histoire component with the suffix `.story.vue` must be included for every component in `packages/ui/components`. The story must include all variants.
- A `vitest` test must be inlcuded in `packages/ui/tests` with the suffix `.test.ts`.
- Example structure
- `packages/ui/`
  - `components`
    - `Button.vue`
    - `Button.story.vue`
  - `tests`
    - `Button.tests.ts`
- Use `@heroicons/vue` library for icons. Custom vue components with SVG are also allowed if the icon is missing.

### Testing

- Run components test

```bash
pnpm run test --filter @packages/@angelblanco/ui
```

- Example component:

```ts
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Button from '../components/Button.vue';

describe('Button', () => {
  it('is defined', () => {
    const wrapper = mount(Button);
    expect(wrapper).toBeDefined();
  });

  // More tests
});
```

### Example story without variants

```vue
<template>
  <Story title="MyStory">
    <MyComponent />
  </Story>
</template>

<script lang="ts" setup>
import MyComponent from './MyComponent.vue';
</script>
```

### Example story with variants

```vue
<template>
  <Story title="MyStory">
    <Variant title="MyVariant 1">
      <MyComponent argument="hello" />
    </Variant>
    <Variant title="MyVariant 2">
      <MyComponent argument="world" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import MyComponent from './MyComponent.vue';
</script>
```

## Icons

```vue
<template>
  <div>
    <BeakerIcon class="size-6 text-blue-500" />
    <p>...</p>
  </div>
</template>

<script setup lang="ts">
import { BeakerIcon } from '@heroicons/vue/24/solid';
</script>
```
