import type { Manifest } from '../types';

// Control messages exchanged over the transfer socket. Chunk bytes ride as
// base64 inside a CHUNK message — simple and text-safe; a binary framing is a
// later optimisation.
export type Message =
  | { t: 'manifest'; manifest: Manifest }
  | { t: 'want'; index: number }
  | { t: 'chunk'; index: number; data: string }
  | { t: 'done' };

// One message per line. base64 and JSON-escaped strings never contain a raw
// newline, so '\n' is a safe frame delimiter over a byte stream.
export function encodeMessage(message: Message): string {
  return `${JSON.stringify(message)}\n`;
}
