import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import type { HomeStackParamList } from "@/src/navigation/HomeStack";
import { colors, fontSizes, spacing } from "@/src/utils/theme";

type HealthLogsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "HealthLogs"
>;

type LogEntry = {
  id: number;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  tag: string;
  tagColor: string;
  time: string;
  note?: string;
  details?: Record<string, string | number>;
};

export function HealthLogsScreen({ navigation }: HealthLogsScreenProps) {
  const [selectedTab, setSelectedTab] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const tabs = [
    "All",
    "Vitals",
    "Meds",
    "Meals",
    "Mood",
    "Symptoms",
    "Activity",
  ];

  const logEntries: LogEntry[] = [
    {
      id: 1,
      title: "Blood Pressure",
      icon: "fitness-outline",
      iconColor: colors.primary,
      iconBg: "#E3F2FD",
      tag: "vitals",
      tagColor: "#E3F2FD",
      time: "1 hour ago",
      note: "120/80 mmHg",
      details: {
        "systolic: 120": "120",
        "diastolic: 80": "80",
        "heartRate: 72": "72",
      },
    },
    {
      id: 2,
      title: "Mood Check",
      icon: "happy-outline",
      iconColor: "#FFA726",
      iconBg: "#FFF3E0",
      tag: "mood",
      tagColor: "#FFF3E0",
      time: "2 hours ago",
      note: "Feeling good today",
      details: {
        "mood: happy": "happy",
        "energy: high": "high",
      },
    },
    {
      id: 3,
      title: "Medication Taken",
      icon: "medical-outline",
      iconColor: colors.primary,
      iconBg: "#E3F2FD",
      tag: "medication",
      tagColor: "#E8F5E9",
      time: "3 hours ago",
      note: "Morning medications completed",
      details: {
        "medications: Lisinopril 10mg, Metformin 500mg":
          "Lisinopril 10mg, Metformin 500mg",
      },
    },
    {
      id: 4,
      title: "Breakfast",
      icon: "restaurant-outline",
      iconColor: "#66BB6A",
      iconBg: "#E8F5E9",
      tag: "meal",
      tagColor: "#FFF9C4",
      time: "4 hours ago",
      note: "Oatmeal with berries, green tea",
      details: {
        "calories: 320": "320",
        "protein: 12": "12",
      },
    },
    {
      id: 5,
      title: "No symptoms reported",
      icon: "checkmark-circle-outline",
      iconColor: "#4CAF50",
      iconBg: "#E8F5E9",
      tag: "symptoms",
      tagColor: "#E8F5E9",
      time: "1 day ago",
      note: "Feeling well, no concerns",
    },
  ];

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSummaryCardPress = (cardType: string) => {
    Alert.alert(
      `${cardType} Details`,
      `View detailed ${cardType.toLowerCase()} information and history.`,
      [{ text: "OK" }],
    );
  };

  const handleAddLog = () => {
    Alert.alert(
      "Add Health Log",
      "Feature coming soon: Record a new health log entry.",
      [{ text: "OK" }],
    );
  };

  const handleViewAppointment = () => {
    Alert.alert(
      "Appointment Details",
      "Physical Therapy Appointment\nTime: 02:00 PM\nLocation: At clinic",
      [{ text: "Close" }],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        testID="health-logs-scroll"
        accessible={false}
      >
        <View style={styles.summaryGrid}>
          <View style={styles.summaryRow}>
            <TouchableOpacity
              style={styles.summaryCard}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Blood pressure today, 120 over 80 millimeters of mercury"
              accessibilityHint="View detailed blood pressure history"
              onPress={() => handleSummaryCardPress("Blood Pressure")}
            >
              <View
                style={[styles.summaryIcon, { backgroundColor: "#E3F2FD" }]}
              >
                <Ionicons
                  name="fitness-outline"
                  size={20}
                  color={colors.primary}
                  importantForAccessibility="no-hide-descendants"
                />
              </View>
              <Text style={styles.summaryTitle}>BP Today</Text>
              <Text style={styles.summaryValue}>120/80</Text>
              <Text style={styles.summaryUnit}>mmHg</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.summaryCard}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Medications today, 2 of 2 completed"
              accessibilityHint="View medication details"
              onPress={() => handleSummaryCardPress("Medications")}
            >
              <View
                style={[styles.summaryIcon, { backgroundColor: "#E3F2FD" }]}
              >
                <Ionicons
                  name="medical-outline"
                  size={20}
                  color={colors.primary}
                  importantForAccessibility="no-hide-descendants"
                />
              </View>
              <Text style={styles.summaryTitle}>Medications</Text>
              <Text style={styles.summaryValue}>2/2</Text>
              <Text style={styles.summaryUnit}>Completed</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryRow}>
            <TouchableOpacity
              style={styles.summaryCard}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Meals today, 1240 calories consumed"
              accessibilityHint="View meal history"
              onPress={() => handleSummaryCardPress("Meals")}
            >
              <View
                style={[styles.summaryIcon, { backgroundColor: "#E8F5E9" }]}
              >
                <Ionicons
                  name="restaurant-outline"
                  size={20}
                  color="#66BB6A"
                  importantForAccessibility="no-hide-descendants"
                />
              </View>
              <Text style={styles.summaryTitle}>Meals</Text>
              <Text style={styles.summaryValue}>1,240</Text>
              <Text style={styles.summaryUnit}>Calories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.summaryCard}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Mood today is good, trending up and improving"
              accessibilityHint="View mood history"
              onPress={() => handleSummaryCardPress("Mood")}
            >
              <View
                style={[styles.summaryIcon, { backgroundColor: "#FFF3E0" }]}
              >
                <Ionicons
                  name="happy-outline"
                  size={20}
                  color="#FFA726"
                  importantForAccessibility="no-hide-descendants"
                />
              </View>
              <Text style={styles.summaryTitle}>Mood</Text>
              <Text style={styles.summaryValue}>Good</Text>
              <View style={styles.summaryBottom}>
                <Text style={styles.summaryUnit}>Improving</Text>
                <Ionicons
                  name="trending-up"
                  size={14}
                  color="#4CAF50"
                  importantForAccessibility="no-hide-descendants"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.tabsContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          accessible={false}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`${tab} filter`}
              accessibilityState={{ selected: selectedTab === tab }}
              accessibilityHint={`Filter health logs to show ${tab.toLowerCase()} entries`}
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
              testID={`tab-${tab.toLowerCase()}`}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.logsContainer}>
          {logEntries.map((entry) => (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`${entry.title}, ${entry.note || "no note"}, ${entry.time}, ${entry.tag} category`}
              accessibilityState={{ expanded: expandedId === entry.id }}
              accessibilityHint={
                expandedId === entry.id
                  ? "Collapse details"
                  : "Expand to view details"
              }
              key={entry.id}
              onPress={() => toggleExpanded(entry.id)}
              style={styles.logEntry}
              testID={`log-entry-${entry.id}`}
            >
              <View style={styles.logHeader}>
                <View
                  style={[styles.logIcon, { backgroundColor: entry.iconBg }]}
                >
                  <Ionicons
                    color={entry.iconColor}
                    name={entry.icon}
                    size={20}
                    importantForAccessibility="no-hide-descendants"
                  />
                </View>
                <View style={styles.logContent}>
                  <Text style={styles.logTitle}>{entry.title}</Text>
                  {entry.note && (
                    <Text style={styles.logNote}>{entry.note}</Text>
                  )}
                  <View style={styles.logMeta}>
                    <View
                      style={[styles.tag, { backgroundColor: entry.tagColor }]}
                    >
                      <Text style={styles.tagText}>{entry.tag}</Text>
                    </View>
                    <Text style={styles.logTime}>{entry.time}</Text>
                  </View>
                </View>
              </View>

              {expandedId === entry.id && entry.details && (
                <View
                  style={styles.logDetails}
                  accessible={true}
                  accessibilityLabel={`Details: ${Object.keys(entry.details).join(", ")}`}
                >
                  {Object.entries(entry.details).map(([key]) => (
                    <Text key={key} style={styles.detailText}>
                      {key}
                    </Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Add new health log entry"
        accessibilityHint="Opens form to record a new health log"
        style={styles.fab}
        testID="health-logs-fab"
        onPress={handleAddLog}
      >
        <Ionicons
          color="#FFFFFF"
          name="add"
          size={28}
          importantForAccessibility="no-hide-descendants"
        />
      </TouchableOpacity>

      <View
        style={styles.banner}
        accessible={true}
        accessibilityRole="alert"
        accessibilityLabel="Current appointment, Physical Therapy at 2:00 PM at clinic"
        accessibilityLiveRegion="polite"
      >
        <Ionicons
          name="time-outline"
          size={18}
          color="rgba(255, 255, 255, 0.9)"
          importantForAccessibility="no-hide-descendants"
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>
            Now: Physical Therapy Appointment
          </Text>
          <View style={styles.bannerDetails}>
            <Ionicons
              name="time-outline"
              size={12}
              color="rgba(255, 255, 255, 0.8)"
              importantForAccessibility="no-hide-descendants"
            />
            <Text style={styles.bannerDetailText}>02:00 PM</Text>
            <Text style={styles.bannerDot}>•</Text>
            <Ionicons
              name="location-outline"
              size={12}
              color="rgba(255, 255, 255, 0.8)"
              importantForAccessibility="no-hide-descendants"
            />
            <Text style={styles.bannerDetailText}>At clinic</Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="View appointment details"
          accessibilityHint="Opens appointment information"
          style={styles.viewButton}
          testID="appointment-view"
          onPress={handleViewAppointment}
        >
          <Text style={styles.viewText}>View</Text>
          <Ionicons
            name="arrow-forward"
            size={14}
            color="#FFFFFF"
            importantForAccessibility="no-hide-descendants"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  summaryGrid: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    padding: spacing.lg,
  },
  summaryIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    marginBottom: spacing.sm,
    width: 40,
  },
  summaryTitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  summaryUnit: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
  },
  summaryBottom: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  tabsContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  tabsContent: {
    gap: spacing.sm,
  },
  tab: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  logsContainer: {
    padding: spacing.lg,
  },
  logEntry: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  logHeader: {
    flexDirection: "row",
  },
  logIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  logContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  logTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  logNote: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.sm,
  },
  logMeta: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  tag: {
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: "500",
  },
  logTime: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
  },
  logDetails: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.xs,
  },
  fab: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 28,
    bottom: 80,
    elevation: 8,
    height: 56,
    justifyContent: "center",
    position: "absolute",
    right: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: 56,
  },
  banner: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  bannerContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  bannerDetails: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 4,
  },
  bannerDetailText: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 11,
    marginLeft: 4,
    marginRight: 6,
  },
  bannerDot: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 11,
    marginRight: 6,
  },
  viewButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  viewText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
});
