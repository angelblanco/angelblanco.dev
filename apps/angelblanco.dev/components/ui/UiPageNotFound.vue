<template>
  <UiCenterContainer>
    <div class="flex flex-col items-center justify-center space-y-4 p-4 min-h-screen-content">
      <h1 class="text-6xl font-bold tracking-tight gradient-text">
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
