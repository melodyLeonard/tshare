import { useState } from 'react';
import type { NativeModule } from 'react-native-cross-native';
import { planChunks } from '../lib/chunking';
import { buildManifest } from '../lib/manifest';
import type { Manifest } from '../types';

type Phase = 'idle' | 'hashing' | 'ready';
interface State {
  phase: Phase;
  done: number;
  total: number;
  manifest?: Manifest;
}

// Hash a file's chunks through the Rust core, tracking progress, then assemble
// the manifest whose root becomes the share code. The hashing runs off the JS
// thread, so the progress bar stays smooth even on a large file.
export function usePrepareShare(core: NativeModule | null) {
  const [state, setState] = useState<State>({ phase: 'idle', done: 0, total: 0 });

  async function prepare(name: string, bytes: Uint8Array, chunkSize: number) {
    if (!core) {
      return;
    }
    const plan = planChunks(bytes.length, chunkSize);
    setState({ phase: 'hashing', done: 0, total: plan.length });

    const hashes: string[] = [];
    for (const chunk of plan) {
      const slice = Array.from(bytes.subarray(chunk.offset, chunk.offset + chunk.size));
      hashes.push((await core.call('hash_chunk', [slice])) as string);
      setState((s) => ({ ...s, done: hashes.length }));
    }

    const root = (await core.call('build_root', [hashes.join('\n')])) as string;
    const manifest = buildManifest(name, bytes.length, chunkSize, hashes, root);
    setState({ phase: 'ready', done: plan.length, total: plan.length, manifest });
  }

  return { ...state, prepare };
}
