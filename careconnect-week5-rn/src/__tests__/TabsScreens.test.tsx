import { render } from "@testing-library/react-native";

import { CalendarScreen } from "@/src/screens/CalendarScreen";
import { MessagesScreen } from "@/src/screens/MessagesScreen";
import { ProfileScreen } from "@/src/screens/ProfileScreen";
import { TasksScreen } from "@/src/screens/TasksScreen";

describe("Tab placeholder screens", () => {
  it("renders tasks content", () => {
    const { getByText } = render(<TasksScreen />);
    expect(getByText("You have 2 overdue tasks")).toBeTruthy();
    expect(getByText("Physical Therapy Appointment")).toBeTruthy();
    expect(getByText("Blood Pressure Check")).toBeTruthy();
  });

  it("renders calendar placeholder", () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText("Calendar (placeholder)")).toBeTruthy();
    expect(getByText("Upcoming appointments will show here.")).toBeTruthy();
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
