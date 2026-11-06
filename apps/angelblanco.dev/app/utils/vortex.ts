export const VORTEX_REFERENCE_AREA = 1280 * 800;
export const VORTEX_MAX_PIXEL_RATIO = 2;
export const VORTEX_LOW_END_CORES = 4;

export function vortexParticleCount(base: number, width: number, height: number, cores?: number): number {
  const byArea = base * Math.min(1, Math.sqrt((width * height) / VORTEX_REFERENCE_AREA));
  const isLowEnd = cores !== undefined && cores > 0 && cores <= VORTEX_LOW_END_CORES;
  const count = byArea / (isLowEnd ? 2 : 1);

  return Math.max(0, Math.round(count));
}

export function vortexPixelRatio(devicePixelRatio?: number): number {
  return Math.min(Math.max(devicePixelRatio || 1, 1), VORTEX_MAX_PIXEL_RATIO);
}
