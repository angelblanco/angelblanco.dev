<template>
  <div class="min-h-screen-content mx-auto max-w-ui p-4">
    <div class="text-4xl font-bold mb-2">
      Projects
    </div>
    <div class="border-b border-base-300 pb-4 mb-8">
      Here it's a list of projects I've worked on.
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div v-for="repo in projectRepos" :key="repo.name" class="border p-4 border-base-300 bg-base-100">
        <div class="font-bold text-2xl">
          <a :href="repo.url" target="_blank">{{ repo.name }}</a>
        </div>
        <div class="flex gap-4 flex-wrap py-2">
          <Icon v-for="tech in repo.technologies" :key="tech.icon" :name="tech.icon" :title="tech.title" class="size-4 text-base-content opacity-80" />
        </div>
        <div class="mb-3">
          {{ repo.description }}
        </div>

        <div class="font-mono">
          <a class="text-info" :href="repo.url" target="_blank">{{ prettyUrl(repo.url) }}</a>
        </div>
        <div v-if="showLicense(repo.license)" class="text-sm">
          {{ $t('License') }}: {{ repo.license }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { projectRepos, showLicense, prettyUrl } = useProjectRepos();
</script>
