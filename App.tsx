import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NearbyScreen } from './src/ui/screens/NearbyScreen';
import { ReceiveContainer } from './src/ui/screens/ReceiveContainer';
import { SendContainer } from './src/ui/screens/SendContainer';

type Route = 'home' | 'send' | 'receive';

// A three-screen app, so navigation is a plain route switch rather than a heavy
// navigator. Peer discovery lands with the transport layer.
export default function App() {
  const [route, setRoute] = useState<Route>('home');
  const home = () => setRoute('home');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {route === 'home' && (
        <NearbyScreen
          peers={[]}
          onSend={() => setRoute('send')}
          onReceive={() => setRoute('receive')}
        />
      )}
      {route === 'send' && <SendContainer onClose={home} />}
      {route === 'receive' && <ReceiveContainer onClose={home} />}
    </SafeAreaProvider>
  );
}
