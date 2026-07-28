import { Platform } from 'react-native';

// This device's identity for the lifetime of the app process. Computed once (not
// per screen), so navigating around never republishes under a new name — which
// would show up as a phantom peer to everyone, including ourselves.
export const DEVICE_NAME = `${Platform.OS === 'ios' ? 'iPhone' : 'Android'}-${Math.random()
  .toString(36)
  .slice(2, 6)}`;
