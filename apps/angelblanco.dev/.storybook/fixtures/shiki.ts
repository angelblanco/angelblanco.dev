import { h } from 'vue';
import ProsePre from '../../app/components/content/ProsePre.vue';

export const shikiClass = 'shiki shiki-themes catppuccin-latte catppuccin-mocha';

const palette = {
  text: ['#4C4F69', '#CDD6F4'],
  overlay2: ['#7C7F93', '#9399B2'],
  blue: ['#1E66F5', '#89B4FA'],
  green: ['#40A02B', '#A6E3A1'],
  teal: ['#179299', '#94E2D5'],
  mauve: ['#8839EF', '#CBA6F7'],
  red: ['#D20F39', '#F38BA8'],
  maroon: ['#E64553', '#EBA0AC'],
  pink: ['#EA76CB', '#F5C2E7'],
} as const;

export type Line = [keyof typeof palette, string][];

export function toCode(lines: Line[]) {
  return lines.map(line => line.map(([, text]) => text).join('')).join('\n');
}

export function toVNode(lines: Line[]) {
  return h('code', lines.flatMap((line, index) => [
    ...(index
      ? ['\n']
      : []),
    h('span', { class: 'line' }, line.map(([color, text]) => h('span', {
      style: { '--shiki-default': palette[color][0], '--shiki-dark': palette[color][1] },
    }, text))),
  ]));
}

export function shikiBlock(lines: Line[], props: { language: string; filename?: string }) {
  return h(ProsePre, {
    ...props,
    code: toCode(lines),
    class: shikiClass,
  }, {
    default: () => toVNode(lines),
  });
}
