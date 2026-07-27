import type { Message } from '../src/lib/protocol';
import type { Wire } from '../src/lib/wire';

// Two wires that deliver each other's messages asynchronously, standing in for
// a pair of connected sockets in transfer-protocol tests.
export function wirePair(): [Wire, Wire] {
  let toA: ((m: Message) => void) | undefined;
  let toB: ((m: Message) => void) | undefined;
  return [
    { send: (m) => queueMicrotask(() => toB?.(m)), onMessage: (h) => (toA = h), close() {} },
    { send: (m) => queueMicrotask(() => toA?.(m)), onMessage: (h) => (toB = h), close() {} },
  ];
}
