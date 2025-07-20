<template>
  <div class="border overflow-hidden bg-base-100 border-base-content/10 text-base-content mb-4">
    <!-- Header -->
    <div
      class="flex items-center justify-between px-4 py-2 bg-base-200 border-b border-base-content/10 text-sm font-medium"
    >
      <div class="flex flex-col">
        <span v-if="filename">{{ filename }}</span>
        <span v-if="language" class="text-xs text-base-content/60">{{ language }}</span>
      </div>

      <!-- Copy Button -->
      <button
        v-if="isCopyable" class="btn btn-square btn-ghost flex items-center gap-1" :class="{
          'btn-success': copiedState === 'success',
          'btn-error': copiedState === 'error',
        }" @click="doCopy"
      >
        <Icon
          :name="copiedState === 'success' ? 'heroicons-outline:check' : 'heroicons-outline:clipboard'"
          class="size-4"
        />
      </button>
    </div>

    <pre :class="cls" class="p-4! m-0!"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

interface CodeBlockProps {
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: number[];
  meta?: string | null;
  class?: string | null;
}

const props = defineProps<CodeBlockProps>();

const cls = computed(() => props.class ?? '');
const codeText = computed(() => props.code ?? '');

const isCopyable = computed(() => !!codeText.value?.trim());
const copiedState = ref<'idle' | 'success' | 'error'>('idle');

const { copy } = useClipboard();

async function doCopy() {
  try {
    await copy(codeText.value);
    copiedState.value = 'success';
    setTimeout(() => (copiedState.value = 'idle'), 2000);
  }
  catch {
    copiedState.value = 'error';
    setTimeout(() => (copiedState.value = 'idle'), 2000);
  }
}
</script>

<style scoped>
pre code .line {
  display: block;
}
</style>
