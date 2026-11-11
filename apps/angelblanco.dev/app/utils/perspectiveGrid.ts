export interface PerspectiveGridOptions {
  width: number;
  height: number;
  cell?: number;
  distance?: number;
  rows?: number;
  color?: string;
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

export function perspectiveGridLines({ width, height, cell = 64, distance = 340, rows = 16 }: PerspectiveGridOptions) {
  const vanishingX = width / 2;
  const depth = (z: number) => distance / (distance + z);
  const farZ = rows * cell;
  const lines: [number, number, number, number][] = [];

  for (let row = 0; row <= rows; row++) {
    const y = round(height * depth(row * cell));
    lines.push([0, y, width, y]);
  }

  const columns = Math.ceil(vanishingX / (cell * depth(farZ)));
  for (let column = -columns; column <= columns; column++) {
    const x = vanishingX + column * cell;
    lines.push([
      round(x),
      height,
      round(vanishingX + (x - vanishingX) * depth(farZ)),
      round(height * depth(farZ)),
    ]);
  }

  return lines;
}

export function perspectiveGridDataUri(options: PerspectiveGridOptions) {
  const { width, height, color = 'rgba(0,213,190,0.55)' } = options;
  const path = perspectiveGridLines(options).map(([x1, y1, x2, y2]) => `M${x1} ${y1}L${x2} ${y2}`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`
    + `<path d="${path}" stroke="${color}" stroke-width="6" opacity="0.35"/>`
    + `<path d="${path}" stroke="${color}" stroke-width="2"/>`
    + `</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
