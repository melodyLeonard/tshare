import type { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { color, space } from '../../constants/theme';

// The dark page every screen sits on, with a consistent gutter.
export function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.bg },
  body: { flex: 1, paddingHorizontal: space.lg },
});
