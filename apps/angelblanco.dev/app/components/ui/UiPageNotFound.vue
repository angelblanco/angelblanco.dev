<template>
  <UiCenterContainer>
    <div class="flex min-h-screen-content flex-col items-center justify-center space-y-4 p-4">
      <h1 class="gradient-text text-6xl font-bold tracking-tight">
        {{ $t('Whoops') }}
      </h1>
      <p class="mt-4 text-lg">
        {{ $t('Page not found') }}
      </p>
      <NuxtLinkLocale to="/" class="btn btn-neutral">
        {{ $t('Go Home') }}
      </nuxtlinklocale>
    </div>
  </UiCenterContainer>
</template>
