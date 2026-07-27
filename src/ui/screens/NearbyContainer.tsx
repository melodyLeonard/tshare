import { useRef } from 'react';
import { Platform } from 'react-native';
import { BASE_PORT } from '../../constants';
import { useDiscovery } from '../../native/useDiscovery';
import { NearbyScreen } from './NearbyScreen';

// Names this device once per launch, then feeds the live peer list to the
// Nearby screen.
export function NearbyContainer(props: { onSend: () => void; onReceive: () => void }) {
  const name = useRef(
    `${Platform.OS === 'ios' ? 'iPhone' : 'Android'}-${Math.random().toString(36).slice(2, 6)}`,
  ).current;
  const peers = useDiscovery(name, BASE_PORT);
  return <NearbyScreen peers={peers} onSend={props.onSend} onReceive={props.onReceive} />;
}
