// CalendarScreen.tsx
// CalendarScreen.tsx
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AppTabParamList } from "@/src/navigation/AppTabs"; // ✅ adjust path/name if yours differs
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { colors, fontSizes, spacing } from "@/src/utils/theme";

type CalendarScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, "Calendar">,
  NativeStackScreenProps<RootStackParamList>
>;

const headerColor = "#0F4C81";
const cardBorder = "#E3E8F1";
const mutedText = "#5F6775";
const chipRed = "#FDECEC";
const chipRedText = "#C12C2C";
const chipBlue = "#E6F0FF";
const chipBlueText = "#2F5DA8";
const chipTeal = "#0E7C9A";
const calendarSelected = "#0F4C81";

type CalendarDay = {
  key: string;
  day: number | null;
  date: Date | null;
  selected: boolean;
  highlight: boolean;
  showDot: boolean;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

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

export function CalendarScreen({ navigation }: CalendarScreenProps) {
  const [focusedMonth, setFocusedMonth] = useState(() => new Date(2026, 0, 1)); // Jan 2026
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 0, 26)); // Jan 26 2026

  const eventDates = useMemo(() => [new Date(2026, 0, 27)], []);

  const showNotImplemented = () => {
    Alert.alert("Not implemented", "Not implemented in Week 4");
  };

  const onNavTap = (index: number) => {
    // AppTabs screens: Home, Tasks, Calendar, Messages, Profile (update names if yours differ)
    switch (index) {
      case 0:
        navigation.navigate("AppTabs", { screen: "Home" });
        return;
      case 1:
        navigation.navigate("AppTabs", { screen: "Tasks" });
        return;
      case 2:
        navigation.navigate("AppTabs", { screen: "Calendar" });
        return;
      case 3:
        navigation.navigate("AppTabs", { screen: "Messages" });
        return;
      case 4:
        navigation.navigate("AppTabs", { screen: "Profile" });
        return;
      default:
        return;
    }
  };

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

  const calendarDays: CalendarDay[] = useMemo(() => {
    const year = focusedMonth.getFullYear();
    const month = focusedMonth.getMonth(); // 0-11

    const firstDay = new Date(year, month, 1);
    const leading = firstDay.getDay(); // 0=Sun ... 6=Sat
    const dim = daysInMonth(year, month);

    const totalCells = leading + dim;
    const trailing = (7 - (totalCells % 7)) % 7;
    const gridCount = totalCells + trailing;

    return Array.from({ length: gridCount }, (_, index) => {
      const inRange = index >= leading && index < leading + dim;
      if (!inRange) {
        return {
          key: `empty-${index}`,
          day: null,
          date: null,
          selected: false,
          highlight: false,
          showDot: false,
        };
      }

      const day = index - leading + 1;
      const date = new Date(year, month, day);

      const selected = isSameDay(date, selectedDate);
      const hasEvent = eventDates.some((d) => isSameDay(d, date));

      return {
        key: `${year}-${month}-${day}`,
        day,
        date,
        selected,
        highlight: hasEvent && !selected,
        showDot: hasEvent && !selected,
      };
    });
  }, [focusedMonth, selectedDate, eventDates]);

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
          <View style={styles.weekRow}>
            {WEEKDAYS.map((d) => (
              <View key={d} style={styles.weekCell}>
                <Text style={styles.weekText}>{d}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 16 }} />

          <View style={styles.grid}>
            {calendarDays.map((d) => (
              <CalendarCell
                key={d.key}
                day={d}
                onSelected={() => {
                  if (d.date) setSelectedDate(d.date);
                }}
              />
            ))}
          </View>
        </View>

        <View style={{ height: 18 }} />

        <Text style={styles.sectionTitle}>Today's Schedule</Text>
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

      <CalendarBottomBar onTap={onNavTap} onNowTap={showNotImplemented} />
    </SafeAreaView>
  );
}

function CalendarCell({
  day,
  onSelected,
}: {
  day: CalendarDay;
  onSelected: () => void;
}) {
  if (day.day == null) return <View style={styles.cellEmpty} />;

  const background = day.selected
    ? calendarSelected
    : day.highlight
      ? chipTeal
      : "transparent";
  const textColor = day.selected || day.highlight ? "#FFFFFF" : mutedText;

  return (
    <TouchableOpacity
      accessibilityLabel={
        day.date ? `Select ${day.date.toDateString()}` : "Empty day"
      }
      onPress={onSelected}
      style={styles.cell}
      activeOpacity={0.8}
    >
      <View style={[styles.cellInner, { backgroundColor: background }]}>
        <Text style={[styles.cellText, { color: textColor }]}>{day.day}</Text>
        {day.showDot ? <View style={styles.dot} /> : null}
      </View>
    </TouchableOpacity>
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

function CalendarBottomBar({
  onTap,
  onNowTap,
}: {
  onTap: (index: number) => void;
  onNowTap: () => void;
}) {
  return (
    <View>
      <View style={styles.nowBar}>
        <Text style={styles.nowIcon}>⏱</Text>
        <View style={{ width: 8 }} />

        <View style={{ flex: 1 }}>
          <Text style={styles.nowTitle}>Now: Physical Therapy Appointment</Text>

          <View style={styles.nowMetaRow}>
            <Text style={styles.nowMetaText}>⏱</Text>
            <Text style={styles.nowMetaText}>02:00 PM</Text>
            <Text style={styles.nowMetaText}>•</Text>
            <Text style={styles.nowMetaText}>🏥</Text>
            <Text style={styles.nowMetaText}>At clinic</Text>
          </View>
        </View>

        <TouchableOpacity
          accessibilityLabel="View current event"
          onPress={onNowTap}
          style={styles.viewBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.viewBtnText}>View</Text>
          <View style={{ width: 4 }} />
          <Text style={styles.viewBtnText}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <NavItem
          label="Home"
          icon="⌂"
          active={false}
          onPress={() => onTap(0)}
        />
        <NavItem
          label="Tasks"
          icon="✓"
          active={false}
          onPress={() => onTap(1)}
        />
        <NavItem label="Calendar" icon="📅" active onPress={() => onTap(2)} />
        <NavItem
          label="Messages"
          icon="💬"
          active={false}
          onPress={() => onTap(3)}
        />
        <NavItem
          label="Profile"
          icon="👤"
          active={false}
          onPress={() => onTap(4)}
        />
      </View>
    </View>
  );
}

function NavItem({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}) {
  const color = active ? colors.primary : mutedText;

  return (
    <TouchableOpacity
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.navItem}
      activeOpacity={0.8}
    >
      <Text style={[styles.navIcon, { color }]}>{icon}</Text>
      <Text style={[styles.navLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
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
  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  weekCell: { width: 32, alignItems: "center" },
  weekText: { color: mutedText, fontSize: 12, fontWeight: "600" },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  cellEmpty: { width: 32, height: 32 },
  cell: { width: 32, height: 32 },
  cellInner: {
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: { fontSize: 14, fontWeight: "600" },
  dot: {
    position: "absolute",
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
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

  nowBar: {
    backgroundColor: headerColor,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  nowIcon: { color: "rgba(255,255,255,0.7)", fontSize: 16 },
  nowTitle: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  nowMetaRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  nowMetaText: { color: "rgba(255,255,255,0.7)", fontSize: 11 },
  viewBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  viewBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },

  navBar: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.cardBackground,
  },
  navItem: { alignItems: "center", justifyContent: "center", minWidth: 60 },
  navIcon: { fontSize: 18, fontWeight: "700" },
  navLabel: { marginTop: 2, fontSize: 11, fontWeight: "600" },
});
