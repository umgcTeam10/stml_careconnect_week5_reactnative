import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import { HealthLogsScreen } from "../screens/HealthLogsScreen";

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

// Mock Alert
jest.spyOn(Alert, "alert");

describe("HealthLogsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // BASIC RENDERING TESTS
  // ==========================================
  describe("Basic Rendering", () => {
    it("renders summary cards", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("BP Today")).toBeTruthy();
      expect(getByText("Medications")).toBeTruthy();
      expect(getByText("1,240")).toBeTruthy();
      expect(getByText("Good")).toBeTruthy();
    });

    it("renders BP card with correct values", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("BP Today")).toBeTruthy();
      expect(getByText("120/80")).toBeTruthy();
      expect(getByText("mmHg")).toBeTruthy();
    });

    it("renders Medications card with correct values", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("Medications")).toBeTruthy();
      expect(getByText("2/2")).toBeTruthy();
      expect(getByText("Completed")).toBeTruthy();
    });

    it("renders Meals card with correct values", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("1,240")).toBeTruthy();
      expect(getByText("Calories")).toBeTruthy();
    });

    it("renders Mood card with correct values", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("Good")).toBeTruthy();
      expect(getByText("Improving")).toBeTruthy();
    });

    it("renders all filter tabs", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByTestId("tab-all")).toBeTruthy();
      expect(getByTestId("tab-vitals")).toBeTruthy();
      expect(getByTestId("tab-meds")).toBeTruthy();
      expect(getByTestId("tab-meals")).toBeTruthy();
      expect(getByTestId("tab-mood")).toBeTruthy();
      expect(getByTestId("tab-symptoms")).toBeTruthy();
      expect(getByTestId("tab-activity")).toBeTruthy();
    });

    it("renders log entries", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("Blood Pressure")).toBeTruthy();
      expect(getByText("Mood Check")).toBeTruthy();
      expect(getByText("Medication Taken")).toBeTruthy();
      expect(getByText("Breakfast")).toBeTruthy();
      expect(getByText("No symptoms reported")).toBeTruthy();
    });

    it("renders log entry timestamps", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("1 hour ago")).toBeTruthy();
      expect(getByText("2 hours ago")).toBeTruthy();
      expect(getByText("3 hours ago")).toBeTruthy();
      expect(getByText("4 hours ago")).toBeTruthy();
      expect(getByText("1 day ago")).toBeTruthy();
    });

    it("renders log entry tags", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("vitals")).toBeTruthy();
      expect(getByText("mood")).toBeTruthy();
      expect(getByText("medication")).toBeTruthy();
      expect(getByText("meal")).toBeTruthy();
      expect(getByText("symptoms")).toBeTruthy();
    });

    it("renders FAB (Add Log button)", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByTestId("health-logs-fab")).toBeTruthy();
    });

    it("renders appointment banner", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByText("Now: Physical Therapy Appointment")).toBeTruthy();
      expect(getByText("02:00 PM")).toBeTruthy();
      expect(getByText("View")).toBeTruthy();
    });

    it("renders scroll view", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(getByTestId("health-logs-scroll")).toBeTruthy();
    });
  });

  // ==========================================
  // USER INTERACTION TESTS
  // ==========================================
  describe("User Interactions", () => {
    it("shows alert when BP card is pressed", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      fireEvent.press(getByText("BP Today"));
      expect(Alert.alert).toHaveBeenCalledWith(
        "Blood Pressure Details",
        "View detailed blood pressure information and history.",
        [{ text: "OK" }],
      );
    });

    it("shows alert when Medications card is pressed", () => {
      const { getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      fireEvent.press(getByText("Medications"));
      expect(Alert.alert).toHaveBeenCalledWith(
        "Medications Details",
        "View detailed medications information and history.",
        [{ text: "OK" }],
      );
    });

    it("shows alert when Meals card is pressed", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const mealsCard = getByLabelText("Meals today, 1240 calories consumed");
      fireEvent.press(mealsCard);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Meals Details",
        "View detailed meals information and history.",
        [{ text: "OK" }],
      );
    });

    it("shows alert when Mood card is pressed", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const moodCard = getByLabelText(
        "Mood today is good, trending up and improving",
      );
      fireEvent.press(moodCard);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Mood Details",
        "View detailed mood information and history.",
        [{ text: "OK" }],
      );
    });

    it("changes selected tab when a filter tab is pressed", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );

      const vitalsTab = getByTestId("tab-vitals");
      fireEvent.press(vitalsTab);

      expect(vitalsTab).toBeTruthy();
    });

    it("expands log entry when pressed", async () => {
      const { getByTestId, getByText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );

      const logEntry = getByTestId("log-entry-1");
      fireEvent.press(logEntry);

      await waitFor(() => {
        expect(getByText("systolic: 120")).toBeTruthy();
        expect(getByText("diastolic: 80")).toBeTruthy();
      });
    });

    it("shows alert when FAB is pressed", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      fireEvent.press(getByTestId("health-logs-fab"));
      expect(Alert.alert).toHaveBeenCalledWith(
        "Add Health Log",
        "Feature coming soon: Record a new health log entry.",
        [{ text: "OK" }],
      );
    });

    it("shows alert when appointment banner View button is pressed", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      fireEvent.press(getByTestId("appointment-view"));
      expect(Alert.alert).toHaveBeenCalledWith(
        "Appointment Details",
        "Physical Therapy Appointment\nTime: 02:00 PM\nLocation: At clinic",
        [{ text: "Close" }],
      );
    });
  });

  // ==========================================
  // ACCESSIBILITY TESTS
  // ==========================================
  describe("Accessibility", () => {
    it("BP card has correct accessibility label", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(
        getByLabelText(
          "Blood pressure today, 120 over 80 millimeters of mercury",
        ),
      ).toBeTruthy();
    });

    it("Medications card has correct accessibility label", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(
        getByLabelText("Medications today, 2 of 2 completed"),
      ).toBeTruthy();
    });

    it("Meals card has correct accessibility label", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(
        getByLabelText("Meals today, 1240 calories consumed"),
      ).toBeTruthy();
    });

    it("Mood card has correct accessibility label", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      expect(
        getByLabelText("Mood today is good, trending up and improving"),
      ).toBeTruthy();
    });

    it("summary cards have button role", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const bpCard = getByLabelText(
        "Blood pressure today, 120 over 80 millimeters of mercury",
      );
      expect(bpCard.props.accessibilityRole).toBe("button");
    });

    it("summary cards have accessibility hints", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const bpCard = getByLabelText(
        "Blood pressure today, 120 over 80 millimeters of mercury",
      );
      expect(bpCard.props.accessibilityHint).toBe(
        "View detailed blood pressure history",
      );
    });

    it("filter tabs have correct accessibility labels", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const allTab = getByTestId("tab-all");
      expect(allTab.props.accessibilityLabel).toBe("All filter");
    });

    it("filter tabs have button role", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const allTab = getByTestId("tab-all");
      expect(allTab.props.accessibilityRole).toBe("button");
    });

    it("selected tab has correct accessibility state", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const allTab = getByTestId("tab-all");
      expect(allTab.props.accessibilityState).toEqual({ selected: true });
    });

    it("unselected tabs have correct accessibility state", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const vitalsTab = getByTestId("tab-vitals");
      expect(vitalsTab.props.accessibilityState).toEqual({ selected: false });
    });

    it("log entries have correct accessibility labels", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const logEntry = getByTestId("log-entry-1");
      expect(logEntry.props.accessibilityLabel).toContain("Blood Pressure");
    });

    it("log entries have button role", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const logEntry = getByTestId("log-entry-1");
      expect(logEntry.props.accessibilityRole).toBe("button");
    });

    it("log entries have accessibility hints", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const logEntry = getByTestId("log-entry-1");
      expect(logEntry.props.accessibilityHint).toBeTruthy();
    });

    it("expanded log entry has updated accessibility state", async () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );

      const logEntry = getByTestId("log-entry-1");
      fireEvent.press(logEntry);

      await waitFor(() => {
        expect(logEntry.props.accessibilityState).toEqual({ expanded: true });
      });
    });

    it("FAB has correct accessibility label", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const fab = getByTestId("health-logs-fab");
      expect(fab.props.accessibilityLabel).toBe("Add new health log entry");
    });

    it("FAB has correct accessibility hint", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const fab = getByTestId("health-logs-fab");
      expect(fab.props.accessibilityHint).toBe(
        "Opens form to record a new health log",
      );
    });

    it("appointment banner has live region for screen readers", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const banner = getByLabelText(
        "Current appointment, Physical Therapy at 2:00 PM at clinic",
      );
      expect(banner.props.accessibilityLiveRegion).toBe("polite");
    });

    it("appointment view button has correct accessibility", () => {
      const { getByTestId } = render(
        <HealthLogsScreen navigation={mockNavigation as any} />,
      );
      const viewButton = getByTestId("appointment-view");
      expect(viewButton.props.accessibilityRole).toBe("button");
      expect(viewButton.props.accessibilityLabel).toBe(
        "View appointment details",
      );
    });
  });
});
