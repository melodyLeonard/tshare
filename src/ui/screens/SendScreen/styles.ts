import { StyleSheet } from 'react-native';
import { color, space, type as t } from '../../../constants/theme';

export const styles = StyleSheet.create({
  body: { gap: space.md, marginTop: space.md },
  note: { color: color.send, fontSize: t.small, fontWeight: '700' },
  waiting: { color: color.muted, fontSize: t.small, textAlign: 'center' },
});
