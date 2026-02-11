import { Feather } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { PrimaryButton } from "@/src/components/PrimaryButton";
import { colors, fontSizes, spacing } from "@/src/utils/theme";

type SummaryTone = "today" | "overdue" | "done";

type SummaryItem = {
  value: string;
  label: string;
  tone: SummaryTone;
};

type UpcomingTask = {
  id: string;
  shortType: string;
  title: string;
  subtitle: string;
  time: string;
  date: string;
  priority: string;
  contextHint: string;
};

const summaryItems: SummaryItem[] = [
  { value: "3", label: "Today", tone: "today" },
  { value: "2", label: "Overdue", tone: "overdue" },
  { value: "1", label: "Done", tone: "done" },
];

const summaryToneStyles: Record<
  SummaryTone,
  { valueColor: string; borderColor: string; backgroundColor: string }
> = {
  today: {
    valueColor: colors.primary,
    borderColor: "#D6E3F5",
    backgroundColor: "#FAFCFF",
  },
  overdue: {
    valueColor: "#BC6D15",
    borderColor: "#F5D8B7",
    backgroundColor: "#FFF9F2",
  },
  done: {
    valueColor: "#0F6B57",
    borderColor: "#D3EDE5",
    backgroundColor: "#F4FBF8",
  },
};

const taskTabs = ["Upcoming", "Today", "Overdue", "Done"];

const upcomingTasks: UpcomingTask[] = [
  {
    id: "blood-pressure",
    shortType: "BP",
    title: "Blood Pressure Check",
    subtitle: "Record morning blood pressure reading",
    time: "09:00 AM",
    date: "Jan 27",
    priority: "medium",
    contextHint: "With breakfast",
  },
  {
    id: "prepare-lunch",
    shortType: "Meal",
    title: "Prepare Lunch",
    subtitle: "Low-sodium, diabetic-friendly meal",
    time: "12:00 PM",
    date: "Jan 27",
    priority: "medium",
    contextHint: "With lunch",
  },
];

