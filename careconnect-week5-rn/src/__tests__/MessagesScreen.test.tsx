import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";

import { MessagesScreen } from "@/src/screens/MessagesScreen";

const makeProps = () => ({
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  route: { key: "messages", name: "Messages", params: {} },
});

describe("MessagesScreen", () => {
  beforeEach(() => {
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders primary messaging content", () => {
    const { getByPlaceholderText, getByText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    expect(getByText("Messages")).toBeTruthy();
    expect(getByText("Emergency SOS")).toBeTruthy();
    expect(getByText("Quick Contact")).toBeTruthy();
    expect(getByPlaceholderText("Type your message...")).toBeTruthy();
    expect(getByText("Yes")).toBeTruthy();
    expect(getByText("On my way")).toBeTruthy();
    expect(getByText("Call me")).toBeTruthy();
    expect(getByText("Recent Messages")).toBeTruthy();
    expect(getByText("CareConnect")).toBeTruthy();
    expect(getByText("Now: Physical Therapy Appointment")).toBeTruthy();
  });

  it("navigates back when pressing Back", () => {
    const props = makeProps();
    const { getByLabelText } = render(<MessagesScreen {...(props as any)} />);

    fireEvent.press(getByLabelText("Back"));
    expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it("shows emergency SOS confirmation alert", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(getByLabelText("Emergency SOS"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Emergency SOS",
      "Emergency alert will be sent to all caregivers and emergency contacts.",
      expect.any(Array),
    );
  });

  it("shows contact alert when quick contact is pressed", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(getByLabelText("Sarah, Primary Care"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Contact Sarah",
      "Open chat with Sarah (Primary Care)?",
      expect.any(Array),
    );
  });

  it("shows empty message alert when sending without text", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(getByLabelText("Send message"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Empty Message",
      "Please type a message before sending.",
    );
  });

  it("shows success alert when sending message with text", () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    const input = getByPlaceholderText("Type your message...");
    fireEvent.changeText(input, "Hello there!");
    fireEvent.press(getByLabelText("Send message"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Message Sent",
      "Your message has been sent successfully.",
    );
  });

  it("shows quick reply confirmation", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(getByLabelText("Quick reply: Yes"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Quick Reply",
      'Send quick reply: "Yes"?',
      expect.any(Array),
    );
  });

  it("shows conversation alert when message card is pressed", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(
      getByLabelText(/Message from Robert Martinez.*Morning walk.*read/),
    );

    expect(Alert.alert).toHaveBeenCalledWith(
      "Open Conversation",
      "View full conversation with Robert Martinez.",
      expect.any(Array),
    );
  });

  it("shows acknowledge alert when acknowledge button is pressed", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(getByLabelText("Acknowledge reminder"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Acknowledged",
      "Reminder has been acknowledged.",
      expect.any(Array),
    );
  });

  it("shows snooze alert when snooze button is pressed", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(getByLabelText("Snooze 10 minutes"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Snoozed",
      "Reminder snoozed for 10 minutes.",
      expect.any(Array),
    );
  });

  it("shows appointment details when view button is pressed", () => {
    const { getByLabelText } = render(
      <MessagesScreen {...(makeProps() as any)} />,
    );

    fireEvent.press(getByLabelText("View appointment details"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Appointment Details",
      "Physical Therapy Appointment\nTime: 02:00 PM\nLocation: At clinic",
      expect.any(Array),
    );
  });

  describe("Accessibility Enhancements", () => {
    it("back button has proper accessibility role and hint", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const backButton = getByLabelText("Back");
      expect(backButton.props.accessibilityRole).toBe("button");
      expect(backButton.props.accessibilityHint).toBe(
        "Returns to previous screen",
      );
    });

    it("emergency SOS has proper accessibility", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const sosButton = getByLabelText("Emergency SOS");
      expect(sosButton.props.accessibilityRole).toBe("button");
      expect(sosButton.props.accessibilityHint).toBe(
        "Sends emergency alert to all caregivers and emergency contacts",
      );
    });

    it("section titles have header role", () => {
      const { getByText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const quickContactTitle = getByText("Quick Contact");
      expect(quickContactTitle.props.accessibilityRole).toBe("header");

      const recentMessagesTitle = getByText("Recent Messages");
      expect(recentMessagesTitle.props.accessibilityRole).toBe("header");
    });

    it("quick contact avatars have proper accessibility", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const sarahContact = getByLabelText("Sarah, Primary Care");
      expect(sarahContact.props.accessibilityRole).toBe("button");
      expect(sarahContact.props.accessibilityHint).toBe(
        "Opens chat with Sarah",
      );
    });

    it("send button has proper accessibility", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const sendButton = getByLabelText("Send message");
      expect(sendButton.props.accessibilityRole).toBe("button");
      expect(sendButton.props.accessibilityHint).toBe(
        "Sends your message to selected contact",
      );
    });

    it("quick reply chips have proper accessibility", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const yesChip = getByLabelText("Quick reply: Yes");
      expect(yesChip.props.accessibilityRole).toBe("button");
      expect(yesChip.props.accessibilityHint).toBe(
        "Sends quick reply message: Yes",
      );
    });

    it("message cards have full context in accessibility label", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const readMessage = getByLabelText(
        /Message from Robert Martinez.*Morning walk.*read/,
      );
      expect(readMessage.props.accessibilityRole).toBe("button");
      expect(readMessage.props.accessibilityHint).toBe(
        "Opens full conversation",
      );

      const unreadMessage = getByLabelText(
        /Message from Robert Martinez.*prescription.*unread/,
      );
      expect(unreadMessage.props.accessibilityState.selected).toBe(true);
    });

    it("notice card has alert role and is grouped", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const noticeCard = getByLabelText(
        /CareConnect notification.*Physical therapy appointment/,
      );
      expect(noticeCard.props.accessibilityRole).toBe("alert");
      expect(noticeCard.props.accessible).toBe(true);
    });

    it("notice action buttons have proper accessibility", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const acknowledgeButton = getByLabelText("Acknowledge reminder");
      expect(acknowledgeButton.props.accessibilityRole).toBe("button");
      expect(acknowledgeButton.props.accessibilityHint).toBe(
        "Marks reminder as acknowledged",
      );

      const snoozeButton = getByLabelText("Snooze 10 minutes");
      expect(snoozeButton.props.accessibilityRole).toBe("button");
      expect(snoozeButton.props.accessibilityHint).toBe(
        "Reminds you again in 10 minutes",
      );
    });

    it("now bar has alert role and live region", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const nowBar = getByLabelText(
        "Current appointment: Physical Therapy at 2:00 PM at clinic",
      );
      expect(nowBar.props.accessibilityRole).toBe("alert");
      expect(nowBar.props.accessibilityLiveRegion).toBe("polite");
      expect(nowBar.props.accessible).toBe(true);
    });

    it("view appointment button has proper accessibility", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      const viewButton = getByLabelText("View appointment details");
      expect(viewButton.props.accessibilityRole).toBe("button");
      expect(viewButton.props.accessibilityHint).toBe(
        "Opens full appointment information",
      );
    });

    it("all interactive elements have accessibility roles", () => {
      const { getByLabelText } = render(
        <MessagesScreen {...(makeProps() as any)} />,
      );

      // Verify key interactive elements have button roles
      expect(getByLabelText("Back").props.accessibilityRole).toBe("button");
      expect(getByLabelText("Emergency SOS").props.accessibilityRole).toBe(
        "button",
      );
      expect(
        getByLabelText("Sarah, Primary Care").props.accessibilityRole,
      ).toBe("button");
      expect(getByLabelText("Send message").props.accessibilityRole).toBe(
        "button",
      );
      expect(getByLabelText("Quick reply: Yes").props.accessibilityRole).toBe(
        "button",
      );
      expect(
        getByLabelText("View appointment details").props.accessibilityRole,
      ).toBe("button");
    });
  });
});
