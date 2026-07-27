import { StyleSheet, Text, View } from 'react-native';
import { APP_NAME } from '../../constants';
import { color, space, type as t } from '../../constants/theme';
import type { Peer } from '../../types';
import {
  ActionButton,
  EmptyState,
  Panel,
  PeerRow,
  Screen,
  SectionLabel,
} from '../components';
import { ArrowDown, ArrowUp, Logo } from '../icons';

interface Props {
  peers: Peer[];
  onSend: () => void;
  onReceive: () => void;
}

// Home: who's nearby, and the two things you can do.
export function NearbyScreen({ peers, onSend, onReceive }: Props) {
  return (
    <Screen>
      <View style={styles.header}>
        <Logo size={26} />
        <Text style={styles.word}>{APP_NAME}</Text>
      </View>

      <Panel>
        <SectionLabel>Nearby</SectionLabel>
        {peers.length === 0 ? (
          <EmptyState
            title="Looking for devices"
            hint="Open tshare on another device on the same network."
          />
        ) : (
          peers.map((peer) => <PeerRow key={peer.id} peer={peer} />)
        )}
      </Panel>

      <View style={styles.actions}>
        <ActionButton
          label="Send"
          icon={<ArrowUp color={color.onSend} />}
          onPress={onSend}
        />
        <ActionButton
          label="Receive"
          icon={<ArrowDown />}
          variant="outline"
          onPress={onReceive}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.lg,
  },
  word: { color: color.ink, fontSize: t.h1, fontWeight: '800', letterSpacing: -0.5 },
  actions: { flexDirection: 'row', gap: space.sm, marginTop: space.md },
});
