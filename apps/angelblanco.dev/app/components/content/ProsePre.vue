<template>
  <div class="group my-8 border-y border-(--hair) text-(--ink)">
    <div
      v-if="filename || language || isCopyable"
      class="flex h-7 items-center justify-between font-mono text-[11px]/[13px] tracking-wide text-(--grey)"
    >
      <span class="flex items-center gap-1.5">
        <Icon v-if="languageIcon" :name="languageIcon" class="size-3.5 opacity-70" />
        <span>{{ filename || language }}</span>
      </span>

      <button
        v-if="isCopyable"
        type="button"
        class="flex cursor-pointer items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 hover:text-(--ink) focus-visible:opacity-100"
        :class="{ 'text-success': copiedState === 'success', 'text-error': copiedState === 'error' }"
        @click="doCopy"
      >
        <Icon :name="copiedState === 'success' ? 'tabler:copy-check' : 'tabler:copy'" class="size-3.5" />
      </button>
    </div>
    <pre
      :class="cls"
      class="m-0! rounded-none! bg-transparent! px-0! pt-1! pb-4! text-[13px]! leading-5! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      tabindex="0"
      role="group"
      :aria-label="ariaLabel"
    ><slot /></pre>
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

const { t } = useI18n();
const ariaLabel = computed(() => {
  const name = props.filename || props.language;

  return name
    ? t('a11yCodeBlockNamed', { name })
    : t('a11yCodeBlock');
});

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
