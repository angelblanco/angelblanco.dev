import { describe, expect, it } from 'vitest';
import { Comment, createTextVNode, Fragment, h } from 'vue';
import { codeGroupTabs } from '~/utils/codeGroup';

const Pre = {
  name: 'ProsePre',
  render: () => null,
};

describe('utils: codeGroupTabs', () => {
  it('should build one tab per code block using the fence filename as label', () => {
    const tabs = codeGroupTabs([
      h(Pre, { filename: 'pnpm', language: 'bash', code: 'pnpm i' }),
      createTextVNode('\n'),
      h(Comment, 'comment'),
      h(Fragment, [
        h(Pre, { filename: 'npm', language: 'bash', code: 'npm i' }),
      ]),
    ]);

    expect(tabs.map(tab => tab.label)).toEqual(['pnpm', 'npm']);
    expect(tabs.map(tab => tab.icon)).toEqual(['vscode-icons:file-type-pnpm', 'vscode-icons:file-type-npm']);
  });

  it('should hide the filename header of the grouped blocks', () => {
    const [tab] = codeGroupTabs([
      h(Pre, { filename: 'bun', language: 'bash', code: 'bun i' }),
    ]);

    expect(tab?.vnode.props).toMatchObject({ filename: null, language: 'bash', code: 'bun i' });
  });

  it('should fall back to the language or the position when there is no filename', () => {
    const tabs = codeGroupTabs([
      h(Pre, { language: 'ts' }),
      h(Pre, {}),
    ]);

    expect(tabs.map(tab => tab.label)).toEqual(['ts', '2']);
    expect(tabs[0]?.icon).toBeNull();
  });
});
