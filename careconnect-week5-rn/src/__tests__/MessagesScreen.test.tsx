import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { MessagesScreen } from "./MessagesScreen";

function makeNav() {
  return {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };
}

describe("MessagesScreen (React Native) - translated from messages_screen_test.dart", () => {
  test("Messages screen renders correctly", () => {
    const navigation = makeNav();

    const { getByText, getByTestId, queryByTestId } = render(
      <MessagesScreen navigation={navigation as any} />,
    );

    // Header/back
    expect(getByTestId("headerBackButton")).toBeTruthy();
    expect(getByText("Messages")).toBeTruthy();

    // SOS
    expect(getByText("Emergency SOS")).toBeTruthy();
    expect(getByTestId("emergencySosButton")).toBeTruthy();

    // Quick Contact
    expect(getByText("Quick Contact")).toBeTruthy();
    expect(getByText("SJ")).toBeTruthy();
    expect(getByText("Sarah")).toBeTruthy();
    expect(getByText("Primary Care")).toBeTruthy();
    expect(getByText("DM")).toBeTruthy();
    expect(getByText("Dr.")).toBeTruthy();
    expect(getByText("Doctor")).toBeTruthy();
    expect(getByText("NC")).toBeTruthy();
    expect(getByText("Nurse")).toBeTruthy();
    expect(getByText("Home Care")).toBeTruthy();

    // Composer
    expect(getByTestId("messageInput")).toBeTruthy();
    expect(getByText("Type your message...")).toBeTruthy();
    expect(getByTestId("sendButton")).toBeTruthy();

    // Quick replies
    expect(getByText("Yes")).toBeTruthy();
    expect(getByText("On my way")).toBeTruthy();
    expect(getByText("Call me")).toBeTruthy();

    // Recent messages
    expect(getByText("Recent Messages")).toBeTruthy();
    expect(getByText("Robert Martinez")).toBeTruthy();
    expect(getByText("Morning walk completed! Felt great today.")).toBeTruthy();
    expect(getByText("1 hour ago")).toBeTruthy();

    // CareConnect
    expect(getByText("CareConnect")).toBeTruthy();
    expect(
      getByText("Reminder: Physical therapy appointment at 2:00 PM"),
    ).toBeTruthy();
    expect(getByText("Acknowledge")).toBeTruthy();
    expect(getByText("Snooze 10 min")).toBeTruthy();

    // Unread message
    expect(
      getByText("Can you pick up my prescription this afternoon?"),
    ).toBeTruthy();
    expect(getByText("Unread")).toBeTruthy();

    // Bottom nav
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Tasks")).toBeTruthy();
    expect(getByText("Calendar")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();

    // Snackbar hidden by default
    expect(queryByTestId("snackbar")).toBeNull();
  });

  test("Messages icon in bottom nav is highlighted", () => {
    const { getByTestId } = render(<MessagesScreen navigation={{} as any} />);

    const messagesTab = getByTestId("bottomNav-messages");
    expect(messagesTab.props.accessibilityState?.selected).toBe(true);
  });

  test("Back button navigation works", () => {
    const navigation = makeNav();
    const { getByTestId } = render(
      <MessagesScreen navigation={navigation as any} />,
    );

    fireEvent.press(getByTestId("headerBackButton"));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  test("Emergency SOS button shows not implemented message", () => {
    const { getByTestId, getByText } = render(
      <MessagesScreen navigation={{} as any} />,
    );

    fireEvent.press(getByTestId("emergencySosButton"));
    expect(getByText("Not implemented in Week 4")).toBeTruthy();
  });

  test("Quick contact avatars are tappable", () => {
    const { getByTestId, getByText } = render(
      <MessagesScreen navigation={{} as any} />,
    );

    fireEvent.press(getByTestId("quickContact-sarah"));
    expect(getByText("Not implemented in Week 4")).toBeTruthy();
  });

  test("Message input field is tappable", () => {
    const { getByTestId, getByText } = render(
      <MessagesScreen navigation={{} as any} />,
    );

    fireEvent(getByTestId("messageInput"), "focus");
    expect(getByText("Not implemented in Week 4")).toBeTruthy();
  });

  test("Send button is tappable", () => {
    const { getByTestId, getByText } = render(
      <MessagesScreen navigation={{} as any} />,
    );

    fireEvent.press(getByTestId("sendButton"));
    expect(getByText("Not implemented in Week 4")).toBeTruthy();
  });

  test("Bottom navigation navigates to dashboard", () => {
    const navigation = makeNav();
    const { getByTestId } = render(
      <MessagesScreen navigation={navigation as any} />,
    );

    fireEvent.press(getByTestId("bottomNav-home"));
    expect(navigation.navigate).toHaveBeenCalledWith("AppTabs", {
      screen: "Home",
    });
  });

  test("Now banner View button works", () => {
    const { getByTestId, getByText } = render(
      <MessagesScreen navigation={{} as any} />,
    );

    fireEvent.press(getByTestId("nowBannerViewButton"));
    expect(getByText("Not implemented in Week 4")).toBeTruthy();
  });

  test("Bottom nav callback covers current-index return path", () => {
    const navigation = makeNav();
    const { getByTestId, getByText } = render(
      <MessagesScreen navigation={navigation as any} />,
    );

    // Already on Messages by default
    fireEvent.press(getByTestId("bottomNav-messages"));
    expect(navigation.navigate).not.toHaveBeenCalled();

    // Still on Messages
    expect(getByText("Messages")).toBeTruthy();
  });
});
