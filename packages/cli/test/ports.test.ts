import type { AddressInfo } from 'node:net';
import { createServer } from 'node:net';
import { describe, expect, it } from 'vitest';
import { findFreeSlot, isPortFree, portsForSlot } from '../src/worktree/ports.ts';

const alwaysFree = async () => true;

describe('portsForSlot', () => {
  it('offsets dev and e2e base ports by the slot', () => {
    expect(portsForSlot(0)).toEqual({ dev: 3000, e2e: 4000 });
    expect(portsForSlot(7)).toEqual({ dev: 3007, e2e: 4007 });
  });
});

describe('findFreeSlot', () => {
  it('starts at slot 1, leaving slot 0 to the main checkout', async () => {
    expect(await findFreeSlot(new Set(), alwaysFree)).toBe(1);
  });

  it('returns the lowest slot not taken by the registry', async () => {
    expect(await findFreeSlot(new Set([1, 2, 4]), alwaysFree)).toBe(3);
  });

  it('skips slots whose dev or e2e port is busy', async () => {
    const busy = new Set([3001, 4002]);

    expect(await findFreeSlot(new Set(), async port => !busy.has(port))).toBe(3);
  });

  it('fails when every slot is taken', async () => {
    await expect(findFreeSlot(new Set(), async () => false)).rejects.toThrow('No free worktree slot');
  });
});

describe('isPortFree', () => {
  it('detects a port held by another process', async () => {
    const server = createServer();
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address() as AddressInfo;

    expect(await isPortFree(port)).toBe(false);

    await new Promise(resolve => server.close(resolve));
    expect(await isPortFree(port)).toBe(true);
  });
});
