import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { Peer } from './src/types';
import { NearbyContainer } from './src/ui/screens/NearbyContainer';
import { ReceiveContainer } from './src/ui/screens/ReceiveContainer';
import { ReceivingContainer } from './src/ui/screens/ReceivingContainer';
import { SendContainer } from './src/ui/screens/SendContainer';

type Route = 'home' | 'send' | 'receive' | 'receiving';

// A small app, so navigation is a plain route switch. Tapping a nearby peer
// pulls whatever it's sharing.
export default function App() {
  const [route, setRoute] = useState<Route>('home');
  const [peer, setPeer] = useState<Peer>();
  const home = () => setRoute('home');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {route === 'home' && (
        <NearbyContainer
          onSend={() => setRoute('send')}
          onReceive={() => setRoute('receive')}
          onPeer={(p) => {
            setPeer(p);
            setRoute('receiving');
          }}
        />
      )}
      {route === 'send' && <SendContainer onClose={home} />}
      {route === 'receive' && <ReceiveContainer onClose={home} />}
      {route === 'receiving' && peer && <ReceivingContainer peer={peer} onClose={home} />}
    </SafeAreaProvider>
  );
}
