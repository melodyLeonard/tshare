import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, space, type as t } from '../../constants/theme';
import { Close } from '../icons';

// A flow header: the title on the left, a dismiss control on the right.
export function Header({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onClose} accessibilityRole="button" hitSlop={12}>
        <Close />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.lg,
  },
  title: { color: color.ink, fontSize: t.h2, fontWeight: '800' },
});
