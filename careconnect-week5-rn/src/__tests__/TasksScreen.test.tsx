import { fireEvent, render } from "@testing-library/react-native";

import { TasksScreen } from "@/src/screens/TasksScreen";

describe("TasksScreen", () => {
  it("renders summary cards and top-level actions", () => {
    const { getAllByText, getByText, getByLabelText } = render(<TasksScreen />);

    expect(getByText("3")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
    expect(getByText("1")).toBeTruthy();
    expect(getAllByText("Today")).toHaveLength(2);
    expect(getAllByText("Overdue")).toHaveLength(2);
    expect(getByText("You have 2 overdue tasks")).toBeTruthy();

    expect(getByLabelText("Add task")).toBeTruthy();
    expect(getByLabelText("Filter tasks")).toBeTruthy();
    expect(getByLabelText("View overdue tasks")).toBeTruthy();
  });

  it("renders now card and upcoming task details", () => {
    const { getAllByText, getByText, getByLabelText } = render(<TasksScreen />);

    expect(getByText("Physical Therapy Appointment")).toBeTruthy();
    expect(getByText("Due now - 02:00 PM | At clinic")).toBeTruthy();
    expect(getByLabelText("Start task now")).toBeTruthy();
    expect(getByLabelText("Snooze task for 10 minutes")).toBeTruthy();

    expect(getByText("Blood Pressure Check")).toBeTruthy();
    expect(getByText("Record morning blood pressure reading")).toBeTruthy();
    expect(getByText("Prepare Lunch")).toBeTruthy();
    expect(getByText("Low-sodium, diabetic-friendly meal")).toBeTruthy();
    expect(getByText("With breakfast")).toBeTruthy();
    expect(getByText("With lunch")).toBeTruthy();

    expect(getAllByText("Date Jan 27")).toHaveLength(2);
    expect(getAllByText("medium")).toHaveLength(2);
  });

  it("renders task tabs and unchecked checkbox controls", () => {
    const { getByLabelText } = render(<TasksScreen />);

    expect(getByLabelText("Show upcoming tasks")).toBeTruthy();
    expect(getByLabelText("Show today tasks")).toBeTruthy();
    expect(getByLabelText("Show overdue tasks")).toBeTruthy();
    expect(getByLabelText("Show done tasks")).toBeTruthy();

    const bloodPressureCheckbox = getByLabelText(
      "Mark Blood Pressure Check done",
    );
    expect(bloodPressureCheckbox.props.accessibilityRole).toBe("checkbox");
    expect(bloodPressureCheckbox.props.accessibilityState).toEqual({
      checked: false,
    });

    const prepareLunchCheckbox = getByLabelText("Mark Prepare Lunch done");
    expect(prepareLunchCheckbox.props.accessibilityRole).toBe("checkbox");
    expect(prepareLunchCheckbox.props.accessibilityState).toEqual({
      checked: false,
    });
  });

  it("allows pressing all available task actions", () => {
    const { getByLabelText } = render(<TasksScreen />);

    const labels = [
      "Add task",
      "Filter tasks",
      "View overdue tasks",
      "Start task now",
      "Snooze task for 10 minutes",
      "Show upcoming tasks",
      "Show today tasks",
      "Show overdue tasks",
      "Show done tasks",
      "Mark Blood Pressure Check done",
      "Mark Blood Pressure Check as done",
      "Reschedule Blood Pressure Check",
      "Mark Prepare Lunch done",
      "Mark Prepare Lunch as done",
      "Reschedule Prepare Lunch",
    ];

    labels.forEach((label) => {
      fireEvent.press(getByLabelText(label));
    });
  });
});
