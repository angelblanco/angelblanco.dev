import { describe, expect, it } from 'vitest';
import { VORTEX_REFERENCE_AREA, vortexParticleCount, vortexPixelRatio } from '../../../app/utils/vortex';

describe('utils: vortexParticleCount', () => {
  it('keeps the full count on large areas', () => {
    expect(vortexParticleCount(1500, 1280, 800)).toBe(1500);
    expect(vortexParticleCount(1500, 2560, 1440)).toBe(1500);
  });

  it('reduces the count on small screens without thinning them as much as their area', () => {
    expect(vortexParticleCount(1000, 640, 400)).toBe(500);
    expect(vortexParticleCount(1500, 390, 400)).toBe(Math.round(1500 * Math.sqrt(390 * 400 / VORTEX_REFERENCE_AREA)));
  });

  it('halves the count on low-end devices', () => {
    expect(vortexParticleCount(1500, 1280, 800, 4)).toBe(750);
    expect(vortexParticleCount(1500, 1280, 800, 8)).toBe(1500);
    expect(vortexParticleCount(1500, 1280, 800, 0)).toBe(1500);
  });

  it('never returns a negative count', () => {
    expect(vortexParticleCount(1500, 0, 0)).toBe(0);
  });
});

describe('utils: vortexPixelRatio', () => {
  it('caps the pixel ratio at 2', () => {
    expect(vortexPixelRatio(3)).toBe(2);
    expect(vortexPixelRatio(1.5)).toBe(1.5);
  });

  it('falls back to 1', () => {
    expect(vortexPixelRatio(undefined)).toBe(1);
    expect(vortexPixelRatio(0)).toBe(1);
  });
});
