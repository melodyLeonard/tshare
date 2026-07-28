// The received base64 chunks in file order. Throws if any is missing, so a
// partial transfer is never written out as if it were the whole file.
export function orderedChunks(got: Map<number, string>, count: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < count; i++) {
    const chunk = got.get(i);
    if (chunk === undefined) {
      throw new Error(`missing chunk ${i} of ${count}`);
    }
    chunks.push(chunk);
  }
  return chunks;
}