export function TasksScreen() {
  const handlePress = () => undefined;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          {summaryItems.map((item) => {
            const toneStyle = summaryToneStyles[item.tone];

            return (
              <View
                key={item.label}
                style={[
                  styles.summaryCard,
                  {
                    borderColor: toneStyle.borderColor,
                    backgroundColor: toneStyle.backgroundColor,
                  },
                ]}
              >
                <Text
                  style={[styles.summaryValue, { color: toneStyle.valueColor }]}
                >
                  {item.value}
                </Text>
                <Text style={styles.summaryLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.addTaskButtonWrap}>
            <PrimaryButton
              accessibilityLabel="Add task"
              onPress={handlePress}
              title="+  Add Task"
            />
          </View>
          <TouchableOpacity
            accessibilityLabel="Filter tasks"
            accessibilityRole="button"
            onPress={handlePress}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.overdueBanner}>
          <View style={styles.overdueBannerLeft}>
            <View style={styles.overdueIconCircle}>
              <Text style={styles.overdueIconText}>!</Text>
            </View>
            <Text style={styles.overdueBannerText}>
              You have 2 overdue tasks
            </Text>
          </View>
          <TouchableOpacity
            accessibilityLabel="View overdue tasks"
            accessibilityRole="button"
            onPress={handlePress}
            style={styles.overdueViewButton}
          >
            <Text style={styles.overdueViewButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nowCard}>
          <View style={styles.nowHeader}>
            <View style={styles.nowIconCircle}>
              <Text style={styles.nowIconText}>!</Text>
            </View>
            <View style={styles.nowBody}>
              <View style={styles.nowBadgeRow}>
                <View style={styles.nowBadge}>
                  <Text style={styles.nowBadgeText}>Now</Text>
                </View>
                <View style={styles.nowTypeBadge}>
                  <Text style={styles.nowTypeBadgeText}>PT</Text>
                </View>
              </View>
              <Text style={styles.nowTitle}>Physical Therapy Appointment</Text>
              <Text style={styles.nowMeta}>Due now - 02:00 PM | At clinic</Text>
            </View>
          </View>
          <View style={styles.nowActionsRow}>
            <View style={styles.halfActionButton}>
              <PrimaryButton
                accessibilityLabel="Start task now"
                onPress={handlePress}
                title="Start"
              />
            </View>
            <TouchableOpacity
              accessibilityLabel="Snooze task for 10 minutes"
              accessibilityRole="button"
              onPress={handlePress}
              style={styles.secondaryActionButton}
            >
              <Text style={styles.secondaryActionButtonText}>
                Snooze 10 min
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsRow}>
          {taskTabs.map((tabLabel) => {
            const isSelected = tabLabel === "Upcoming";

            return (
              <TouchableOpacity
                key={tabLabel}
                accessibilityLabel={`Show ${tabLabel.toLowerCase()} tasks`}
                accessibilityRole="button"
                onPress={handlePress}
                style={[
                  styles.tabButton,
                  isSelected && styles.tabButtonSelected,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabButtonText,
                    isSelected && styles.tabButtonTextSelected,
                  ]}
                >
                  {tabLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {upcomingTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <View style={styles.taskCardBody}>
              <TouchableOpacity
                accessibilityLabel={`Mark ${task.title} done`}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: false }}
                onPress={handlePress}
                style={styles.checkbox}
              />
              <View style={styles.taskDetails}>
                <View style={styles.taskTitleRow}>
                  <View style={styles.taskTypeBadge}>
                    <Text style={styles.taskTypeBadgeText}>
                      {task.shortType}
                    </Text>
                  </View>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                </View>
                <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
                <View style={styles.taskMetaRow}>
                  <Text style={styles.taskMetaText}>Time {task.time}</Text>
                  <Text style={styles.taskMetaText}>Date {task.date}</Text>
                  <View style={styles.priorityBadge}>
                    <Text style={styles.priorityBadgeText}>
                      {task.priority}
                    </Text>
                  </View>
                </View>
                <View style={styles.contextHintBadge}>
                  <Text style={styles.contextHintText}>{task.contextHint}</Text>
                </View>
              </View>
            </View>
            <View style={styles.taskActionsRow}>
              <View style={styles.halfActionButton}>
                <PrimaryButton
                  accessibilityLabel={`Mark ${task.title} as done`}
                  onPress={handlePress}
                  title="Done"
                />
              </View>
              <TouchableOpacity
                accessibilityLabel={`Reschedule ${task.title}`}
                accessibilityRole="button"
                onPress={handlePress}
                style={styles.secondaryActionButton}
              >
                <Text style={styles.secondaryActionButtonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.nowBar}>
        <View style={styles.nowBarLeft}>
          <Feather color={colors.onPrimary} name="clock" size={14} />
          <View style={styles.nowBarCopy}>
            <Text numberOfLines={1} style={styles.nowBarTitle}>
              Now: Physical Therapy Appointment
            </Text>
            <Text style={styles.nowBarMeta}>02:00 PM • At clinic</Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityLabel="View appointment details"
          accessibilityRole="button"
          onPress={handlePress}
          style={styles.nowBarAction}
        >
          <Text style={styles.nowBarActionText}>View</Text>
          <Feather color={colors.onPrimary} name="chevron-right" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 120,
    gap: spacing.xl,
  },
  summaryRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 108,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  summaryValue: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "700",
  },
  summaryLabel: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "500",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  addTaskButtonWrap: {
    flex: 1,
  },
  filterButton: {
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    color: colors.primary,
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  overdueBanner: {
    borderWidth: 1,
    borderColor: "#F1B77A",
    backgroundColor: "#FFFDF9",
    borderRadius: 16,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  overdueBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: spacing.md,
  },
  overdueIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1B77A",
    backgroundColor: "#FFF4E8",
    alignItems: "center",
    justifyContent: "center",
  },
  overdueIconText: {
    color: "#BC6D15",
    fontSize: fontSizes.md,
    fontWeight: "700",
  },
  overdueBannerText: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
    flexShrink: 1,
  },
  overdueViewButton: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  overdueViewButtonText: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },
  nowCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  nowHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  nowIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  nowIconText: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "700",
  },
  nowBody: {
    flex: 1,
    gap: spacing.sm,
  },
  nowBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  nowBadge: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  nowBadgeText: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  nowTypeBadge: {
    borderRadius: 8,
    backgroundColor: "#E9EEF7",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  nowTypeBadgeText: {
    color: colors.textPrimary,
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  nowTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.xl,
    fontWeight: "700",
  },
  nowMeta: {
    color: colors.textSecondary,
    fontSize: fontSizes.lg,
    lineHeight: 28,
  },
  nowActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  halfActionButton: {
    flex: 1,
  },
  secondaryActionButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  secondaryActionButtonText: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },
  tabsRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  tabButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    paddingHorizontal: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonSelected: {
    backgroundColor: colors.background,
  },
  tabButtonText: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "500",
  },
  tabButtonTextSelected: {
    fontWeight: "700",
  },
  taskCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  taskCardBody: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginTop: 2,
  },
  taskDetails: {
    flex: 1,
    gap: spacing.md,
  },
  taskTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  taskTypeBadge: {
    borderRadius: 6,
    backgroundColor: "#EEF4FC",
    borderWidth: 1,
    borderColor: "#D7E4F7",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  taskTypeBadgeText: {
    color: colors.primary,
    fontSize: fontSizes.xs,
    fontWeight: "700",
  },
  taskTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
  taskSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.lg,
    lineHeight: 28,
  },
  taskMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.md,
  },
  taskMetaText: {
    color: colors.textSecondary,
    fontSize: fontSizes.lg,
    fontWeight: "500",
  },
  priorityBadge: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  priorityBadgeText: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
    textTransform: "lowercase",
  },
  contextHintBadge: {
    alignSelf: "flex-start",
    borderRadius: 8,
    backgroundColor: "#E9F4FF",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  contextHintText: {
    color: colors.primary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  taskActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  nowBar: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopColor: colors.navy,
    borderTopWidth: 1,
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
  nowBarLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginRight: spacing.sm,
  },
  nowBarCopy: {
    marginLeft: spacing.sm,
  },
  nowBarTitle: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "700",
  },
  nowBarMeta: {
    color: "#DCE8F5",
    fontSize: fontSizes.sm,
    marginTop: 2,
  },
  nowBarAction: {
    alignItems: "center",
    flexDirection: "row",
  },
  nowBarActionText: {
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
});
