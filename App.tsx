import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BASE_PORT } from './src/constants';
import { DEVICE_NAME } from './src/native/deviceName';
import { useDiscovery } from './src/native/useDiscovery';
import type { Peer } from './src/types';
import { NearbyScreen } from './src/ui/screens/NearbyScreen';
import { ReceiveContainer } from './src/ui/screens/ReceiveContainer';
import { ReceivingContainer } from './src/ui/screens/ReceivingContainer';
import { SendContainer } from './src/ui/screens/SendContainer';

type Route = 'home' | 'send' | 'receive' | 'receiving';

// Discovery runs here, once, so it keeps advertising and browsing across
// navigation rather than republishing every time a screen mounts.
export default function App() {
  const [route, setRoute] = useState<Route>('home');
  const [peer, setPeer] = useState<Peer>();
  const peers = useDiscovery(DEVICE_NAME, BASE_PORT);
  const home = () => setRoute('home');

  const openPeer = (p: Peer) => {
    setPeer(p);
    setRoute('receiving');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {route === 'home' && (
        <NearbyScreen
          peers={peers}
          onSend={() => setRoute('send')}
          onReceive={() => setRoute('receive')}
          onPeer={openPeer}
        />
      )}
      {route === 'send' && <SendContainer onClose={home} />}
      {route === 'receive' && <ReceiveContainer onClose={home} />}
      {route === 'receiving' && peer && <ReceivingContainer peer={peer} onClose={home} />}
    </SafeAreaProvider>
  );
}
