<template>
  <HomeHeroVortex
    :range-speed="0.3" :range-y="600" :particle-count="1500"
    class="flex justify-center py-8 lg:py-40 md:px-10 h-[400px] md:h-[500px] lg:h-[800px]"
  >
    <div class="max-w-[80rem]">
      <HomeHeroCard />

      <div class="flex gap-6 justify-center w-full max-w-[200px] mx-auto">
        <NuxtLinkLocale to="/about" class="btn btn-neutral btn-block">
          {{ $t('About Me') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/blog" class="btn btn-primary btn-block">
          {{ $t('Blog') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </HomeHeroVortex>
</template>
