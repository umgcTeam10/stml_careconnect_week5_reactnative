import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { RootNavigator } from "@/src/navigation/RootNavigator";

const getDisabledState = (element: {
  props: { disabled?: boolean; accessibilityState?: any };
}) => element.props.disabled ?? element.props.accessibilityState?.disabled;

describe("Navigation flow", () => {
  it("navigates from Welcome to Home", async () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>,
    );

    fireEvent.press(getByTestId("welcome-get-started"));
    await waitFor(() => {
      expect(getByText("Choose your role")).toBeTruthy();
    });

    fireEvent.press(getByTestId("role-caregiver"));
    await waitFor(() => {
      expect(getDisabledState(getByTestId("role-continue"))).toBe(false);
    });
    fireEvent.press(getByTestId("role-continue"));

    await waitFor(() => {
      expect(getByText("Welcome Back")).toBeTruthy();
    });

    fireEvent.changeText(getByTestId("login-email"), "user@example.com");
    fireEvent.changeText(getByTestId("login-password"), "123456");
    fireEvent.press(getByTestId("login-submit"));

    await waitFor(
      () => {
        expect(getByText("Your Health Today")).toBeTruthy();
      },
      { timeout: 3000 },
    );
  });
});
