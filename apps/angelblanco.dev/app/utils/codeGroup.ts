import type { VNode } from 'vue';
import { cloneVNode, Fragment, isVNode } from 'vue';

export interface CodeGroupTab {
  label: string;
  icon: string | null;
  vnode: VNode;
}

const TAB_ICONS: Partial<Record<string, string>> = {
  npm: 'vscode-icons:file-type-npm',
  pnpm: 'vscode-icons:file-type-pnpm',
  yarn: 'vscode-icons:file-type-yarn',
  bun: 'vscode-icons:file-type-bun',
  deno: 'vscode-icons:file-type-deno',
};

function flatten(vnodes: unknown[]): VNode[] {
  return vnodes.flatMap((vnode) => {
    if (!isVNode(vnode))
      return [];
    if (vnode.type === Fragment) {
      return flatten(Array.isArray(vnode.children)
        ? vnode.children
        : []);
    }
    return typeof vnode.type === 'symbol'
      ? []
      : [vnode];
  });
}

export function codeGroupTabs(vnodes: unknown[]): CodeGroupTab[] {
  return flatten(vnodes).map((vnode, index) => {
    const label = String(vnode.props?.filename ?? vnode.props?.language ?? index + 1);

    return {
      label,
      icon: TAB_ICONS[label.toLowerCase()] ?? null,
      vnode: cloneVNode(vnode, { filename: null }),
    };
  });
}
