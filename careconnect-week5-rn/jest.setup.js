jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

jest.mock(
  "react-native-calendars",
  () => {
    const React = require("react");
    const { Text, TouchableOpacity, View } = require("react-native");

    function Calendar({ current, onDayPress, onMonthChange }) {
      return React.createElement(
        View,
        { testID: "mock-calendar", accessibilityLabel: "Mock calendar" },
        React.createElement(Text, null, current ?? ""),
        React.createElement(
          TouchableOpacity,
          {
            accessibilityLabel: "Select Tue Jan 27 2026",
            onPress: () => onDayPress?.({ dateString: "2026-01-27" }),
          },
          React.createElement(Text, null, "27"),
        ),
        React.createElement(
          TouchableOpacity,
          {
            accessibilityLabel: "Swipe to Feb 2026",
            onPress: () => onMonthChange?.({ year: 2026, month: 2 }),
          },
          React.createElement(Text, null, "next month"),
        ),
      );
    }

    return { Calendar };
  },
  { virtual: true },
);
