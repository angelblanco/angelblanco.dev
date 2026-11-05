import { describe, expect, it } from 'vitest';
import { stripCodeNotations } from '../../../app/utils/codeNotation';

describe('utils: stripCodeNotations', () => {
  it('should keep code without notations untouched', () => {
    expect(stripCodeNotations('const a = 1;\n# comment')).toBe('const a = 1;\n# comment');
  });

  it('should drop removed lines and keep added ones', () => {
    const code = [
      'const port = 3000; // [!code --]',
      'const port = 4000; // [!code ++]',
    ].join('\n');

    expect(stripCodeNotations(code)).toBe('const port = 4000;');
  });

  it('should strip highlight, focus and error level notations in any comment style', () => {
    const code = [
      'pnpm install # [!code highlight]',
      'const a = 1; /* [!code focus] */',
      '<div /> <!-- [!code error] -->',
      'let b = 2; // [!code warning:2]',
    ].join('\n');

    expect(stripCodeNotations(code)).toBe([
      'pnpm install',
      'const a = 1;',
      '<div />',
      'let b = 2;',
    ].join('\n'));
  });
});
