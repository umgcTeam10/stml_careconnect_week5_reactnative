// CalendarScreen.tsx
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// eslint-disable-next-line import/no-unresolved
import { Calendar } from "react-native-calendars";

import { AppTabParamList } from "@/src/navigation/AppTabs"; // ✅ adjust path/name if yours differs
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { colors, fontSizes, spacing } from "@/src/utils/theme";

type CalendarScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, "Calendar">,
  NativeStackScreenProps<RootStackParamList>
>;

const cardBorder = "#E3E8F1";
const mutedText = "#5F6775";
const chipRed = "#FDECEC";
const chipRedText = "#C12C2C";
const chipBlue = "#E6F0FF";
const chipBlueText = "#2F5DA8";
const chipTeal = "#0E7C9A";
const calendarSelected = "#0F4C81";

function daysInMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

function monthLabel(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// YYYY-MM-DD for react-native-calendars
function toISODateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function CalendarScreen({ navigation }: CalendarScreenProps) {
  const [focusedMonth, setFocusedMonth] = useState(() => new Date(2026, 0, 1)); // Jan 2026
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 0, 26)); // Jan 26 2026

  const eventDates = useMemo(() => [new Date(2026, 0, 27)], []);

  const changeMonth = (offset: number) => {
    const next = new Date(
      focusedMonth.getFullYear(),
      focusedMonth.getMonth() + offset,
      1,
    );

    const dim = daysInMonth(next.getFullYear(), next.getMonth());
    const safeDay = clamp(selectedDate.getDate(), 1, dim);

    setFocusedMonth(next);
    setSelectedDate(new Date(next.getFullYear(), next.getMonth(), safeDay));
  };

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};

    // event dots
    for (const d of eventDates) {
      const key = toISODateKey(d);
      marks[key] = { ...(marks[key] ?? {}), marked: true, dotColor: chipTeal };
    }

    // selected day
    const selectedKey = toISODateKey(selectedDate);
    marks[selectedKey] = {
      ...(marks[selectedKey] ?? {}),
      selected: true,
      selectedColor: calendarSelected,
      selectedTextColor: "#FFFFFF",
    };

    return marks;
  }, [eventDates, selectedDate]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          accessibilityLabel="Back"
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.monthBar}>
          <TouchableOpacity
            accessibilityLabel="Previous month"
            onPress={() => changeMonth(-1)}
            style={styles.monthBtn}
          >
            <Text style={styles.monthBtnText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.monthLabelWrap}>
            <Text style={styles.monthLabel}>{monthLabel(focusedMonth)}</Text>
          </View>

          <TouchableOpacity
            accessibilityLabel="Next month"
            onPress={() => changeMonth(1)}
            style={styles.monthBtn}
          >
            <Text style={styles.monthBtnText}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 16 }} />

        <View style={styles.calendarCard}>
          <Calendar
            current={toISODateKey(focusedMonth)}
            markedDates={markedDates}
            markingType="dot"
            hideArrows={true} // you already have your own month bar
            renderHeader={() => null} // hide built-in month label
            onDayPress={(day) => {
              const [y, m, d] = day.dateString.split("-").map(Number);
              setSelectedDate(new Date(y, m - 1, d));
            }}
            onMonthChange={(m) => {
              // keeps your month label synced when user swipes
              setFocusedMonth(new Date(m.year, m.month - 1, 1));
            }}
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              textSectionTitleColor: mutedText,
              dayTextColor: mutedText,
              todayTextColor: chipTeal,
              textDayFontWeight: "600",
              textDayHeaderFontWeight: "600",
              textDayFontSize: 14,
              textDayHeaderFontSize: 12,
            }}
            style={{ paddingBottom: 4 }}
          />
        </View>

        <View style={{ height: 18 }} />

        <Text style={styles.sectionTitle}>Today&apos;s Schedule</Text>
        <View style={{ height: 12 }} />

        <ScheduleCard
          title="Morning Medication"
          time="08:00 AM"
          iconText="📅"
          tagLabel="high"
          tagBackground={chipRed}
          tagForeground={chipRedText}
        />

        <View style={{ height: 12 }} />

        <ScheduleCard
          title={"Physical Therapy\nAppointment"}
          time="02:00 PM"
          iconText="📅"
          tagLabel="high"
          tagBackground={chipRed}
          tagForeground={chipRedText}
        />

        <View style={{ height: 12 }} />

        <ScheduleCard
          title="Evening Walk"
          time="05:30 PM"
          iconText="📅"
          tagLabel="medium"
          tagBackground={chipBlue}
          tagForeground={chipBlueText}
        />

        <View style={{ height: 12 }} />

        <ScheduleCard
          title="Physical Therapy"
          time="02:00 PM"
          iconText="🏥"
          tagLabel="therapy"
          tagBackground="#F1F5F9"
          tagForeground="#334155"
        />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ScheduleCard({
  title,
  time,
  iconText,
  tagLabel,
  tagBackground,
  tagForeground,
}: {
  title: string;
  time: string;
  iconText: string;
  tagLabel: string;
  tagBackground: string;
  tagForeground: string;
}) {
  return (
    <View style={styles.scheduleCard}>
      <View style={styles.scheduleIconWrap}>
        <Text style={styles.scheduleIcon}>{iconText}</Text>
      </View>

      <View style={{ width: 14 }} />

      <View style={{ flex: 1 }}>
        <Text style={styles.scheduleTitle}>{title}</Text>
        <View style={{ height: 6 }} />
        <Text style={styles.scheduleTime}>{time}</Text>
      </View>

      <TagChip
        label={tagLabel}
        background={tagBackground}
        foreground={tagForeground}
      />
    </View>
  );
}

function TagChip({
  label,
  background,
  foreground,
}: {
  label: string;
  background: string;
  foreground: string;
}) {
  return (
    <View style={[styles.chip, { backgroundColor: background }]}>
      <Text style={[styles.chipText, { color: foreground }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  headerRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  backBtn: { paddingVertical: 6, paddingHorizontal: 6 },
  backText: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
  headerTitle: {
    marginLeft: 4,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },

  divider: { height: 1, backgroundColor: cardBorder },

  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },

  monthBar: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  monthBtn: { paddingHorizontal: spacing.md, paddingVertical: 4 },
  monthBtnText: { color: colors.textPrimary, fontSize: 24, fontWeight: "700" },
  monthLabelWrap: { flex: 1, alignItems: "center" },
  monthLabel: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },

  calendarCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
  },

  sectionTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: "700" },

  scheduleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EFF4FA",
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleIcon: { fontSize: 18 },
  scheduleTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  scheduleTime: { color: mutedText, fontSize: 13 },
  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  chipText: { fontSize: 11, fontWeight: "600" },
});
