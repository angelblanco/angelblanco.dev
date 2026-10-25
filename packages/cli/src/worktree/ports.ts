import { createServer } from 'node:net';

export interface Ports {
  dev: number;
  e2e: number;
}

export const BASE_PORTS: Ports = { dev: 3000, e2e: 4000 };
export const MAX_SLOT = 999;

export type PortChecker = (port: number) => Promise<boolean>;

export function portsForSlot(slot: number): Ports {
  return { dev: BASE_PORTS.dev + slot, e2e: BASE_PORTS.e2e + slot };
}

export function isPortFree(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = createServer();
    server.once('error', () => resolve(false));
    server.listen(port, () => server.close(() => resolve(true)));
  });
}

export async function findFreeSlot(usedSlots: Set<number>, isFree: PortChecker = isPortFree): Promise<number> {
  for (let slot = 1; slot <= MAX_SLOT; slot++) {
    if (usedSlots.has(slot))
      continue;

    const { dev, e2e } = portsForSlot(slot);

    if (await isFree(dev) && await isFree(e2e))
      return slot;
  }

  throw new Error(`No free worktree slot between 1 and ${MAX_SLOT}`);
}
