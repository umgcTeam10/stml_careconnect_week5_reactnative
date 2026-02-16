import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/types";
import { colors, fontSizes, spacing } from "../constants/theme";

type ProfileScreenProps = NativeStackScreenProps<HomeStackParamList, "Profile">;

type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  onPress: () => void;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const handleEditProfile = () => {
    Alert.alert(
      "Edit Profile",
      "Update your personal information, photo, and contact details.",
      [{ text: "OK" }],
    );
  };

  const handleNotificationsPress = () => {
    Alert.alert(
      "Notification Settings",
      "Manage your notification preferences for appointments, messages, and health reminders.",
      [{ text: "OK" }],
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert(
      "Privacy Settings",
      "Control who can see your information and how your data is used.",
      [{ text: "OK" }],
    );
  };

  const handleSecurityPress = () => {
    Alert.alert(
      "Security",
      "Manage your password, two-factor authentication, and connected devices.",
      [{ text: "OK" }],
    );
  };

  const handleAccessibilityPress = () => {
    Alert.alert(
      "Accessibility",
      "Customize text size, screen reader settings, and other accessibility features.",
      [{ text: "OK" }],
    );
  };

  const handleLanguagePress = () => {
    Alert.alert(
      "Language & Region",
      "Change your preferred language and regional settings.",
      [{ text: "OK" }],
    );
  };

  const handleHelpPress = () => {
    Alert.alert(
      "Help & Support",
      "Access user guides, FAQs, and contact support team.",
      [{ text: "OK" }],
    );
  };

  const handleAboutPress = () => {
    Alert.alert(
      "About CareConnect",
      "Version 1.0.0\nDesigned for individuals with short-term memory loss.\n\n© 2026 CareConnect Team",
      [{ text: "OK" }],
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.navigate("Welcome");
        },
      },
    ]);
  };

  const menuSections: MenuSection[] = [
    {
      id: "account",
      title: "Account",
      items: [
        {
          id: "notifications",
          label: "Notifications",
          icon: "notifications-outline",
          iconColor: colors.primary,
          onPress: handleNotificationsPress,
        },
        {
          id: "privacy",
          label: "Privacy",
          icon: "lock-closed-outline",
          iconColor: colors.primary,
          onPress: handlePrivacyPress,
        },
        {
          id: "security",
          label: "Security",
          icon: "shield-checkmark-outline",
          iconColor: colors.primary,
          onPress: handleSecurityPress,
        },
      ],
    },
    {
      id: "preferences",
      title: "Preferences",
      items: [
        {
          id: "accessibility",
          label: "Accessibility",
          icon: "accessibility-outline",
          iconColor: colors.primary,
          onPress: handleAccessibilityPress,
        },
        {
          id: "language",
          label: "Language & Region",
          icon: "globe-outline",
          iconColor: colors.primary,
          onPress: handleLanguagePress,
        },
      ],
    },
    {
      id: "support",
      title: "Support",
      items: [
        {
          id: "help",
          label: "Help & Support",
          icon: "help-circle-outline",
          iconColor: colors.primary,
          onPress: handleHelpPress,
        },
        {
          id: "about",
          label: "About",
          icon: "information-circle-outline",
          iconColor: colors.primary,
          onPress: handleAboutPress,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        accessible={false}
        testID="profile-scroll"
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons
              name="person"
              size={48}
              color={colors.primary}
              importantForAccessibility="no-hide-descendants"
            />
          </View>
          <Text style={styles.userName}>Sarah Johnson</Text>
          <Text style={styles.userRole}>Patient</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
            accessibilityHint="Opens form to update your personal information, photo, and contact details"
            testID="edit-profile-button"
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={colors.white}
              importantForAccessibility="no-hide-descendants"
            />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {menuSections.map((section) => (
          <View key={section.id} style={styles.menuSection}>
            <Text style={styles.sectionTitle} accessibilityRole="header">
              {section.title}
            </Text>
            <View style={styles.menuItems}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    index === section.items.length - 1 && styles.menuItemLast,
                  ]}
                  onPress={item.onPress}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityHint={`Opens ${item.label.toLowerCase()} settings`}
                  testID={`menu-item-${item.id}`}
                >
                  <View style={styles.menuItemLeft}>
                    <View
                      style={[
                        styles.menuIconContainer,
                        { backgroundColor: `${item.iconColor}15` },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={22}
                        color={item.iconColor}
                        importantForAccessibility="no-hide-descendants"
                      />
                    </View>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textSecondary}
                    importantForAccessibility="no-hide-descendants"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Logout"
          accessibilityHint="Logout from your account. You will need to login again to access the app"
          testID="logout-button"
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color={colors.error}
            importantForAccessibility="no-hide-descendants"
          />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text
          style={styles.versionText}
          accessibilityLabel="CareConnect version 1.0.0"
        >
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: fontSizes.xxl,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userRole: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.xs,
  },
  editButtonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  menuSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.sm,
    fontWeight: "600",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  menuItems: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemLabel: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.white,
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutButtonText: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.error,
  },
  versionText: {
    textAlign: "center",
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    opacity: 0.85,
  },
});
