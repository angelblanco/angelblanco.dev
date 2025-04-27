export default function useColors() {
  const colorMode = useColorMode();

  function computedColor(
    ligthColor: string,
    darkColor: string,
  ) {
    return computed(() => {
      return colorMode.value === 'dark' ? darkColor : ligthColor;
    });
  }

  return {
    base100: computedColor('oklch(100% 0 0)', 'oklch(13% 0.028 261.692)'),
  };
}
