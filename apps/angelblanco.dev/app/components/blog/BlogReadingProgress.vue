<template>
  <div data-testid="reading-progress" aria-hidden="true" />
</template>

<style scoped>
[data-testid='reading-progress'] {
  display: none;
}

@supports (animation-timeline: scroll()) {
  [data-testid='reading-progress'] {
    position: fixed;
    inset-inline: 0;
    top: 0;
    z-index: 40;
    display: block;
    height: 3px;
    background-image: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    transform-origin: 0 50%;
    animation: reading-progress linear both;
    animation-timeline: scroll(root block);
  }
}

@keyframes reading-progress {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}
</style>
