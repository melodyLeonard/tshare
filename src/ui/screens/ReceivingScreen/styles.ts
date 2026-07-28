import { StyleSheet } from 'react-native';
import { color, space, type as t } from '../../../constants/theme';

export const styles = StyleSheet.create({
  from: { color: color.muted, fontSize: t.small, marginBottom: space.md },
  body: { gap: space.md },
  note: { color: color.link, fontSize: t.small, fontWeight: '700', textAlign: 'center' },
  path: {
    color: color.muted,
    fontSize: t.small,
    fontFamily: t.mono,
    textAlign: 'center',
    marginTop: space.sm,
  },
  error: { color: color.send, fontSize: t.small, textAlign: 'center' },
});
