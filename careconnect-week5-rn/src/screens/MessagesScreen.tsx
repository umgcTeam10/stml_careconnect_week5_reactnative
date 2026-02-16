import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { TextField } from "@/src/components/TextField";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { colors, fontSizes, spacing } from "@/src/utils/theme";

type MessagesScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, "AppTabs">,
  NativeStackScreenProps<RootStackParamList>
>;

const headerColor = "#0F4C81";
const cardBorder = "#E3E8F1";
const mutedText = "#5F6775";
const lightBlue = "#EFF5FF";
const emergencyRed = "#DA3B4A";
const emergencyBg = "#FFE9EC";
const warningBorder = "#F7C7CD";

export function MessagesScreen({ navigation }: MessagesScreenProps) {
  const [message, setMessage] = useState("");

  const handleEmergencySOS = () => {
    Alert.alert(
      "Emergency SOS",
      "Emergency alert will be sent to all caregivers and emergency contacts.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send Alert", style: "destructive" },
      ],
    );
  };

  const handleQuickContact = (name: string, role: string) => {
    Alert.alert(`Contact ${name}`, `Open chat with ${name} (${role})?`, [
      { text: "OK" },
    ]);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert("Empty Message", "Please type a message before sending.");
      return;
    }
    Alert.alert("Message Sent", "Your message has been sent successfully.");
    setMessage("");
  };

  const handleQuickReply = (replyText: string) => {
    Alert.alert("Quick Reply", `Send quick reply: "${replyText}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Send",
        onPress: () => Alert.alert("Sent", `"${replyText}" has been sent.`),
      },
    ]);
  };

  const handleOpenMessage = (name: string) => {
    Alert.alert("Open Conversation", `View full conversation with ${name}.`, [
      { text: "OK" },
    ]);
  };

  const handleAcknowledge = () => {
    Alert.alert("Acknowledged", "Reminder has been acknowledged.", [
      { text: "OK" },
    ]);
  };

  const handleSnooze = () => {
    Alert.alert("Snoozed", "Reminder snoozed for 10 minutes.", [
      { text: "OK" },
    ]);
  };

  const handleViewAppointment = () => {
    Alert.alert(
      "Appointment Details",
      "Physical Therapy Appointment\nTime: 02:00 PM\nLocation: At clinic",
      [{ text: "Close" }],
    );
  };

  const onNavTap = (index: number) => {
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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Back"
          accessibilityHint="Returns to previous screen"
          onPress={() => navigation.goBack()}
          style={styles.headerBack}
        >
          <Text style={styles.headerBackText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} accessibilityRole="header">
          Messages
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        accessible={false}
      >
        <View style={styles.emergencyWrap}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Emergency SOS"
            accessibilityHint="Sends emergency alert to all caregivers and emergency contacts"
            onPress={handleEmergencySOS}
            style={styles.emergencyBtn}
            activeOpacity={0.85}
          >
            <Text
              style={styles.emergencyIcon}
              importantForAccessibility="no-hide-descendants"
            >
              ⚠️
            </Text>
            <Text style={styles.emergencyText}>Emergency SOS</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">
          Quick Contact
        </Text>

        <View style={styles.quickRow}>
          <QuickContactAvatar
            initials="SJ"
            name="Sarah"
            subtitle="Primary Care"
            onPress={() => handleQuickContact("Sarah", "Primary Care")}
          />
          <QuickContactAvatar
            initials="DM"
            name="Dr. Martinez"
            subtitle="Doctor"
            onPress={() => handleQuickContact("Dr. Martinez", "Doctor")}
          />
          <QuickContactAvatar
            initials="NC"
            name="Nurse Chen"
            subtitle="Home Care"
            onPress={() => handleQuickContact("Nurse Chen", "Home Care")}
          />
        </View>

        <View style={styles.composeCard}>
          <View style={styles.composeLeft}>
            <TextField
              accessibilityLabel="Type your message"
              accessibilityHint="Enter message to send"
              label=""
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
              testID="messages-compose"
            />
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Send message"
            accessibilityHint="Sends your message to selected contact"
            onPress={handleSendMessage}
            style={styles.sendBtn}
            activeOpacity={0.85}
          >
            <Text
              style={styles.sendIcon}
              importantForAccessibility="no-hide-descendants"
            >
              ➤
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chipRow}>
          <QuickReplyChip label="Yes" onPress={() => handleQuickReply("Yes")} />
          <QuickReplyChip
            label="On my way"
            onPress={() => handleQuickReply("On my way")}
          />
          <QuickReplyChip
            label="Call me"
            onPress={() => handleQuickReply("Call me")}
          />
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">
          Recent Messages
        </Text>

        <MessageCard
          initials="RM"
          name="Robert Martinez"
          message="Morning walk completed! Felt great today."
          time="1 hour ago"
          isUnread={false}
          onPress={() => handleOpenMessage("Robert Martinez")}
        />

        <View
          style={styles.noticeCard}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLabel="CareConnect notification, 2 hours ago: Reminder: Physical therapy appointment at 2:00 PM"
        >
          <View style={styles.noticeHeaderRow}>
            <View style={styles.noticeIconWrap}>
              <Text
                style={styles.noticeIcon}
                importantForAccessibility="no-hide-descendants"
              >
                🔔
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.noticeTitle}>CareConnect</Text>
              <Text style={styles.noticeTime}>2 hours ago</Text>
            </View>
          </View>

          <Text style={styles.noticeBody}>
            Reminder: Physical therapy appointment at 2:00 PM
          </Text>

          <View style={styles.noticeActionsRow}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Acknowledge reminder"
              accessibilityHint="Marks reminder as acknowledged"
              onPress={handleAcknowledge}
              style={styles.noticeActionPrimary}
              activeOpacity={0.85}
            >
              <Text style={styles.noticeActionPrimaryText}>Acknowledge</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Snooze 10 minutes"
              accessibilityHint="Reminds you again in 10 minutes"
              onPress={handleSnooze}
              style={styles.noticeActionSecondary}
              activeOpacity={0.85}
            >
              <Text style={styles.noticeActionSecondaryText}>
                Snooze 10 min
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <MessageCard
          initials="RM"
          name="Robert Martinez"
          message="Can you pick up my prescription this afternoon?"
          time="1 day ago"
          isUnread
          onPress={() => handleOpenMessage("Robert Martinez")}
        />

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomBar onTap={onNavTap} onNowTap={handleViewAppointment} />
    </SafeAreaView>
  );
}

function QuickContactAvatar({
  initials,
  name,
  subtitle,
  onPress,
}: {
  initials: string;
  name: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${subtitle}`}
      accessibilityHint={`Opens chat with ${name}`}
      onPress={onPress}
      style={styles.quickContact}
      activeOpacity={0.85}
    >
      <View style={styles.avatarCircle}>
        <Text
          style={styles.avatarText}
          importantForAccessibility="no-hide-descendants"
        >
          {initials}
        </Text>
      </View>
      <Text style={styles.quickName}>{name}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

function QuickReplyChip({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Quick reply: ${label}`}
      accessibilityHint={`Sends quick reply message: ${label}`}
      onPress={onPress}
      style={styles.chip}
      activeOpacity={0.85}
    >
      <Text style={styles.chipText}>{label}</Text>
    </TouchableOpacity>
  );
}

function MessageCard({
  initials,
  name,
  message,
  time,
  isUnread,
  onPress,
}: {
  initials: string;
  name: string;
  message: string;
  time: string;
  isUnread: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Message from ${name}, ${message}, ${time}${isUnread ? ", unread" : ", read"}`}
      accessibilityState={{ selected: isUnread }}
      accessibilityHint="Opens full conversation"
      onPress={onPress}
      style={styles.msgCard}
      activeOpacity={0.9}
    >
      <View style={styles.msgAvatar}>
        <Text
          style={styles.msgAvatarText}
          importantForAccessibility="no-hide-descendants"
        >
          {initials}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.msgTopRow}>
          <Text style={styles.msgName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.msgTime}>{time}</Text>
        </View>

        <Text style={styles.msgBody}>{message}</Text>

        {isUnread ? (
          <View style={styles.unreadPill}>
            <Text style={styles.unreadText}>Unread</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

function BottomBar({
  onTap,
  onNowTap,
}: {
  onTap: (index: number) => void;
  onNowTap: () => void;
}) {
  return (
    <View>
      <View
        style={styles.nowBar}
        accessible={true}
        accessibilityRole="alert"
        accessibilityLabel="Current appointment: Physical Therapy at 2:00 PM at clinic"
        accessibilityLiveRegion="polite"
      >
        <Text
          style={styles.nowIcon}
          importantForAccessibility="no-hide-descendants"
        >
          ⏱
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.nowTitle}>Now: Physical Therapy Appointment</Text>

          <View style={styles.nowMetaRow}>
            <Text
              style={styles.nowMetaText}
              importantForAccessibility="no-hide-descendants"
            >
              ⏱
            </Text>
            <Text style={styles.nowMetaText}>02:00 PM</Text>
            <Text style={styles.nowMetaText}>•</Text>
            <Text
              style={styles.nowMetaText}
              importantForAccessibility="no-hide-descendants"
            >
              🏥
            </Text>
            <Text style={styles.nowMetaText}>At clinic</Text>
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="View appointment details"
          accessibilityHint="Opens full appointment information"
          onPress={onNowTap}
          style={styles.nowViewBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.nowViewText}>View</Text>
          <Text style={styles.nowViewText}> →</Text>
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

  header: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  headerBack: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  headerBackText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },

  emergencyWrap: {
    backgroundColor: emergencyBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: warningBorder,
    padding: spacing.lg,
  },
  emergencyBtn: {
    backgroundColor: emergencyRed,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  emergencyIcon: {
    color: colors.onPrimary,
    fontSize: 16,
  },
  emergencyText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: "700",
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: "700",
  },

  quickRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.lg,
  },
  quickContact: {
    alignItems: "center",
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.onPrimary,
    fontSize: 20,
    fontWeight: "700",
  },
  quickName: {
    marginTop: 8,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  quickSubtitle: {
    marginTop: 2,
    color: mutedText,
    fontSize: 11,
  },

  composeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border ?? cardBorder,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  composeLeft: {
    flex: 1,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(15, 76, 129, 0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "700",
  },

  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chip: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border ?? cardBorder,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "500",
  },

  msgCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border ?? cardBorder,
    padding: spacing.lg,
    flexDirection: "row",
    gap: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  msgAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  msgAvatarText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  msgTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  msgName: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  msgTime: {
    color: mutedText,
    fontSize: 12,
  },
  msgBody: {
    marginTop: 6,
    color: mutedText,
    fontSize: 14,
    lineHeight: 18,
  },
  unreadPill: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  unreadText: {
    color: colors.onPrimary,
    fontSize: 11,
    fontWeight: "600",
  },

  noticeCard: {
    backgroundColor: "#FFF8E6",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFE8B3",
    padding: spacing.lg,
    gap: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  noticeHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  noticeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeIcon: {
    fontSize: 16,
  },
  noticeTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  noticeTime: {
    marginTop: 2,
    color: mutedText,
    fontSize: 12,
  },
  noticeBody: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
  },
  noticeActionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  noticeActionPrimary: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  noticeActionPrimaryText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  noticeActionSecondary: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cardBorder,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  noticeActionSecondaryText: {
    color: mutedText,
    fontSize: 14,
    fontWeight: "600",
  },

  nowBar: {
    backgroundColor: headerColor,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  nowIcon: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
  },
  nowTitle: {
    color: colors.onPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  nowMetaRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  nowMetaText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
  },
  nowViewBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  nowViewText: {
    color: colors.onPrimary,
    fontSize: 12,
    fontWeight: "600",
  },

  navBar: {
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border ?? "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 8,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
  navIcon: {
    fontSize: 18,
    fontWeight: "700",
  },
  navLabel: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "600",
  },
});
