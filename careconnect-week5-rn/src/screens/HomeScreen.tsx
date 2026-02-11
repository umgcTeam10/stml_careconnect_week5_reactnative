import { Feather, Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppTabParamList } from "@/src/navigation/AppTabs";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { colors, fontSizes, spacing } from "@/src/utils/theme";

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;
type RoleValue = "careRecipient" | "caregiver" | null;
type PriorityLevel = "medium" | "low";

const ROLE_STORAGE_KEY = "careconnect.role";
const QUICK_STATS = [
  {
    id: "completed",
    iconName: "check",
    iconColor: "#1F8F5A",
    iconBackground: "#ECF8F1",
    value: "1",
    label: "Completed",
  },
  {
    id: "pending",
    iconName: "clock",
    iconColor: "#2A71B8",
    iconBackground: "#EAF3FD",
    value: "2",
    label: "Pending",
  },
  {
    id: "appointments",
    iconName: "calendar",
    iconColor: colors.primary,
    iconBackground: "#E6EEF8",
    value: "3",
    label: "Appointments",
  },
] as const;
const TODAY_TASKS = [
  {
    id: "blood-pressure",
    title: "Blood Pressure Check",
    time: "09:00 AM",
    priority: "medium" as PriorityLevel,
  },
  {
    id: "prepare-lunch",
    title: "Prepare Lunch",
    time: "12:00 PM",
    priority: "medium" as PriorityLevel,
  },
];
const TODAY_DATE_LABEL = "Monday, January 26, 2026";
const TODAY_TIME_LABEL = "4:02 PM";

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [role, setRole] = useState<RoleValue>(null);

  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem(ROLE_STORAGE_KEY);
        if (storedRole === "careRecipient" || storedRole === "caregiver") {
          setRole(storedRole);
        }
      } catch {
        setRole(null);
      }
    };

    loadRole();
  }, []);

  const roleLabel = role === "caregiver" ? "Caregiver" : "Patient";

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerDate}>{TODAY_DATE_LABEL}</Text>
          <Text style={styles.headerTime}>{TODAY_TIME_LABEL}</Text>
          <View style={styles.headerRow}>
            <TouchableOpacity
              accessibilityLabel="Change role"
              accessibilityHint="Navigates to the role selection screen"
              onPress={() => navigation.navigate("Auth", { screen: "Role" })}
              style={styles.identityButton}
            >
              <Feather color={colors.onPrimary} name="user" size={16} />
              <Text style={styles.identityName}>Robert</Text>
              <View style={styles.rolePill}>
                <Text style={styles.rolePillText}>{roleLabel}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.dashboardChip}>
              <Feather color={colors.onPrimary} name="home" size={15} />
              <Text style={styles.dashboardChipText}>Home Dashboard</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Your Health Today</Text>
        <Text style={styles.sectionSubtitle}>
          {"Here's your care summary for today"}
        </Text>

        <View style={styles.card}>
          <View style={styles.wellnessHeader}>
            <View style={styles.wellnessIconCircle}>
              <Feather color={colors.primary} name="smile" size={22} />
            </View>
            <View style={styles.wellnessCopy}>
              <Text style={styles.cardHeading}>How are you feeling today?</Text>
              <Text style={styles.cardSubheading}>
                Take a moment to log your mood and symptoms
              </Text>
            </View>
          </View>
          <TouchableOpacity
            accessibilityLabel="Log Wellness Check"
            onPress={() => navigation.navigate("HealthLogs")}
            style={styles.primaryAction}
          >
            <Text style={styles.primaryActionText}>Log Wellness Check</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickStatsRow}>
          {QUICK_STATS.map((stat) => (
            <View key={stat.id} style={styles.quickStatCard}>
              <View
                style={[
                  styles.quickStatIconCircle,
                  { backgroundColor: stat.iconBackground },
                ]}
              >
                <Feather
                  color={stat.iconColor}
                  name={stat.iconName}
                  size={16}
                />
              </View>
              <Text style={styles.quickStatValue}>{stat.value}</Text>
              <Text style={styles.quickStatLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Next Appointment</Text>
            <View style={styles.tagChip}>
              <Text style={styles.tagText}>therapy</Text>
            </View>
          </View>
          <Text style={styles.appointmentTitle}>Physical Therapy</Text>
          <Text style={styles.appointmentSubtitle}>
            Knee rehabilitation session
          </Text>
          <View style={styles.infoLine}>
            <Feather color={colors.primary} name="calendar" size={15} />
            <Text style={styles.infoLineText}>Monday, Jan 26 at 02:00 PM</Text>
          </View>
          <View style={styles.infoLine}>
            <Feather color={colors.primary} name="activity" size={15} />
            <Text style={styles.infoLineText}>Dr. Lisa Chen, PT</Text>
          </View>
          <TouchableOpacity
            accessibilityLabel="Set reminder"
            style={styles.outlineAction}
          >
            <Ionicons
              color={colors.textPrimary}
              name="notifications-outline"
              size={16}
            />
            <Text style={styles.outlineActionText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{"Today's Tasks"}</Text>
            <TouchableOpacity
              accessibilityLabel="View all tasks"
              onPress={() => navigation.navigate("Tasks")}
              style={styles.viewAll}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Feather color={colors.primary} name="chevron-right" size={16} />
            </TouchableOpacity>
          </View>
          {TODAY_TASKS.map((task) => (
            <View key={task.id} style={styles.taskRow}>
              <View style={styles.taskLeft}>
                <View style={styles.taskCircle} />
                <View>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>
              </View>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Recent Wellness Check</Text>
            <TouchableOpacity
              accessibilityLabel="View all wellness checks"
              onPress={() => navigation.navigate("HealthLogs")}
              style={styles.viewAll}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Feather color={colors.primary} name="chevron-right" size={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.wellnessEntry}>
            <View style={styles.wellnessEntryIcon}>
              <Feather color={colors.onPrimary} name="smile" size={16} />
            </View>
            <View>
              <Text style={styles.wellnessEntryTitle}>Mood Check</Text>
              <Text style={styles.wellnessEntrySubtitle}>
                Feeling good today
              </Text>
              <Text style={styles.wellnessEntryTime}>Jan 26, 1:59 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.teamCard}>
          <View style={styles.teamTitleRow}>
            <Feather color={colors.onPrimary} name="heart" size={16} />
            <Text style={styles.teamTitle}>Your care team is here for you</Text>
          </View>
          <Text style={styles.teamSubtitle}>
            Need help or have questions? Reach out anytime.
          </Text>
          <TouchableOpacity
            accessibilityLabel="Send message"
            onPress={() => navigation.navigate("Messages")}
            style={styles.teamAction}
          >
            <Text style={styles.teamActionText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Summary</Text>
          <Text style={styles.summarySubtitle}>
            Recent vitals and measurements
          </Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <View style={[styles.summaryIconCircle, styles.summaryIconBlue]}>
                <Feather color={colors.primary} name="activity" size={15} />
              </View>
              <View>
                <Text style={styles.summaryTitle}>Blood Pressure</Text>
                <Text style={styles.summaryTime}>1 hour ago</Text>
              </View>
            </View>
            <Text style={styles.summaryValue}>120/80</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <View style={[styles.summaryIconCircle, styles.summaryIconRed]}>
                <Feather color="#D64545" name="heart" size={15} />
              </View>
              <View>
                <Text style={styles.summaryTitle}>Heart Rate</Text>
                <Text style={styles.summaryTime}>1 hour ago</Text>
              </View>
            </View>
            <Text style={styles.summaryValue}>72 bpm</Text>
          </View>
          <TouchableOpacity
            accessibilityLabel="Go to Health Logs"
            onPress={() => navigation.navigate("HealthLogs")}
            style={styles.outlineWideAction}
            testID="home-health-logs"
          >
            <Text style={styles.outlineActionText}>View Full History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.nowBar}>
        <View style={styles.nowLeft}>
          <Feather color={colors.onPrimary} name="clock" size={14} />
          <View style={styles.nowCopy}>
            <Text numberOfLines={1} style={styles.nowTitle}>
              Now: Physical Therapy Appointment
            </Text>
            <Text style={styles.nowMeta}>02:00 PM • 4st act</Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityLabel="View appointment details"
          onPress={() => navigation.navigate("Calendar")}
          style={styles.nowAction}
        >
          <Text style={styles.nowActionText}>View</Text>
          <Feather color={colors.onPrimary} name="chevron-right" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerSafeArea: {
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerDate: {
    color: colors.onPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
  headerTime: {
    color: colors.onPrimary,
    fontSize: 44,
    fontWeight: "700",
    lineHeight: 52,
    marginTop: 2,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  identityButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  identityName: {
    color: colors.onPrimary,
    fontSize: fontSizes.sm,
    fontWeight: "600",
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  rolePill: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  rolePillText: {
    color: colors.onPrimary,
    fontSize: fontSizes.xs,
    fontWeight: "600",
  },
  dashboardChip: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  dashboardChipText: {
    color: colors.onPrimary,
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  contentContainer: {
    backgroundColor: colors.surface,
    paddingBottom: 120,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 38,
    fontWeight: "700",
    lineHeight: 44,
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  wellnessHeader: {
    flexDirection: "row",
  },
  wellnessIconCircle: {
    alignItems: "center",
    backgroundColor: "#E9F3FB",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginRight: spacing.md,
    width: 48,
  },
  wellnessCopy: {
    flex: 1,
  },
  cardHeading: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
  cardSubheading: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
  primaryAction: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  primaryActionText: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "700",
  },
  quickStatsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  quickStatCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
  },
  quickStatIconCircle: {
    alignItems: "center",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  quickStatValue: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "700",
    marginTop: spacing.sm,
  },
  quickStatLabel: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    fontWeight: "500",
    marginTop: 2,
  },
  rowBetween: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },
  tagChip: {
    backgroundColor: colors.background,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "lowercase",
  },
  appointmentTitle: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
    marginTop: spacing.lg,
  },
  appointmentSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
  infoLine: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: spacing.md,
  },
  infoLineText: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: "500",
    marginLeft: spacing.sm,
  },
  outlineAction: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  outlineActionText: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
  viewAll: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  taskRow: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
  },
  taskLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  taskCircle: {
    borderColor: "#90A0B5",
    borderRadius: 9,
    borderWidth: 2,
    height: 18,
    marginRight: spacing.sm,
    width: 18,
  },
  taskTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  taskTime: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginTop: 2,
  },
  priorityBadge: {
    backgroundColor: "#E9F3FD",
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  priorityText: {
    color: colors.primary,
    fontSize: fontSizes.sm,
    fontWeight: "700",
    textTransform: "lowercase",
  },
  wellnessEntry: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  wellnessEntryIcon: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginRight: spacing.md,
    width: 40,
  },
  wellnessEntryTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
  wellnessEntrySubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: 2,
  },
  wellnessEntryTime: {
    color: "#536173",
    fontSize: fontSizes.md,
    marginTop: spacing.sm,
  },
  teamCard: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  teamTitleRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  teamTitle: {
    color: colors.onPrimary,
    flex: 1,
    fontSize: fontSizes.lg,
    fontWeight: "700",
    marginLeft: spacing.sm,
  },
  teamSubtitle: {
    color: "#DCE8F5",
    fontSize: fontSizes.md,
    marginTop: spacing.sm,
  },
  teamAction: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.onPrimary,
    borderRadius: 8,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  teamActionText: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: "700",
  },
  summarySubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
  summaryRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  summaryLeft: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  summaryIconCircle: {
    alignItems: "center",
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    marginRight: spacing.sm,
    width: 32,
  },
  summaryIconBlue: {
    backgroundColor: "#E9F3FD",
  },
  summaryIconRed: {
    backgroundColor: "#FDEEEF",
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  summaryTime: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
    marginTop: 2,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
  outlineWideAction: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  nowBar: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopWidth: 1,
    borderTopColor: colors.navy,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    minHeight: 56,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    position: "absolute",
    right: 0,
  },
  nowLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginRight: spacing.sm,
  },
  nowCopy: {
    marginLeft: spacing.sm,
  },
  nowTitle: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "700",
  },
  nowMeta: {
    color: "#DCE8F5",
    fontSize: fontSizes.sm,
    marginTop: 2,
  },
  nowAction: {
    alignItems: "center",
    flexDirection: "row",
  },
  nowActionText: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
});
