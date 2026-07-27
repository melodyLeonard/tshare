import { useState } from 'react';
import { ReceiveScreen } from './ReceiveScreen';

// Holds the code the user types. Finding a seeder and pulling chunks arrives
// with the transport layer; Connect moves into the waiting state so the flow
// reads end to end today.
export function ReceiveContainer({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState('');
  const [connecting, setConnecting] = useState(false);

  return (
    <ReceiveScreen
      code={code}
      onChangeCode={setCode}
      onConnect={() => setConnecting(true)}
      onClose={onClose}
      connecting={connecting}
    />
  );
}
