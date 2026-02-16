import { fireEvent, render, waitFor } from "@testing-library/react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeScreen } from "@/src/screens/HomeScreen";

const createNavigation = () => ({
  navigate: jest.fn(),
  setOptions: jest.fn(),
});

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it("renders the home dashboard layout and default patient role", async () => {
    const navigation = createNavigation();
    const { getByText } = render(
      <HomeScreen
        navigation={navigation as any}
        route={{ key: "Home", name: "Home" } as any}
      />,
    );

    expect(getByText("Your Health Today")).toBeTruthy();
    expect(getByText("How are you feeling today?")).toBeTruthy();
    expect(getByText("Next Appointment")).toBeTruthy();
    expect(getByText("Recent Wellness Check")).toBeTruthy();
    expect(getByText("Health Summary")).toBeTruthy();
    expect(getByText("Now: Physical Therapy Appointment")).toBeTruthy();
    await waitFor(() => {
      expect(getByText("Patient")).toBeTruthy();
    });
    expect(navigation.setOptions).toHaveBeenCalledWith({ headerShown: false });
  });

  it("navigates to health logs from full history button", () => {
    const navigation = createNavigation();
    const { getByTestId } = render(
      <HomeScreen
        navigation={navigation as any}
        route={{ key: "Home", name: "Home" } as any}
      />,
    );

    fireEvent.press(getByTestId("home-health-logs"));
    expect(navigation.navigate).toHaveBeenCalledWith("HealthLogs");
  });

  it("navigates from every dashboard action", () => {
    const navigation = createNavigation();
    const { getByRole, getByTestId } = render(
      <HomeScreen
        navigation={navigation as any}
        route={{ key: "Home", name: "Home" } as any}
      />,
    );

    const changeRole = getByRole("button", { name: "Change role" });
    const logWellness = getByRole("button", { name: "Log Wellness Check" });
    const viewTasks = getByRole("button", { name: "View all tasks" });
    const viewWellness = getByRole("button", {
      name: "View all wellness checks",
    });
    const sendMessage = getByRole("button", { name: "Send message" });
    const viewAppointment = getByRole("button", {
      name: "View appointment details",
    });

    expect(changeRole).toHaveProp(
      "accessibilityHint",
      "Navigates to the role selection screen",
    );
    expect(logWellness).toHaveProp(
      "accessibilityHint",
      "Opens your wellness logs screen",
    );
    expect(viewTasks).toBeEnabled();
    expect(viewWellness).toBeEnabled();
    expect(sendMessage).toBeEnabled();
    expect(viewAppointment).toBeEnabled();

    fireEvent.press(changeRole);
    fireEvent.press(logWellness);
    fireEvent.press(viewTasks);
    fireEvent.press(viewWellness);
    fireEvent.press(sendMessage);
    fireEvent.press(viewAppointment);
    fireEvent.press(getByTestId("home-health-logs"));

    expect(navigation.navigate).toHaveBeenNthCalledWith(1, "Auth", {
      screen: "Role",
    });
    expect(navigation.navigate).toHaveBeenNthCalledWith(2, "HealthLogs");
    expect(navigation.navigate).toHaveBeenNthCalledWith(3, "Tasks");
    expect(navigation.navigate).toHaveBeenNthCalledWith(4, "HealthLogs");
    expect(navigation.navigate).toHaveBeenNthCalledWith(5, "Messages");
    expect(navigation.navigate).toHaveBeenNthCalledWith(6, "Calendar");
    expect(navigation.navigate).toHaveBeenNthCalledWith(7, "HealthLogs");
  });

  it("shows stored caregiver role and can change role", async () => {
    const navigation = createNavigation();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("caregiver");
    const { getByRole, getByText } = render(
      <HomeScreen
        navigation={navigation as any}
        route={{ key: "Home", name: "Home" } as any}
      />,
    );

    await waitFor(() => {
      expect(getByText("Caregiver")).toBeTruthy();
    });

    fireEvent.press(getByRole("button", { name: "Change role" }));
    expect(navigation.navigate).toHaveBeenCalledWith("Auth", {
      screen: "Role",
    });
  });

  it("keeps compact touch targets at least 44x44", () => {
    const navigation = createNavigation();
    const { getByRole } = render(
      <HomeScreen
        navigation={navigation as any}
        route={{ key: "Home", name: "Home" } as any}
      />,
    );

    expect(getByRole("button", { name: "Change role" })).toHaveStyle({
      minHeight: 44,
      minWidth: 44,
    });
    expect(
      getByRole("button", { name: "View appointment details" }),
    ).toHaveStyle({
      minHeight: 44,
      minWidth: 44,
    });
  });

  it("shows stored care recipient role", async () => {
    const navigation = createNavigation();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("careRecipient");
    const { getByText } = render(
      <HomeScreen
        navigation={navigation as any}
        route={{ key: "Home", name: "Home" } as any}
      />,
    );

    await waitFor(() => {
      expect(getByText("Patient")).toBeTruthy();
    });
  });

  it("falls back to patient role when role storage read fails", async () => {
    const navigation = createNavigation();
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error("storage unavailable"),
    );
    const { getByText } = render(
      <HomeScreen
        navigation={navigation as any}
        route={{ key: "Home", name: "Home" } as any}
      />,
    );

    await waitFor(() => {
      expect(getByText("Patient")).toBeTruthy();
    });
  });
});
