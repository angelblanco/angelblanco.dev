export default function useNavigatorUserAgent() {
  const isAppleUserAgent = ref(false);

  onMounted(() => {
    isAppleUserAgent.value = /Mac|iPhone|iPad/.test(navigator.userAgent);
  });

  return {
    isAppleUserAgent: readonly(isAppleUserAgent),
  };
}
