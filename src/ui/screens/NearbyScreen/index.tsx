import { Text, View } from 'react-native';
import { APP_NAME } from '../../../constants';
import { color } from '../../../constants/theme';
import * as UI from '../../components';
import { ArrowDown, ArrowUp, Logo } from '../../icons';
import { styles } from './styles';
import type { NearbyProps } from './types';

// Home: who's nearby, and the two things you can do.
export function NearbyScreen({ peers, onSend, onReceive, onPeer }: NearbyProps) {
  return (
    <UI.Screen>
      <View style={styles.header}>
        <Logo size={26} />
        <Text style={styles.word}>{APP_NAME}</Text>
      </View>

      <UI.Panel>
        <UI.SectionLabel>Nearby</UI.SectionLabel>
        {peers.length === 0 ? (
          <UI.EmptyState
            title="Looking for devices"
            hint="Open tshare on another device on the same network."
          />
        ) : (
          peers.map((peer) => <UI.PeerRow key={peer.id} peer={peer} onPress={onPeer} />)
        )}
      </UI.Panel>

      <View style={styles.actions}>
        <View style={styles.grow}>
          <UI.ActionButton
            label="Send"
            icon={<ArrowUp color={color.onSend} />}
            onPress={onSend}
          />
        </View>
        <View style={styles.grow}>
          <UI.ActionButton
            label="Receive"
            icon={<ArrowDown />}
            variant="outline"
            onPress={onReceive}
          />
        </View>
      </View>
    </UI.Screen>
  );
}
