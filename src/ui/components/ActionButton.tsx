import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { color, radius, space, type as t } from '../../constants/theme';

interface Props {
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}

// A full-width action. Used for Send/Receive on the home screen and for the
// primary action on the flow screens (with or without a leading icon).
export function ActionButton({ label, icon, onPress, variant = 'primary' }: Props) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.btn, primary ? styles.primary : styles.outline]}
    >
      {icon}
      <Text style={[styles.label, { color: primary ? color.onSend : color.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    gap: space.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: radius.md,
  },
  primary: { backgroundColor: color.send },
  outline: { borderWidth: 1.5, borderColor: color.line },
  label: { fontSize: t.body, fontWeight: '700' },
});
