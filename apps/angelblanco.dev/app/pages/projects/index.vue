<template>
  <div class="mx-auto min-h-screen-content max-w-ui p-4">
    <div class="mb-2 text-4xl font-bold">
      {{ $t('Projects') }}
    </div>
    <div class="mb-8 border-b border-base-300 pb-4">
      {{ $t('ProjectsDescription') }}
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div v-for="repo in projectRepos" :key="repo.name" class="border border-base-300 bg-base-100 p-4">
        <div class="flex flex-wrap gap-2">
          <a class="text-2xl font-bold hover:text-primary" :href="repo.url" target="_blank">{{ repo.name }}</a>
          <span class="mb-1 self-end text-sm tracking-wide opacity-60">{{ formatRepoDates(repo) }}</span>
        </div>
        <div class="flex flex-wrap gap-4 py-2">
          <Icon v-for="tech in repo.technologies" :key="tech.icon" :name="tech.icon" :title="tech.title" class="size-4 text-base-content opacity-80" />
        </div>
        <div v-for="(line, i) in repo.description" :key="i" class="mb-3">
          {{ line }}
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
  cta: 'ogCtaProjects',
});

function formatRepoDates(repo: ProjectRepo) {
  return repo.to
    ? `${repo.from} ${t('toDate')} ${repo.to}`
    : `${t('sinceDate')} ${repo.from}`;
}
</script>
