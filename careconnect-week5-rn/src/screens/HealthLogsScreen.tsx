import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSizes, spacing } from '@/src/utils/theme';

export function HealthLogsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Logs (placeholder)</Text>
      <Text style={styles.subtitle}>This is a light-theme placeholder for future logs.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSizes.xl,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
  },
});
