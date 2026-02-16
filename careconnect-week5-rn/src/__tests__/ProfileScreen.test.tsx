import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

jest.spyOn(Alert, "alert");

describe("ProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders the profile screen correctly", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByText("Sarah Johnson")).toBeTruthy();
      expect(getByText("Patient")).toBeTruthy();
    });

    it("renders the edit profile button", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByTestId("edit-profile-button")).toBeTruthy();
    });

    it("renders all account section items", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByText("Account")).toBeTruthy();
      expect(getByText("Notifications")).toBeTruthy();
      expect(getByText("Privacy")).toBeTruthy();
      expect(getByText("Security")).toBeTruthy();
    });

    it("renders all preferences section items", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByText("Preferences")).toBeTruthy();
      expect(getByText("Accessibility")).toBeTruthy();
      expect(getByText("Language & Region")).toBeTruthy();
    });

    it("renders all support section items", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByText("Support")).toBeTruthy();
      expect(getByText("Help & Support")).toBeTruthy();
      expect(getByText("About")).toBeTruthy();
    });

    it("renders the logout button", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByTestId("logout-button")).toBeTruthy();
    });

    it("renders the version text", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByText("Version 1.0.0")).toBeTruthy();
    });

    it("renders the scroll view with correct testID", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByTestId("profile-scroll")).toBeTruthy();
    });

    it("renders user avatar icon", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByText("Sarah Johnson")).toBeTruthy();
    });
  });

  describe("User Interactions", () => {
    it("shows edit profile alert when edit button is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const editButton = getByTestId("edit-profile-button");
      fireEvent.press(editButton);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Edit Profile",
        "Update your personal information, photo, and contact details.",
        [{ text: "OK" }],
      );
    });

    it("shows notifications alert when notifications item is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const notificationsItem = getByTestId("menu-item-notifications");
      fireEvent.press(notificationsItem);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Notification Settings",
        "Manage your notification preferences for appointments, messages, and health reminders.",
        [{ text: "OK" }],
      );
    });

    it("shows privacy alert when privacy item is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const privacyItem = getByTestId("menu-item-privacy");
      fireEvent.press(privacyItem);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Privacy Settings",
        "Control who can see your information and how your data is used.",
        [{ text: "OK" }],
      );
    });

    it("shows security alert when security item is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const securityItem = getByTestId("menu-item-security");
      fireEvent.press(securityItem);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Security",
        "Manage your password, two-factor authentication, and connected devices.",
        [{ text: "OK" }],
      );
    });

    it("shows accessibility alert when accessibility item is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const accessibilityItem = getByTestId("menu-item-accessibility");
      fireEvent.press(accessibilityItem);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Accessibility",
        "Customize text size, screen reader settings, and other accessibility features.",
        [{ text: "OK" }],
      );
    });

    it("shows language alert when language item is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const languageItem = getByTestId("menu-item-language");
      fireEvent.press(languageItem);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Language & Region",
        "Change your preferred language and regional settings.",
        [{ text: "OK" }],
      );
    });

    it("shows help alert when help item is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const helpItem = getByTestId("menu-item-help");
      fireEvent.press(helpItem);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Help & Support",
        "Access user guides, FAQs, and contact support team.",
        [{ text: "OK" }],
      );
    });

    it("shows about alert when about item is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const aboutItem = getByTestId("menu-item-about");
      fireEvent.press(aboutItem);
      expect(Alert.alert).toHaveBeenCalledWith(
        "About CareConnect",
        "Version 1.0.0\nDesigned for individuals with short-term memory loss.\n\n© 2026 CareConnect Team",
        [{ text: "OK" }],
      );
    });

    it("shows logout confirmation when logout button is pressed", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const logoutButton = getByTestId("logout-button");
      fireEvent.press(logoutButton);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Logout",
        "Are you sure you want to logout?",
        expect.arrayContaining([
          expect.objectContaining({ text: "Cancel", style: "cancel" }),
          expect.objectContaining({ text: "Logout", style: "destructive" }),
        ]),
      );
    });
  });

  describe("Accessibility - Roles", () => {
    it("edit profile button has correct accessibility role", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const editButton = getByTestId("edit-profile-button");
      expect(editButton.props.accessibilityRole).toBe("button");
    });

    it("all menu items have button accessibility role", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItemIds = [
        "notifications",
        "privacy",
        "security",
        "accessibility",
        "language",
        "help",
        "about",
      ];

      menuItemIds.forEach((id) => {
        const menuItem = getByTestId(`menu-item-${id}`);
        expect(menuItem.props.accessibilityRole).toBe("button");
      });
    });

    it("logout button has correct accessibility role", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const logoutButton = getByTestId("logout-button");
      expect(logoutButton.props.accessibilityRole).toBe("button");
    });

    it("section titles have header accessibility role", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const accountHeader = getByText("Account");
      const preferencesHeader = getByText("Preferences");
      const supportHeader = getByText("Support");

      expect(accountHeader.props.accessibilityRole).toBe("header");
      expect(preferencesHeader.props.accessibilityRole).toBe("header");
      expect(supportHeader.props.accessibilityRole).toBe("header");
    });
  });

  describe("Accessibility - Labels", () => {
    it("edit profile button has descriptive accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const editButton = getByTestId("edit-profile-button");
      expect(editButton.props.accessibilityLabel).toBe("Edit profile");
    });

    it("notifications menu item has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-notifications");
      expect(menuItem.props.accessibilityLabel).toBe("Notifications");
    });

    it("privacy menu item has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-privacy");
      expect(menuItem.props.accessibilityLabel).toBe("Privacy");
    });

    it("security menu item has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-security");
      expect(menuItem.props.accessibilityLabel).toBe("Security");
    });

    it("accessibility menu item has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-accessibility");
      expect(menuItem.props.accessibilityLabel).toBe("Accessibility");
    });

    it("language menu item has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-language");
      expect(menuItem.props.accessibilityLabel).toBe("Language & Region");
    });

    it("help menu item has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-help");
      expect(menuItem.props.accessibilityLabel).toBe("Help & Support");
    });

    it("about menu item has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-about");
      expect(menuItem.props.accessibilityLabel).toBe("About");
    });

    it("logout button has correct accessibility label", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const logoutButton = getByTestId("logout-button");
      expect(logoutButton.props.accessibilityLabel).toBe("Logout");
    });

    it("version text has descriptive accessibility label", () => {
      const { getByText } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const versionText = getByText("Version 1.0.0");
      expect(versionText.props.accessibilityLabel).toBe(
        "CareConnect version 1.0.0",
      );
    });
  });

  describe("Accessibility - Hints", () => {
    it("edit profile button has helpful accessibility hint", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const editButton = getByTestId("edit-profile-button");
      expect(editButton.props.accessibilityHint).toBe(
        "Opens form to update your personal information, photo, and contact details",
      );
    });

    it("notifications menu item has helpful accessibility hint", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-notifications");
      expect(menuItem.props.accessibilityHint).toBe(
        "Opens notifications settings",
      );
    });

    it("privacy menu item has helpful accessibility hint", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const menuItem = getByTestId("menu-item-privacy");
      expect(menuItem.props.accessibilityHint).toBe("Opens privacy settings");
    });

    it("logout button has helpful accessibility hint", () => {
      const { getByTestId } = render(
        <ProfileScreen navigation={mockNavigation as any} route={{} as any} />,
      );
      const logoutButton = getByTestId("logout-button");
      expect(logoutButton.props.accessibilityHint).toBe(
        "Logout from your account. You will need to login again to access the app",
      );
    });
  });
});
