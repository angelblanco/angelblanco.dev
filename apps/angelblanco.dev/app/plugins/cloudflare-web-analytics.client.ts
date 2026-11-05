export default defineNuxtPlugin((nuxtApp) => {
  const token = useRuntimeConfig().public.scripts?.cloudflareWebAnalytics?.token;

  if (!token)
    return;

  onNuxtReady(() => nuxtApp.runWithContext(() => useScriptCloudflareWebAnalytics({
    token,
    scriptOptions: { bundle: false },
  })));
});
