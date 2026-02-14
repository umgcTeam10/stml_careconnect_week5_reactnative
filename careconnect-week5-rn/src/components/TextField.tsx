import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fontSizes, spacing } from '@/src/utils/theme';

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  testID?: string;
  accessibilityLabel?: string;
};

export const TextField = React.forwardRef<React.ComponentRef<typeof TextInput>, Omit<TextFieldProps, 'ref'>>(
  function TextField(
    {
      label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      keyboardType = 'default',
      testID,
      accessibilityLabel,
    },
    ref,
  ) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        autoCapitalize="none"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        testID={testID}
        value={value}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 52,
  },
});
