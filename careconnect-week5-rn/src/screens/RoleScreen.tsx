import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PrimaryButton } from '@/src/components/PrimaryButton';
import { AuthStackParamList } from '@/src/navigation/AuthStack';
import { colors, fontSizes, spacing } from '@/src/utils/theme';

type RoleScreenProps = NativeStackScreenProps<AuthStackParamList, 'Role'>;
type RoleValue = 'careRecipient' | 'caregiver';

const ROLE_STORAGE_KEY = 'careconnect.role';

export function RoleScreen({ navigation }: RoleScreenProps) {
  const [role, setRole] = useState<RoleValue | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem(ROLE_STORAGE_KEY);
      if (storedRole === 'careRecipient' || storedRole === 'caregiver') {
        setRole(storedRole);
      }
    };

    loadRole();
  }, []);

  const handleSelect = async (value: RoleValue) => {
    setRole(value);
    await AsyncStorage.setItem(ROLE_STORAGE_KEY, value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>CC</Text>
        </View>
        <Text style={styles.title}>Choose your role</Text>
        <Text style={styles.subtitle}>Help us personalize your CareConnect experience</Text>
      </View>
      <View style={styles.cards}>
        <TouchableOpacity
          accessibilityLabel="Caregiver"
          onPress={() => handleSelect('caregiver')}
          style={[styles.card, role === 'caregiver' && styles.cardSelected]}
          testID="role-caregiver"
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>I&apos;m a Caregiver</Text>
            {role === 'caregiver' ? <Text style={styles.selectedBadge}>Selected</Text> : null}
          </View>
          <Text style={styles.cardSubtitle}>Caring for a loved one or patient</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>- Coordinate care and tasks</Text>
            <Text style={styles.bulletItem}>- Track health information</Text>
            <Text style={styles.bulletItem}>- Manage appointments and medications</Text>
            <Text style={styles.bulletItem}>- Stay connected with care recipients</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Care Recipient"
          onPress={() => handleSelect('careRecipient')}
          style={[styles.card, role === 'careRecipient' && styles.cardSelected]}
          testID="role-care-recipient"
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>I&apos;m a Care Recipient</Text>
            {role === 'careRecipient' ? <Text style={styles.selectedBadge}>Selected</Text> : null}
          </View>
          <Text style={styles.cardSubtitle}>Receiving care and support</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>- View your care plan and tasks</Text>
            <Text style={styles.bulletItem}>- Log health information and symptoms</Text>
            <Text style={styles.bulletItem}>- Access appointment schedules</Text>
            <Text style={styles.bulletItem}>- Communicate with your caregivers</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          accessibilityLabel="Continue"
          disabled={!role}
          onPress={() => navigation.navigate('Login')}
          testID="role-continue"
          title="Continue"
        />
        <Text style={styles.helperText}>Next: sign in to save your role and continue.</Text>
        <Text style={styles.helperText}>
          You can change this setting later in your profile.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    gap: spacing.xl,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.onPrimary,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    textAlign: 'center',
  },
  cards: {
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.navy,
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: '600',
  },
  selectedBadge: {
    color: colors.navy,
    fontSize: fontSizes.sm,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },
  bulletList: {
    gap: 6,
  },
  bulletItem: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },
  footer: {
    gap: spacing.sm,
  },
  helperText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    textAlign: 'center',
  },
});
