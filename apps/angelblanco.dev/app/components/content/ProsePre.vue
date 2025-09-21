<template>
  <div class="border overflow-hidden bg-base-100 border-base-content/10 text-base-content mb-4 rounded group">
    <!-- Header -->
    <div
      v-if="showHeader"
      class="flex items-center justify-between p-2 bg-base-200 border-b border-base-content/10"
    >
      <div class="flex gap-2 items-center text-base-content/80 h-8">
        <Icon v-if="languageIcon" :name="languageIcon" class="size-5" />
        <span v-if="filename" class="text-sm tracking-wider font-medium">{{ filename }}</span>
      </div>

      <!-- Copy Button -->
      <button
        v-if="isCopyable" class="group-hover:flex hidden btn-sm transition btn btn-square border border-base-content/10 items-center gap-1" :class="{
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
      <div v-if="!showHeader" class="absolute right-2 top-2 transition">
        <div class="text-sm font-mono text-base-content/70 group-hover:hidden p-2">
          {{ language }}
        </div>
        <button
          v-if="isCopyable" class="group-hover:flex hidden btn-sm transition btn btn-square items-center gap-1" :class="{
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
      <pre :class="cls" class="p-6! m-0! bg-base-100 !leading-5.5 !rounded-none"><slot /></pre>
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

  return props.language ? map[props.language] ?? null : null;
});
</script>

<style scoped>
pre code .line {
  display: block;
}
</style>
