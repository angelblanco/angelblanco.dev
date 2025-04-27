<template>
  <nav class="flex bg-base-100 border-t border-base-300">
    <div class="max-w-ui mx-auto gap-2 flex-1 flex items-center">
      <div class="text-sm border-r border-base-300 p-3">
        <div class="tracking-wide">
          <span>{{ $t('Personal website of') }}</span>
          <NuxtLinkLocale to="/about" class="font-semibold hover:text-primary">
            Ángel Blanco
          </NuxtLinkLocale>
        </div>
        <a :href="repoUrl" target="_blank" class="flex items-center gap-1 font-light mt-1 text-xs hover:text-primary group">
          {{ $t('Hosted and OpenSourced with') }} <Icon name="heroicons:heart-solid" class="text-red-500 size-4 group-hover:text-primary" />
          {{ $t('on GitHub') }}
        </a>
      </div>

      <div class="flex ml-auto gap-4 p-3">
        <a v-for="social in socials" :key="social.name" class="btn btn-ghost btn-square btn-sm" :href="social.url" __target="blank" :title="social.name">
          <Icon :name="social.icon" class="size-6" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const { socials, repoUrl } = useSocials();
</script>
