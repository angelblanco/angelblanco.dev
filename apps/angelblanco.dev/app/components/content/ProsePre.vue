<template>
  <div class="group mb-4 overflow-hidden rounded border border-base-content/10 bg-base-100 text-base-content">
    <!-- Header -->
    <div
      v-if="showHeader"
      class="flex items-center justify-between border-b border-base-content/10 bg-base-200 p-2"
    >
      <div class="flex h-8 items-center gap-2 text-base-content/80">
        <Icon v-if="languageIcon" :name="languageIcon" class="size-5" />
        <span v-if="filename" class="text-sm font-medium tracking-wider">{{ filename }}</span>
      </div>

      <!-- Copy Button -->
      <button
        v-if="isCopyable" class="btn hidden btn-square items-center gap-1 border border-base-content/10 transition btn-sm group-hover:flex" :class="{
          'btn-success': copiedState === 'success',
          'btn-error': copiedState === 'error',
        }" @click="doCopy"
      >
        <Icon
          :name="copiedState === 'success' ? 'heroicons-outline:clipboard-document-check' : 'heroicons-outline:clipboard-document'"
          class="size-5"
        />
      </button>
    </div>

    <div class="relative">
      <div v-if="!showHeader" class="absolute top-2 right-2 transition">
        <div class="p-2 font-mono text-sm text-base-content/70 group-hover:hidden">
          {{ language }}
        </div>
        <button
          v-if="isCopyable" class="btn hidden btn-square items-center gap-1 transition btn-sm group-hover:flex" :class="{
            'btn-success': copiedState === 'success',
            'btn-error': copiedState === 'error',
          }" @click="doCopy"
        >
          <Icon
            :name="copiedState === 'success' ? 'heroicons-outline:clipboard-document-check' : 'heroicons-outline:clipboard-document'"
            class="size-5"
          />
        </button>
      </div>
      <pre :class="cls" class="m-0! rounded-none! bg-base-100 p-6! leading-5.5!"><slot /></pre>
    </div>
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

const showHeader = computed(() => !!props.filename);
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

const languageIcon = computed<string | null>(() => {
  const map: Partial<Record<string, string>> = {
    vue: 'vscode-icons:file-type-vue',
    typescript: 'vscode-icons:file-type-typescript',
    ts: 'vscode-icons:file-type-typescript',
    javascript: 'vscode-icons:file-type-js',
    js: 'vscode-icons:file-type-js',
    php: 'vscode-icons:file-type-php',
  };

  return props.language
    ? map[props.language] ?? null
    : null;
});
</script>

<style scoped>
pre code .line {
  display: block;
}
</style>
