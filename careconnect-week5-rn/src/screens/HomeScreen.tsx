import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppTabParamList } from '@/src/navigation/AppTabs';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { colors, fontSizes, spacing } from '@/src/utils/theme';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;
type RoleValue = 'careRecipient' | 'caregiver' | null;

const ROLE_STORAGE_KEY = 'careconnect.role';

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [role, setRole] = useState<RoleValue>(null);

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem(ROLE_STORAGE_KEY);
      if (storedRole === 'careRecipient' || storedRole === 'caregiver') {
        setRole(storedRole);
      }
    };

    loadRole();
  }, []);

  const roleLabel = role === 'careRecipient' ? 'Care Recipient' : role === 'caregiver' ? 'Caregiver' : 'Not set';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home (placeholder)</Text>
      <Text style={styles.subtitle}>Selected role: {roleLabel}</Text>
      <TouchableOpacity
        accessibilityLabel="Change role"
        onPress={() => navigation.navigate('Auth', { screen: 'Role' })}
        style={styles.changeButton}
      >
        <Text style={styles.changeText}>Change role</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Go to Health Logs"
        onPress={() => navigation.navigate('HealthLogs')}
        style={styles.changeButton}
        testID="home-health-logs"
      >
        <Text style={styles.changeText}>Health Logs</Text>
      </TouchableOpacity>
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
    marginBottom: spacing.xl,
  },
  changeButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
  },
  changeText: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
});
