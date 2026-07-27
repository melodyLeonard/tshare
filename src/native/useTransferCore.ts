import { useEffect, useState } from 'react';
import { createNativeModule, type NativeModule } from 'react-native-cross-native';
import { base64ToBytes } from '../lib/base64';
import WASM from './transfer.rs';

// Loads the Rust transfer core once and hands it back when ready. Hashing and
// verification then run through it, off the JS thread. Returns null until load
// finishes so callers can show a brief warming-up state.
export function useTransferCore(): NativeModule | null {
  const [core, setCore] = useState<NativeModule | null>(null);

  useEffect(() => {
    let live = true;
    const loading = createNativeModule({
      name: 'transfer',
      source: 'transfer.rs',
      language: 'rust',
      bytes: base64ToBytes(WASM),
    });
    loading.then((module) => live && setCore(module));

    return () => {
      live = false;
      loading.then((module) => module.dispose());
    };
  }, []);

  return core;
}
