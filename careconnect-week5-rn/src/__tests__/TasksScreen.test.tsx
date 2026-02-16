import { fireEvent, render } from "@testing-library/react-native";

import { TasksScreen } from "@/src/screens/TasksScreen";

describe("TasksScreen", () => {
  it("renders summary cards and top-level actions", () => {
    const { getAllByText, getByRole, getByText } = render(<TasksScreen />);

    expect(getByText("3")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
    expect(getByText("1")).toBeTruthy();
    expect(getAllByText("Today")).toHaveLength(2);
    expect(getAllByText("Overdue")).toHaveLength(2);
    expect(getByText("You have 2 overdue tasks")).toBeTruthy();

    const addTask = getByRole("button", { name: "Add task" });
    const filterTasks = getByRole("button", { name: "Filter tasks" });
    const viewOverdue = getByRole("button", { name: "View overdue tasks" });

    expect(addTask).toBeEnabled();
    expect(filterTasks).toHaveProp(
      "accessibilityHint",
      "Opens task filter options",
    );
    expect(viewOverdue).toHaveProp(
      "accessibilityHint",
      "Shows only overdue tasks",
    );
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
    const { getByRole } = render(<TasksScreen />);

    const upcomingTab = getByRole("button", { name: "Show upcoming tasks" });
    const todayTab = getByRole("button", { name: "Show today tasks" });
    const overdueTab = getByRole("button", { name: "Show overdue tasks" });
    const doneTab = getByRole("button", { name: "Show done tasks" });
    expect(upcomingTab).toBeSelected();
    expect(todayTab).toBeEnabled();
    expect(overdueTab).toBeEnabled();
    expect(doneTab).toBeEnabled();

    const bloodPressureCheckbox = getByRole("checkbox", {
      name: "Mark Blood Pressure Check done",
    });
    expect(bloodPressureCheckbox).toHaveProp("accessibilityState", {
      checked: false,
    });
    expect(bloodPressureCheckbox).toHaveStyle({ width: 44, height: 44 });

    const prepareLunchCheckbox = getByRole("checkbox", {
      name: "Mark Prepare Lunch done",
    });
    expect(prepareLunchCheckbox).toHaveProp("accessibilityState", {
      checked: false,
    });
  });

  it("allows pressing all available task actions", () => {
    const { getByLabelText, getByRole } = render(<TasksScreen />);

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

    expect(
      getByRole("button", { name: "View appointment details" }),
    ).toHaveStyle({
      minHeight: 44,
      minWidth: 44,
    });
  });
});
