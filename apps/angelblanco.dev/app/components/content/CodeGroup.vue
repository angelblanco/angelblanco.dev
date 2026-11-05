<template>
  <div data-code-group class="mb-4 overflow-hidden rounded border border-base-content/10 bg-base-100">
    <div
      role="tablist"
      :aria-label="t('codeGroupLabel')"
      class="flex overflow-x-auto border-b border-base-content/10 bg-base-200"
      @keydown="onKeydown"
    >
      <button
        v-for="(tab, index) in tabs"
        :id="`${id}-tab-${index}`"
        :key="tab.label"
        type="button"
        role="tab"
        :aria-selected="index === selected"
        :aria-controls="`${id}-panel-${index}`"
        :tabindex="index === selected ? 0 : -1"
        class="-mb-px flex flex-none items-center gap-2 border-b-2 px-4 py-3 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        :class="index === selected
          ? 'border-primary text-base-content'
          : 'border-transparent text-base-content/60 hover:text-base-content'"
        @click="selected = index"
      >
        <Icon v-if="tab.icon" :name="tab.icon" class="size-4" aria-hidden="true" />
        {{ tab.label }}
      </button>
    </div>

    <div
      v-for="(tab, index) in tabs"
      v-show="index === selected"
      :id="`${id}-panel-${index}`"
      :key="tab.label"
      role="tabpanel"
      :aria-labelledby="`${id}-tab-${index}`"
    >
      <component :is="tab.vnode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from 'vue';

const slots = defineSlots<{ default?: () => VNode[] }>();
const { t } = useI18n();
const id = useId();

const selected = ref(0);

const tabs = computed(() => codeGroupTabs(slots.default?.() ?? []));

function select(index: number) {
  const count = tabs.value.length;
  selected.value = (index + count) % count;
  document.getElementById(`${id}-tab-${selected.value}`)?.focus();
}

function onKeydown(event: KeyboardEvent) {
  const actions: Partial<Record<string, () => void>> = {
    ArrowRight: () => select(selected.value + 1),
    ArrowLeft: () => select(selected.value - 1),
    Home: () => select(0),
    End: () => select(tabs.value.length - 1),
  };

  const action = actions[event.key];
  if (!action)
    return;

  event.preventDefault();
  action();
}
</script>

<style scoped>
[data-code-group] :deep([data-code-block]) {
  margin: 0;
  border: 0;
  border-radius: 0;
}
</style>
