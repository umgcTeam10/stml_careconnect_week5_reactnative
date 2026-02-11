import { render } from "@testing-library/react-native";

import { CalendarScreen } from "@/src/screens/CalendarScreen";

describe("CalendarScreen", () => {
  it("renders calendar screen content", () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText("Calendar")).toBeTruthy();
    expect(getByText("January 2026")).toBeTruthy();
    expect(getByText(/Today'?s Schedule/)).toBeTruthy();
  });
});
