import { StyleSheet } from 'react-native';
import { color, space, type as t } from '../../../constants/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.lg,
  },
  word: { color: color.ink, fontSize: t.h1, fontWeight: '800', letterSpacing: -0.5 },
  actions: { flexDirection: 'row', gap: space.sm, marginTop: space.md },
  grow: { flex: 1 },
});
