<template>
  <div
    class="flex flex-wrap-reverse md:flex-nowrap justify-center gap-8 items-center bg-base-200/85 p-12 mb-4 m-1 lg:m-3 lg:mb-6 border-8 border-base-content"
  >
    <div class="flex-1">
      <h1 class="text-5xl lg:text-8xl font-mono font-bold tracking-tight mb-6">
        {{ $t('Hello.') }}
      </h1>
      <p class="text-balance lg:text-xl mb-1">
        {{ $t('My name is') }} Ángel Blanco.
      </p>
      <p class="text-balance lg:text-xl mb-2">
        {{ $t("I'm a") }} <span
          class="font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary"
        >{{ $t('Software Engineer') }}</span>
      </p>
    </div>

    <NuxtLinkLocale to="/about">
      <img src="~/assets/images/ablanco.webp" alt="Me" class="size-24 md:size-42 lg:size-64 rotate-15 shadow-lg transition hover:rotate-0">
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
import { NuxtLinkLocale } from '#components';
</script>
