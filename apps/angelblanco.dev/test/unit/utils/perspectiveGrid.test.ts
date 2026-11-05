import { describe, expect, it } from 'vitest';
import { perspectiveGridDataUri, perspectiveGridLines } from '../../../app/utils/perspectiveGrid';

describe('utils: perspectiveGrid', () => {
  const lines = perspectiveGridLines({
    width: 840,
    height: 276,
    cell: 64,
    distance: 340,
    rows: 16,
  });

  it('should draw the first row on the bottom edge', () => {
    expect(lines[0]).toEqual([0, 276, 840, 276]);
  });

  it('should bring each row closer to the horizon', () => {
    const rows = lines.slice(0, 17).map(([, y]) => y);

    expect(rows).toEqual([...rows].sort((a, b) => b - a));
    expect(rows.at(-1)).toBeGreaterThan(0);
  });

  it('should converge the columns towards the vanishing point', () => {
    const columns = lines.slice(17);
    const center = columns.find(([x1]) => x1 === 420);

    expect(center).toEqual([
      420,
      276,
      420,
      expect.any(Number),
    ]);
    for (const [x1, , x2] of columns)
      expect(Math.abs(x2 - 420)).toBeLessThanOrEqual(Math.abs(x1 - 420));
  });

  it('should encode an svg data uri with the given size', () => {
    const uri = perspectiveGridDataUri({ width: 640, height: 432 });

    expect(uri.startsWith('data:image/svg+xml,')).toBe(true);
    expect(decodeURIComponent(uri)).toContain('viewBox="0 0 640 432"');
  });
});
