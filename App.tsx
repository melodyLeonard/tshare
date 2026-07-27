import { StatusBar } from 'react-native';
import { NearbyScreen } from './src/ui/screens/NearbyScreen';

// Phase 1 shell: the home screen with real empty states. Peer discovery and the
// Send/Receive flows arrive with the transport layer.
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NearbyScreen peers={[]} onSend={() => {}} onReceive={() => {}} />
    </>
  );
}
