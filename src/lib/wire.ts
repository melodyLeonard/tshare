import type { Message } from './protocol';

// The transport the transfer drivers talk over. A native adapter wraps a TCP
// socket as a Wire; tests use an in-memory pair. This keeps the protocol logic
// free of any socket library and fully testable.
export interface Wire {
  send(message: Message): void;
  onMessage(handler: (message: Message) => void): void;
  close(): void;
}

// Verify a base64 chunk against the hash its manifest promised (the Rust core
// on device). Returning false aborts the transfer.
export type Verify = (data: string, expectedHash: string) => Promise<boolean>;
