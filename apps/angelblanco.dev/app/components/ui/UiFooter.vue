<template>
  <footer class="flex border-t border-base-300 bg-base-100">
    <div class="mx-auto flex max-w-ui flex-1 items-center gap-2">
      <div class="border-r border-base-300 p-3 text-xs md:text-sm">
        <div class="tracking-wide">
          <span class="mr-1">{{ t('Personal website of') }} </span>
          <NuxtLinkLocale to="/about" class="font-semibold hover:text-primary">
            {{ t('Author') }}
          </NuxtLinkLocale>
        </div>
        <a :href="repoUrl" target="_blank" rel="noopener" class="group mt-1 block items-center gap-1 text-xs font-light hover:text-primary">
          <span>{{ t('Hosted and Open Source with') }}</span>
          <Icon name="tabler:heart-filled" class="mx-1.5 inline-flex size-4 align-middle text-red-500 group-hover:text-primary" />
          <span>{{ t('on GitHub') }}</span>
        </a>
        <div class="mt-1 text-xs font-light opacity-70">
          <a :href="contentLicense.url" target="_blank" rel="license noopener" class="hover:text-primary" data-testid="content-license">{{ contentLicense.name }}</a>
          <span class="ml-1">{{ contentLicense.since }}-{{ t('Present') }} © {{ t('Author') }}</span>
        </div>
      </div>

      <div class="ml-auto flex gap-4 p-3">
        <a class="btn btn-square btn-ghost btn-sm" :href="rssPath" :title="t('feedRss')" :aria-label="t('feedRss')" data-testid="rss-feed">
          <Icon name="tabler:rss" class="size-6" />
        </a>
        <a v-for="social in socials" :key="social.name" class="btn btn-square btn-ghost btn-sm" :href="social.url" :title="social.name" :aria-label="social.name">
          <Icon :name="social.icon" class="size-6" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { socials, repoUrl } = useSocials();
const contentLicense = useContentLicense();
const { rssPath } = useFeeds();
const { t } = useI18n();
</script>
