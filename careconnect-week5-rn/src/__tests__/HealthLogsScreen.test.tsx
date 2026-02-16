import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";

import { HealthLogsScreen } from "@/src/screens/HealthLogsScreen";

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  setOptions: jest.fn(),
};

jest.spyOn(Alert, "alert");

describe("HealthLogsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText("BP Today")).toBeTruthy();
  });

  it("renders all summary cards", () => {
    const { getByText, getAllByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText("BP Today")).toBeTruthy();
    expect(getByText("120/80")).toBeTruthy();
    expect(getByText("mmHg")).toBeTruthy();

    expect(getByText("Medications")).toBeTruthy();
    expect(getByText("2/2")).toBeTruthy();
    expect(getByText("Completed")).toBeTruthy();

    const mealsElements = getAllByText("Meals");
    expect(mealsElements.length).toBeGreaterThanOrEqual(1);
    expect(getByText("1,240")).toBeTruthy();
    expect(getByText("Calories")).toBeTruthy();

    const moodElements = getAllByText("Mood");
    expect(moodElements.length).toBeGreaterThanOrEqual(1);
    expect(getByText("Good")).toBeTruthy();
    expect(getByText("Improving")).toBeTruthy();
  });

  it("renders all filter tabs", () => {
    const { getByText, getAllByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText("All")).toBeTruthy();
    expect(getByText("Vitals")).toBeTruthy();
    expect(getByText("Meds")).toBeTruthy();

    const mealsElements = getAllByText("Meals");
    expect(mealsElements.length).toBeGreaterThanOrEqual(1);

    const moodElements = getAllByText("Mood");
    expect(moodElements.length).toBeGreaterThanOrEqual(1);

    expect(getByText("Symptoms")).toBeTruthy();
    expect(getByText("Activity")).toBeTruthy();
  });

  it("selects tab when pressed", () => {
    const { getByTestId } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const vitalsTab = getByTestId("tab-vitals");
    fireEvent.press(vitalsTab);

    expect(vitalsTab).toBeTruthy();
  });

  it("renders all 5 log entries", () => {
    const { getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText("Blood Pressure")).toBeTruthy();
    expect(getByText("120/80 mmHg")).toBeTruthy();

    expect(getByText("Mood Check")).toBeTruthy();
    expect(getByText("Feeling good today")).toBeTruthy();

    expect(getByText("Medication Taken")).toBeTruthy();
    expect(getByText("Morning medications completed")).toBeTruthy();

    expect(getByText("Breakfast")).toBeTruthy();
    expect(getByText("Oatmeal with berries, green tea")).toBeTruthy();

    expect(getByText("No symptoms reported")).toBeTruthy();
    expect(getByText("Feeling well, no concerns")).toBeTruthy();
  });

  it("displays time stamps for all entries", () => {
    const { getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText("1 hour ago")).toBeTruthy();
    expect(getByText("2 hours ago")).toBeTruthy();
    expect(getByText("3 hours ago")).toBeTruthy();
    expect(getByText("4 hours ago")).toBeTruthy();
    expect(getByText("1 day ago")).toBeTruthy();
  });

  it("displays tags for all entries", () => {
    const { getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText("vitals")).toBeTruthy();
    expect(getByText("mood")).toBeTruthy();
    expect(getByText("medication")).toBeTruthy();
    expect(getByText("meal")).toBeTruthy();
    expect(getByText("symptoms")).toBeTruthy();
  });

  it("expands blood pressure log entry when pressed", () => {
    const { getByTestId, getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const logEntry = getByTestId("log-entry-1");
    fireEvent.press(logEntry);

    expect(getByText("systolic: 120")).toBeTruthy();
    expect(getByText("diastolic: 80")).toBeTruthy();
    expect(getByText("heartRate: 72")).toBeTruthy();
  });

  it("expands mood check log entry when pressed", () => {
    const { getByTestId, getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const logEntry = getByTestId("log-entry-2");
    fireEvent.press(logEntry);

    expect(getByText("mood: happy")).toBeTruthy();
    expect(getByText("energy: high")).toBeTruthy();
  });

  it("expands medication log entry when pressed", () => {
    const { getByTestId, getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const logEntry = getByTestId("log-entry-3");
    fireEvent.press(logEntry);

    expect(
      getByText("medications: Lisinopril 10mg, Metformin 500mg"),
    ).toBeTruthy();
  });

  it("expands breakfast log entry when pressed", () => {
    const { getByTestId, getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const logEntry = getByTestId("log-entry-4");
    fireEvent.press(logEntry);

    expect(getByText("calories: 320")).toBeTruthy();
    expect(getByText("protein: 12")).toBeTruthy();
  });

  it("collapses expanded log entry when pressed again", () => {
    const { getByTestId, queryByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const logEntry = getByTestId("log-entry-1");

    fireEvent.press(logEntry);
    expect(queryByText("systolic: 120")).toBeTruthy();

    fireEvent.press(logEntry);
    expect(queryByText("systolic: 120")).toBeFalsy();
  });

  it("only expands one entry at a time", () => {
    const { getByTestId, queryByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const entry1 = getByTestId("log-entry-1");
    fireEvent.press(entry1);
    expect(queryByText("systolic: 120")).toBeTruthy();

    const entry2 = getByTestId("log-entry-2");
    fireEvent.press(entry2);
    expect(queryByText("systolic: 120")).toBeFalsy();
    expect(queryByText("mood: happy")).toBeTruthy();
  });

  it("renders appointment banner", () => {
    const { getByText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText("Now: Physical Therapy Appointment")).toBeTruthy();
    expect(getByText("02:00 PM")).toBeTruthy();
    expect(getByText("At clinic")).toBeTruthy();
    expect(getByText("View")).toBeTruthy();
  });

  it("has proper accessibility labels", () => {
    const { getByLabelText } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByLabelText("Add new health log entry")).toBeTruthy();
    expect(getByLabelText(/Blood Pressure/)).toBeTruthy();
    expect(getByLabelText(/Mood Check/)).toBeTruthy();
    expect(getByLabelText(/Medication Taken/)).toBeTruthy();
    expect(getByLabelText(/Breakfast/)).toBeTruthy();
    expect(getByLabelText(/No symptoms reported/)).toBeTruthy();
    expect(getByLabelText("All filter")).toBeTruthy();
    expect(getByLabelText("View appointment details")).toBeTruthy();
  });

  it("has proper testIDs for all interactive elements", () => {
    const { getByTestId } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByTestId("health-logs-scroll")).toBeTruthy();
    expect(getByTestId("tab-all")).toBeTruthy();
    expect(getByTestId("tab-vitals")).toBeTruthy();
    expect(getByTestId("tab-meds")).toBeTruthy();
    expect(getByTestId("tab-meals")).toBeTruthy();
    expect(getByTestId("tab-mood")).toBeTruthy();
    expect(getByTestId("tab-symptoms")).toBeTruthy();
    expect(getByTestId("tab-activity")).toBeTruthy();
    expect(getByTestId("log-entry-1")).toBeTruthy();
    expect(getByTestId("log-entry-2")).toBeTruthy();
    expect(getByTestId("log-entry-3")).toBeTruthy();
    expect(getByTestId("log-entry-4")).toBeTruthy();
    expect(getByTestId("log-entry-5")).toBeTruthy();
    expect(getByTestId("health-logs-fab")).toBeTruthy();
    expect(getByTestId("appointment-view")).toBeTruthy();
  });

  it("renders with scrollable content", () => {
    const { getByTestId } = render(
      <HealthLogsScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const scrollView = getByTestId("health-logs-scroll");
    expect(scrollView).toBeTruthy();
  });

  describe("Accessibility Enhancements", () => {
    it("summary cards have proper accessibility roles", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const bpCard = getByLabelText(/Blood pressure today/i);
      expect(bpCard.props.accessibilityRole).toBe("button");

      const medCard = getByLabelText(/Medications today/i);
      expect(medCard.props.accessibilityRole).toBe("button");

      const mealsCard = getByLabelText(/Meals today/i);
      expect(mealsCard.props.accessibilityRole).toBe("button");

      const moodCard = getByLabelText(/Mood today/i);
      expect(moodCard.props.accessibilityRole).toBe("button");
    });

    it("summary cards have accessibility hints", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const bpCard = getByLabelText(/Blood pressure today/i);
      expect(bpCard.props.accessibilityHint).toBe(
        "View detailed blood pressure history",
      );

      const medCard = getByLabelText(/Medications today/i);
      expect(medCard.props.accessibilityHint).toBe("View medication details");
    });

    it("filter tabs have proper accessibility state", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const allTab = getByLabelText("All filter");
      expect(allTab.props.accessibilityState.selected).toBe(true);

      const vitalsTab = getByLabelText("Vitals filter");
      expect(vitalsTab.props.accessibilityState.selected).toBe(false);
    });

    it("filter tabs update accessibility state on selection", () => {
      const { getByTestId, getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const vitalsTab = getByTestId("tab-vitals");
      fireEvent.press(vitalsTab);

      const vitalsLabel = getByLabelText("Vitals filter");
      expect(vitalsLabel.props.accessibilityState.selected).toBe(true);
    });

    it("filter tabs have accessibility hints", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const vitalsTab = getByLabelText("Vitals filter");
      expect(vitalsTab.props.accessibilityHint).toBe(
        "Filter health logs to show vitals entries",
      );

      const medsTab = getByLabelText("Meds filter");
      expect(medsTab.props.accessibilityHint).toBe(
        "Filter health logs to show meds entries",
      );
    });

    it("log entries have proper accessibility roles", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const bpEntry = getByLabelText(/Blood Pressure/);
      expect(bpEntry.props.accessibilityRole).toBe("button");
    });

    it("log entries have expanded state in accessibility", () => {
      const { getByTestId, getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const logEntry = getByTestId("log-entry-1");
      const bpLabel = getByLabelText(/Blood Pressure/);

      expect(bpLabel.props.accessibilityState.expanded).toBe(false);

      fireEvent.press(logEntry);
      expect(bpLabel.props.accessibilityState.expanded).toBe(true);
    });

    it("log entries have context-aware accessibility hints", () => {
      const { getByTestId, getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const logEntry = getByTestId("log-entry-1");
      const bpLabel = getByLabelText(/Blood Pressure/);

      expect(bpLabel.props.accessibilityHint).toBe("Expand to view details");

      fireEvent.press(logEntry);
      expect(bpLabel.props.accessibilityHint).toBe("Collapse details");
    });

    it("FAB has proper accessibility role and hint", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const fab = getByLabelText("Add new health log entry");
      expect(fab.props.accessibilityRole).toBe("button");
      expect(fab.props.accessibilityHint).toBe(
        "Opens form to record a new health log",
      );
    });

    it("appointment banner has alert role", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const banner = getByLabelText(/Current appointment/i);
      expect(banner.props.accessibilityRole).toBe("alert");
    });

    it("appointment banner has live region", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const banner = getByLabelText(/Current appointment/i);
      expect(banner.props.accessibilityLiveRegion).toBe("polite");
    });

    it("view appointment button has proper accessibility", () => {
      const { getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const viewButton = getByLabelText("View appointment details");
      expect(viewButton.props.accessibilityRole).toBe("button");
      expect(viewButton.props.accessibilityHint).toBe(
        "Opens appointment information",
      );
    });

    it("expanded log details have accessibility labels", () => {
      const { getByTestId, getByLabelText } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const logEntry = getByTestId("log-entry-1");
      fireEvent.press(logEntry);

      const details = getByLabelText(/Details:/);
      expect(details).toBeTruthy();
    });

    it("all interactive elements have button role", () => {
      const { getAllByRole } = render(
        <HealthLogsScreen
          navigation={mockNavigation as any}
          route={{} as any}
        />,
      );

      const buttons = getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});
