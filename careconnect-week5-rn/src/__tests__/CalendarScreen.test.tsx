import { fireEvent, render } from "@testing-library/react-native";

import { CalendarScreen } from "@/src/screens/CalendarScreen";

const createNavigation = () => ({
  goBack: jest.fn(),
});

describe("CalendarScreen", () => {
  it("renders calendar screen content", () => {
    const navigation = createNavigation();
    const { getByText } = render(
      <CalendarScreen
        navigation={navigation as any}
        route={{ key: "Calendar", name: "Calendar" } as any}
      />,
    );

    expect(getByText("Calendar")).toBeTruthy();
    expect(getByText("January 2026")).toBeTruthy();
    expect(getByText(/Today'?s Schedule/)).toBeTruthy();
  });

  it("adds explicit accessibility metadata and touch target sizing", () => {
    const navigation = createNavigation();
    const { getByRole } = render(
      <CalendarScreen
        navigation={navigation as any}
        route={{ key: "Calendar", name: "Calendar" } as any}
      />,
    );

    const backButton = getByRole("button", { name: "Back" });
    const previousMonth = getByRole("button", { name: "Previous month" });
    const nextMonth = getByRole("button", { name: "Next month" });

    expect(backButton).toHaveProp(
      "accessibilityHint",
      "Navigates to the previous screen",
    );
    expect(previousMonth).toHaveProp(
      "accessibilityHint",
      "Moves the calendar back by one month",
    );
    expect(nextMonth).toHaveProp(
      "accessibilityHint",
      "Moves the calendar forward by one month",
    );
    expect(backButton).toHaveStyle({ minHeight: 44, minWidth: 44 });
    expect(previousMonth).toHaveStyle({ minHeight: 44, minWidth: 44 });
    expect(nextMonth).toHaveStyle({ minHeight: 44, minWidth: 44 });
  });

  it("supports calendar navigation controls and back action", () => {
    const navigation = createNavigation();
    const { getByRole, getByText } = render(
      <CalendarScreen
        navigation={navigation as any}
        route={{ key: "Calendar", name: "Calendar" } as any}
      />,
    );

    fireEvent.press(getByRole("button", { name: "Next month" }));
    expect(getByText("February 2026")).toBeTruthy();

    fireEvent.press(getByRole("button", { name: "Back" }));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
