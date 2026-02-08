// __tests__/CalendarScreen.test.tsx
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render, within } from "@testing-library/react-native";
import React from "react";
import { Alert, View } from "react-native";

import { CalendarScreen } from "../CalendarScreen"; // <-- adjust import to your file location

// --- Mock theme + nav type imports used by CalendarScreen.tsx ---
jest.mock("@/src/utils/theme", () => ({
  colors: {
    background: "#FFFFFF",
    cardBackground: "#F8FAFC",
    border: "#E2E8F0",
    textPrimary: "#0F172A",
    primary: "#2563EB",
  },
  fontSizes: { lg: 18, md: 14 },
  spacing: { sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 },
}));

jest.mock("@/src/navigation/AppTabs", () => ({}));
jest.mock("@/src/navigation/RootNavigator", () => ({}));

describe("CalendarScreen", () => {
  const goBack = jest.fn();
  const navigate = jest.fn();

  const makeProps = () =>
    ({
      navigation: { goBack, navigate },
      route: { key: "Calendar", name: "Calendar" },
    }) as any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  it("renders header + initial month label", () => {
    const { getByText } = render(<CalendarScreen {...makeProps()} />);

    expect(getByText("Calendar")).toBeTruthy();
    expect(getByText("January 2026")).toBeTruthy();
    expect(getByText("Today's Schedule")).toBeTruthy();
  });

  it("Back button calls navigation.goBack()", () => {
    const { getByLabelText } = render(<CalendarScreen {...makeProps()} />);

    fireEvent.press(getByLabelText("Back"));
    expect(goBack).toHaveBeenCalledTimes(1);
  });

  it("Next/Previous month updates the month label", () => {
    const { getByLabelText, getByText, queryByText } = render(
      <CalendarScreen {...makeProps()} />,
    );

    expect(getByText("January 2026")).toBeTruthy();

    fireEvent.press(getByLabelText("Next month"));
    expect(getByText("February 2026")).toBeTruthy();
    expect(queryByText("January 2026")).toBeNull();

    fireEvent.press(getByLabelText("Previous month"));
    expect(getByText("January 2026")).toBeTruthy();
  });

  it("selecting an event day changes the cell background from highlight -> selected", () => {
    const { getByLabelText } = render(<CalendarScreen {...makeProps()} />);

    // Event date is Jan 27, 2026 in the component
    const day27 = getByLabelText("Select Tue Jan 27 2026");

    // Inside TouchableOpacity -> View(cellInner) -> Text(day)
    // We’ll grab the inner View and assert style changes.
    const innerBefore = within(day27).UNSAFE_getAllByType(View)[0];

    // highlight color in your component for event (chipTeal)
    expect(innerBefore).toHaveStyle({ backgroundColor: "#0E7C9A" });

    fireEvent.press(day27);

    const innerAfter = within(day27).UNSAFE_getAllByType(View)[0];

    // selected color in your component (calendarSelected)
    expect(innerAfter).toHaveStyle({ backgroundColor: "#0F4C81" });
  });

  it('"View current event" triggers Not implemented alert', () => {
    const { getByLabelText } = render(<CalendarScreen {...makeProps()} />);

    fireEvent.press(getByLabelText("View current event"));

    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Not implemented",
      "Not implemented in Week 4",
    );
  });

  it("bottom nav items navigate to correct AppTabs screens", () => {
    const { getByLabelText } = render(<CalendarScreen {...makeProps()} />);

    fireEvent.press(getByLabelText("Home"));
    expect(navigate).toHaveBeenLastCalledWith("AppTabs", { screen: "Home" });

    fireEvent.press(getByLabelText("Tasks"));
    expect(navigate).toHaveBeenLastCalledWith("AppTabs", { screen: "Tasks" });

    fireEvent.press(getByLabelText("Calendar"));
    expect(navigate).toHaveBeenLastCalledWith("AppTabs", {
      screen: "Calendar",
    });

    fireEvent.press(getByLabelText("Messages"));
    expect(navigate).toHaveBeenLastCalledWith("AppTabs", {
      screen: "Messages",
    });

    fireEvent.press(getByLabelText("Profile"));
    expect(navigate).toHaveBeenLastCalledWith("AppTabs", { screen: "Profile" });
  });
});
