import { Text, TextInput } from 'react-native';
import { color } from '../../../constants/theme';
import * as UI from '../../components';
import { styles } from './styles';
import type { ReceiveProps } from './types';

// Receive: type a share code, then connect to a seeder that has the file.
export function ReceiveScreen(p: ReceiveProps) {
  return (
    <UI.Screen>
      <UI.Header title="Receive" onClose={p.onClose} />
      <UI.SectionLabel>Enter a share code</UI.SectionLabel>
      <TextInput
        value={p.code}
        onChangeText={p.onChangeCode}
        placeholder="TSHARE-0000-0000"
        placeholderTextColor={color.muted}
        autoCapitalize="characters"
        style={styles.input}
      />
      <UI.ActionButton
        label={p.connecting ? 'Connecting…' : 'Connect'}
        onPress={p.onConnect}
      />
      {p.connecting && (
        <Text style={styles.hint}>Looking for a seeder with this file…</Text>
      )}
    </UI.Screen>
  );
}
