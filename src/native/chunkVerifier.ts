import type { NativeModule } from 'react-native-cross-native';
import { base64ToBytes } from '../lib/base64';

// A chunk verifier backed by the Rust core: decode the base64 chunk and check
// its BLAKE3 hash off the JS thread before it's written.
export function chunkVerifier(core: NativeModule) {
  return async (data: string, hash: string) =>
    (await core.call('verify_chunk', [Array.from(base64ToBytes(data)), hash])) as boolean;
}
