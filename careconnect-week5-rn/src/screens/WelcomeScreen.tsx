import { ScrollView,StatusBar, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '@/src/components/PrimaryButton';
import { AuthStackParamList } from '@/src/navigation/AuthStack';
import { colors, fontSizes, spacing } from '@/src/utils/theme';

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.loginRow}>
        <TouchableOpacity
          accessibilityLabel="Log in"
          onPress={() => navigation.navigate('Login')}
          testID="welcome-login"
        >
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>CC</Text>
        </View>
        <Text style={styles.title}>CareConnect</Text>
        <Text style={styles.subtitle}>Compassionate care coordination made simple</Text>
      </View>
      <View style={styles.featuresCard}>
        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureIconText}>o</Text>
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Stay Connected</Text>
            <Text style={styles.featureSubtitle}>
              Coordinate care seamlessly between caregivers and loved ones.
            </Text>
          </View>
        </View>
        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureIconText}>o</Text>
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Secure &amp; Private</Text>
            <Text style={styles.featureSubtitle}>
              Your health information is protected with industry-leading security.
            </Text>
          </View>
        </View>
        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureIconText}>o</Text>
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Personalized Care</Text>
            <Text style={styles.featureSubtitle}>
              Track health, manage tasks, and keep care plans in one place.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          accessibilityLabel="Get started"
          onPress={() => navigation.navigate('Role')}
          testID="welcome-get-started"
          title="Get Started"
        />
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
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
    alignItems: 'center',
    gap: spacing.xl,
  },
  loginRow: {
    width: '100%',
    alignItems: 'flex-end',
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  loginRow: {
  width: "100%",
  alignItems: "flex-end",
  paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 8 : 8,
  paddingRight: 12,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    textAlign: 'center',
  },
  featuresCard: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  featureIconText: {
    color: colors.navy,
    fontSize: fontSizes.sm,
    fontWeight: '700',
  },
  featureText: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  featureSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    textAlign: 'center',
  },
});
