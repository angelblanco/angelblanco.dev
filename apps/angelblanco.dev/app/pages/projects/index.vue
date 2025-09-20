<template>
  <div class="min-h-screen-content mx-auto max-w-ui p-4">
    <div class="text-4xl font-bold mb-2">
      {{ $t('Projects') }}
    </div>
    <div class="border-b border-base-300 pb-4 mb-8">
      {{ $t('ProjectsDescription') }}
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div v-for="repo in projectRepos" :key="repo.name" class="border p-4 border-base-300 bg-base-100">
        <div class="flex flex-wrap gap-2">
          <a class="hover:text-primary font-bold text-2xl" :href="repo.url" target="_blank">{{ repo.name }}</a>
          <span class="text-sm tracking-wide opacity-60 self-end mb-1">{{ formatRepoDates(repo) }}</span>
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
        <div v-if="showLicense(repo.license)" class="text-sm opacity-75">
          {{ $t('License') }}: {{ repo.license }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { projectRepos, showLicense, prettyUrl } = useProjectRepos();
const { t } = useI18n();

useLocalizedSeo({
  title: 'Projects',
  description: 'ProjectsDescription',
});

function formatRepoDates(repo: ProjectRepo) {
  return repo.to
    ? `${repo.from} ${t('to')} ${repo.to}`
    : `${t('since')} ${repo.from}`;
}
</script>
