import type { Message } from './protocol';

// Reassembles newline-delimited messages from a TCP stream, which may deliver
// them split across reads or several at once. Feed raw text with push(); get
// back the complete messages, keeping any trailing partial for next time.
export class MessageDecoder {
  private buffer = '';

  push(text: string): Message[] {
    this.buffer += text;
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() ?? '';
    return lines
      .filter((line) => line.length > 0)
      .map((line) => JSON.parse(line) as Message);
  }
}
