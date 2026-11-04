<template>
  <a
    :href="githubUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="group mb-4 block overflow-hidden rounded border border-base-content/10 bg-base-100 text-base-content no-underline transition-colors hover:border-base-content/30"
  >
    <div class="p-4">
      <div class="flex items-start gap-3">
        <Icon name="simple-icons:github" class="size-8 shrink-0 text-base-content/80" />
        <div class="min-w-0 flex-1">
          <div class="font-semibold text-base-content transition-colors group-hover:text-primary">
            {{ repoName }}
          </div>
          <div v-if="description" class="mt-1 text-sm text-base-content/70">
            {{ description }}
          </div>
          <div class="mt-2 flex items-center gap-1 text-xs text-base-content/50">
            <Icon name="tabler:link" class="size-3" />
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
