import { render } from "@testing-library/react-native";

import { CalendarScreen } from "@/src/screens/CalendarScreen";
import { MessagesScreen } from "@/src/screens/MessagesScreen";

describe("Tab screens", () => {
  it("renders calendar screen content", () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText("Calendar")).toBeTruthy();
    expect(getByText("January 2026")).toBeTruthy();
    expect(getByText("Today's Schedule")).toBeTruthy();
  });

  it("renders messages screen content", () => {
    const { getByText } = render(<MessagesScreen />);
    expect(getByText("Messages")).toBeTruthy();
    expect(getByText("Quick Contact")).toBeTruthy();
    expect(getByText("Recent Messages")).toBeTruthy();
  });
});
