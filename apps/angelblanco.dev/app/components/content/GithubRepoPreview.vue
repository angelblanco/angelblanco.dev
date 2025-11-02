<template>
  <a
    :href="githubUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="block no-underline decoration-none border overflow-hidden bg-base-100 border-base-content/10 text-base-content mb-4 rounded group hover:border-base-content/30 transition-colors"
  >
    <div class="p-4">
      <div class="flex items-start gap-3">
        <Icon name="mdi:github" class="size-8 flex-shrink-0 text-base-content/80" />
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-base-content group-hover:text-primary transition-colors">
            {{ repoName }}
          </div>
          <div v-if="description" class="text-sm text-base-content/70 mt-1">
            {{ description }}
          </div>
          <div class="text-xs text-base-content/50 mt-2 flex items-center gap-1">
            <Icon name="heroicons-outline:link" class="size-3" />
            github.com/{{ repo }}
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
interface GithubRepoPreviewProps {
  repo: string;
  description?: string;
}

const props = defineProps<GithubRepoPreviewProps>();

const githubUrl = computed(() => `https://github.com/${props.repo}`);
const repoName = computed(() => props.repo.split('/').pop() || props.repo);
</script>
