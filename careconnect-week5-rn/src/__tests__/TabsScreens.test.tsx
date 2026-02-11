import { render } from "@testing-library/react-native";

import { CalendarScreen } from "@/src/screens/CalendarScreen";
import { MessagesScreen } from "@/src/screens/MessagesScreen";
import { ProfileScreen } from "@/src/screens/ProfileScreen";
import { TasksScreen } from "@/src/screens/TasksScreen";

describe("Tab placeholder screens", () => {
  it("renders tasks placeholder", () => {
    const { getByText } = render(<TasksScreen />);
    expect(getByText("Tasks (placeholder)")).toBeTruthy();
    expect(getByText("Your care tasks will appear here.")).toBeTruthy();
  });

  it("renders calendar screen content", () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText("Calendar")).toBeTruthy();
    expect(getByText("January 2026")).toBeTruthy();
    expect(getByText("Today's Schedule")).toBeTruthy();
  });

  it("renders messages placeholder", () => {
    const { getByText } = render(<MessagesScreen />);
    expect(getByText("Messages (placeholder)")).toBeTruthy();
    expect(getByText("Secure messaging will appear here.")).toBeTruthy();
  });

  it("renders profile placeholder", () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText("Profile (placeholder)")).toBeTruthy();
    expect(getByText("Profile settings will live here.")).toBeTruthy();
  });
});
