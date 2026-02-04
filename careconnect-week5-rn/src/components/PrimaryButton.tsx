import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, fontSizes, spacing } from '@/src/utils/theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
};

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  testID,
  accessibilityLabel,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled]}
      testID={testID}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: colors.primaryDisabled,
  },
  buttonText: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
});
