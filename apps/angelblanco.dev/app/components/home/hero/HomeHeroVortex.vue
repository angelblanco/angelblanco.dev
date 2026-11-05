<template>
  <div ref="containerRef" :class="cn('relative size-full overflow-hidden', props.containerClass)">
    <div
      data-testid="hero-vortex"
      :data-state="state"
      :class="cn(
        'absolute inset-0 z-0 transition-opacity duration-300 motion-reduce:transition-none',
        state === 'idle' ? 'opacity-0' : 'opacity-100',
      )"
    >
      <canvas ref="canvasRef" class="block size-full" aria-hidden="true" />
    </div>

    <div :class="cn('relative z-10', props.class)">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNoise3D } from 'simplex-noise';
import { cn } from '@/lib/utils';

interface VortexProps {
  class?: string;
  containerClass?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
}

type VortexState = 'idle' | 'static' | 'running' | 'paused';

const props = withDefaults(defineProps<VortexProps>(), {
  particleCount: 700,
  rangeY: 100,
  baseSpeed: 0.0,
  rangeSpeed: 1.5,
  baseRadius: 1,
  rangeRadius: 2,
  baseHue: 220,
});

const TAU = 2 * Math.PI;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const PARTICLE_PROP_COUNT = 9;
const RANGE_HUE = 100;
const NOISE_STEPS = 3;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;
const FPS_LIMIT = 60;
const RESIZE_DEBOUNCE_MS = 150;

const containerRef = useTemplateRef<HTMLElement>('containerRef');
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');
const { base100: backgroundColor } = useAppColors();

const prefersReducedMotion = usePreferredReducedMotion();
const isElementVisible = useElementVisibility(containerRef);
const documentVisibility = useDocumentVisibility();

const isReady = ref(false);
const isReduced = computed(() => prefersReducedMotion.value === 'reduce');
const shouldAnimate = computed(() =>
  isReady.value
  && !isReduced.value
  && isElementVisible.value
  && documentVisibility.value === 'visible',
);

const noise3D = createNoise3D();
let ctx: CanvasRenderingContext2D | null = null;
let particles = new Float32Array(0);
let width = 0;
let height = 0;
let tick = 0;
let isDisposed = false;

const { pause, resume, isActive } = useRafFn(draw, { immediate: false, fpsLimit: FPS_LIMIT });

const state = computed<VortexState>(() => {
  if (!isReady.value)
    return 'idle';
  if (isReduced.value)
    return 'static';
  return isActive.value ? 'running' : 'paused';
});

function rand(n: number) {
  return n * Math.random();
}

function fadeInOut(t: number, m: number): number {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
}

function lerp(n1: number, n2: number, speed: number): number {
  return (1 - speed) * n1 + speed * n2;
}

function initParticle(i: number, isSeeding = false) {
  const top = Math.max(0, 0.5 * height - props.rangeY);
  const bottom = Math.min(height, 0.5 * height + props.rangeY);
  const ttl = BASE_TTL + rand(RANGE_TTL);
  const life = rand(isSeeding ? ttl : 0);

  particles.set(
    [
      rand(width),
      top + rand(bottom - top),
      0,
      0,
      life,
      ttl,
      props.baseSpeed + rand(props.rangeSpeed),
      props.baseRadius + rand(props.rangeRadius),
      props.baseHue + rand(RANGE_HUE),
    ],
    i,
  );
}

function updateParticle(context: CanvasRenderingContext2D, i: number) {
  const x = particles[i] ?? 0;
  const y = particles[i + 1] ?? 0;
  const vx = particles[i + 2] ?? 0;
  const vy = particles[i + 3] ?? 0;
  const life = particles[i + 4] ?? 0;
  const ttl = particles[i + 5] ?? 0;
  const speed = particles[i + 6] ?? 0;
  const radius = particles[i + 7] ?? 0;
  const hue = particles[i + 8] ?? 0;

  const n = noise3D(x * X_OFF, y * Y_OFF, tick * Z_OFF) * NOISE_STEPS * TAU;
  const nextVx = lerp(vx, Math.cos(n), 0.5);
  const nextVy = lerp(vy, Math.sin(n), 0.5);
  const nextX = x + nextVx * speed;
  const nextY = y + nextVy * speed;

  context.lineWidth = radius;
  context.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(nextX, nextY);
  context.stroke();

  particles[i] = nextX;
  particles[i + 1] = nextY;
  particles[i + 2] = nextVx;
  particles[i + 3] = nextVy;
  particles[i + 4] = life + 1;

  if (nextX > width || nextX < 0 || nextY > height || nextY < 0 || life > ttl)
    initParticle(i);
}

function draw() {
  if (!ctx)
    return;

  tick++;
  ctx.fillStyle = backgroundColor.value;
  ctx.fillRect(0, 0, width, height);
  ctx.lineCap = 'round';

  for (let i = 0; i < particles.length; i += PARTICLE_PROP_COUNT)
    updateParticle(ctx, i);
}

function setupCanvas(): boolean {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container)
    return false;

  ctx ??= canvas.getContext('2d');
  if (!ctx)
    return false;

  const ratio = vortexPixelRatio(window.devicePixelRatio);
  width = container.clientWidth;
  height = container.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = vortexParticleCount(props.particleCount, width, height, navigator.hardwareConcurrency);
  particles = new Float32Array(count * PARTICLE_PROP_COUNT);
  for (let i = 0; i < particles.length; i += PARTICLE_PROP_COUNT)
    initParticle(i, true);

  return true;
}

function start() {
  if (isDisposed || !setupCanvas())
    return;

  draw();
  isReady.value = true;
}

const handleResize = useDebounceFn(() => {
  const container = containerRef.value;
  if (!isReady.value || !container)
    return;
  if (container.clientWidth === width && container.clientHeight === height)
    return;

  setupCanvas();
  draw();
}, RESIZE_DEBOUNCE_MS);

useResizeObserver(containerRef, handleResize);

watch(shouldAnimate, (value) => {
  if (value)
    resume();
  else
    pause();
});

watch(backgroundColor, () => {
  if (isReady.value && !isActive.value)
    draw();
});

onMounted(() => onNuxtReady(start));

onBeforeUnmount(() => {
  isDisposed = true;
  pause();
  ctx = null;
  particles = new Float32Array(0);
});
</script>
