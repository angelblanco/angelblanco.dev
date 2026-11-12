<template>
  <div
    class="m-3 mb-4 flex flex-nowrap items-center justify-center gap-6 border-4 border-base-content bg-base-200/85 p-12 max-[375px]:px-6 lg:mb-6 lg:gap-8 lg:border-8"
  >
    <div class="flex-1">
      <h1 class="mb-6 font-mono text-5xl font-bold tracking-tight max-[375px]:text-4xl lg:text-8xl">
        {{ $t('Hello.') }}
      </h1>

      <NuxtLinkLocale to="/about" class="block text-sm text-balance md:text-base lg:text-xl">
        <p class="mb-1">
          {{ $t('My name is') }} {{ $t('Author') }}.
        </p>
        <p class="lg:mb-2">
          {{ $t("I'm a") }} <span
            class="bg-linear-to-br from-primary to-secondary bg-clip-text font-bold text-transparent"
          >{{ $t('Software Engineer') }}</span>
        </p>
      </NuxtLinkLocale>
    </div>

    <NuxtLinkLocale to="/about" class="shrink-0" :aria-label="$t('Me')">
      <UiImage
        src="/ablanco.webp"
        alt="Me"
        :width="256"
        :height="256"
        sizes="96px md:168px lg:256px"
        densities="x1 x2"
        fetchpriority="high"
        class="size-24 rotate-15 shadow-lg transition hover:rotate-0 md:size-42 lg:size-64"
      />
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
import { NuxtLinkLocale, UiImage } from '#components';
</script>
