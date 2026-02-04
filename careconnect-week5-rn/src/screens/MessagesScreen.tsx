import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSizes, spacing } from '@/src/utils/theme';

export function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages (placeholder)</Text>
      <Text style={styles.subtitle}>Secure messaging will appear here.</Text>
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
