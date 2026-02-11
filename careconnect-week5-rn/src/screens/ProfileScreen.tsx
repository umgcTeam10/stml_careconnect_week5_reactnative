import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppTabParamList } from '@/src/navigation/AppTabs';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { colors, fontSizes, spacing } from '@/src/utils/theme';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const showNotImplemented = () => {
    Alert.alert('Not Implemented', 'This feature is not implemented in Week 5');
  };

  const titleRowStyle = [
    styles.titleRow,
    { paddingTop: insets.top + spacing.sm },
  ];

  return (
    <View style={styles.safe} testID="profile-screen">
      <StatusBar style="dark" />
      {/* Tier 1: white area (status bar + page title row) - matches Messages tab header */}
      <View style={titleRowStyle}>
        <Text style={styles.titleRowText} numberOfLines={1}>
          Profile
        </Text>
      </View>
      {/* Tier 2: blue bar - back + title + Settings (matches Messages blue bar) */}
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityLabel="Back"
          onPress={() => navigation.goBack()}
          style={styles.headerBack}
          testID="headerBackButton"
        >
          <Text style={styles.headerBackText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          accessibilityLabel="Settings button"
          onPress={showNotImplemented}
          style={styles.settingsButtonWrap}
          testID="profile-settings-button"
        >
          <Text style={styles.settingsButton}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        testID="profile-scroll-view"
      >
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SJ</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>Sarah Johnson</Text>
              <Text style={styles.role}>Caregiver</Text>
            </View>
            <TouchableOpacity
              accessibilityLabel="Edit profile"
              onPress={showNotImplemented}
              testID="profile-edit"
            >
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Card */}
        <View style={styles.card}>
          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.contactText}>sarah.johnson@email.com</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.contactText}>(555) 123-4567</Text>
          </View>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Text style={styles.sectionSubtitle}>Manage your notification settings</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>Push Notifications</Text>
              <Text style={styles.optionSubtitle}>Receive app notifications</Text>
            </View>
            <Switch
              onValueChange={setPushNotifications}
              testID="toggle-push"
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
              value={pushNotifications}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="mail-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>Email Notifications</Text>
              <Text style={styles.optionSubtitle}>Receive email updates</Text>
            </View>
            <Switch
              onValueChange={setEmailNotifications}
              testID="toggle-email"
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
              value={emailNotifications}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF4E6' }]}>
              <Ionicons name="alarm-outline" size={20} color="#EA8C3E" />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>Task Reminders</Text>
              <Text style={styles.optionSubtitle}>Remind me about tasks</Text>
            </View>
            <Switch
              onValueChange={setTaskReminders}
              testID="toggle-reminders"
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
              value={taskReminders}
            />
          </View>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.sectionSubtitle}>Customize your CareConnect experience</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="moon-outline" size={20} color={colors.textSecondary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>Dark Mode</Text>
              <Text style={styles.optionSubtitle}>Disabled</Text>
            </View>
            <Switch
              onValueChange={setDarkMode}
              testID="toggle-dark-mode"
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
              value={darkMode}
            />
          </View>
        </View>

        {/* Accessibility */}
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <Text style={styles.sectionSubtitle}>Adjust settings for better usability</Text>

        <View style={styles.card}>
          <TouchableOpacity
            accessibilityLabel="Text Size settings"
            onPress={showNotImplemented}
            style={styles.row}
            testID="settings-text-size"
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="text-outline" size={20} color={colors.textSecondary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>Text Size</Text>
              <Text style={styles.optionSubtitle}>Adjust font size</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            accessibilityLabel="High Contrast settings"
            onPress={showNotImplemented}
            style={styles.row}
            testID="settings-contrast"
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="contrast-outline" size={20} color={colors.textSecondary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>High Contrast</Text>
              <Text style={styles.optionSubtitle}>Improve visibility</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            accessibilityLabel="Privacy & Security"
            onPress={showNotImplemented}
            style={styles.row}
            testID="settings-privacy"
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="shield-outline" size={20} color={colors.textSecondary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            accessibilityLabel="Help & Support"
            onPress={showNotImplemented}
            style={styles.row}
            testID="settings-help"
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="help-circle-outline" size={20} color={colors.textSecondary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.optionTitle}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          accessibilityLabel="Sign out"
          onPress={showNotImplemented}
          style={styles.signOut}
          testID="profile-signout"
        >
          <Ionicons name="log-out-outline" size={20} color="#DA3B4A" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Appointment Banner */}
      <View style={styles.banner}>
        <Ionicons name="time-outline" size={18} color="rgba(255, 255, 255, 0.8)" />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Now: Physical Therapy Appointment</Text>
          <View style={styles.bannerDetails}>
            <Ionicons name="time-outline" size={12} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.bannerDetailText}>02:00 PM</Text>
            <Text style={styles.bannerDot}>•</Text>
            <Ionicons name="location-outline" size={12} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.bannerDetailText}>At clinic</Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityLabel="View appointment"
          onPress={showNotImplemented}
          style={styles.viewButton}
          testID="appointment-view"
        >
          <Text style={styles.viewText}>View</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleRow: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  titleRowText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerBack: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  headerBackText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  headerTitle: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
  },
  settingsButtonWrap: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  settingsButton: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 35,
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  avatarText: {
    color: colors.onPrimary,
    fontSize: fontSizes.xl,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
  role: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: 4,
  },
  editButton: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  contactRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
  contactText: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginLeft: spacing.md,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
    marginTop: spacing.lg,
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.sm,
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  optionTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  optionSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginTop: 2,
  },
  signOut: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  signOutText: {
    color: '#DA3B4A',
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  banner: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  bannerContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  bannerTitle: {
    color: colors.onPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  bannerDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  bannerDetailText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    marginLeft: 4,
    marginRight: 6,
  },
  bannerDot: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    marginRight: 6,
  },
  viewButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewText: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});