import { StyleSheet } from 'react-native';
import { color, radius, space, type as t } from '../../../constants/theme';

export const styles = StyleSheet.create({
  input: {
    color: color.ink,
    fontFamily: t.mono,
    fontSize: t.body,
    backgroundColor: color.panel,
    borderColor: color.line,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: space.md,
    marginBottom: space.md,
  },
  hint: {
    color: color.muted,
    fontSize: t.small,
    textAlign: 'center',
    marginTop: space.md,
  },
});
