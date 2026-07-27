import { MessageDecoder } from '../lib/messageDecoder';
import { encodeMessage, type Message } from '../lib/protocol';
import type { Wire } from '../lib/wire';

// The slice of a TCP socket the adapter needs.
interface TcpLike {
  on(event: 'data', cb: (data: unknown) => void): void;
  write(data: string): void;
  destroy(): void;
}

// Adapt a TCP socket to the Wire the transfer drivers speak: encode outgoing
// messages, and reassemble incoming bytes into whole messages.
export function socketWire(socket: TcpLike): Wire {
  const decoder = new MessageDecoder();
  let handler: (message: Message) => void = () => {};
  socket.on('data', (data) => {
    for (const message of decoder.push(String(data))) {
      handler(message);
    }
  });
  return {
    send: (message) => socket.write(encodeMessage(message)),
    onMessage: (h) => {
      handler = h;
    },
    close: () => socket.destroy(),
  };
}
