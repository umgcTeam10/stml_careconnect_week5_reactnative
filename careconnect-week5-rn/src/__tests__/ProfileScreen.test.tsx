import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { ProfileScreen } from '@/src/screens/ProfileScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });

  it('displays user profile information', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('SJ')).toBeTruthy();
    expect(getByText('Sarah Johnson')).toBeTruthy();
    expect(getByText('Caregiver')).toBeTruthy();
  });

  it('displays contact information', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('sarah.johnson@email.com')).toBeTruthy();
    expect(getByText('(555) 123-4567')).toBeTruthy();
  });

  it('renders notification settings section', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('Notifications')).toBeTruthy();
    expect(getByText('Push Notifications')).toBeTruthy();
    expect(getByText('Email Notifications')).toBeTruthy();
    expect(getByText('Task Reminders')).toBeTruthy();
  });

  it('toggles push notifications switch', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const pushToggle = getByTestId('toggle-push');
    expect(pushToggle.props.value).toBe(true);

    fireEvent(pushToggle, 'valueChange', false);
    expect(pushToggle.props.value).toBe(false);
  });

  it('toggles email notifications switch', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const emailToggle = getByTestId('toggle-email');
    expect(emailToggle.props.value).toBe(true);

    fireEvent(emailToggle, 'valueChange', false);
    expect(emailToggle.props.value).toBe(false);
  });

  it('toggles task reminders switch', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const remindersToggle = getByTestId('toggle-reminders');
    expect(remindersToggle.props.value).toBe(true);

    fireEvent(remindersToggle, 'valueChange', false);
    expect(remindersToggle.props.value).toBe(false);
  });

  it('renders preferences section', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('Preferences')).toBeTruthy();
    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('toggles dark mode switch', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const darkModeToggle = getByTestId('toggle-dark-mode');
    expect(darkModeToggle.props.value).toBe(false);

    fireEvent(darkModeToggle, 'valueChange', true);
    expect(darkModeToggle.props.value).toBe(true);
  });

  it('renders accessibility section', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('Accessibility')).toBeTruthy();
    expect(getByText('Text Size')).toBeTruthy();
    expect(getByText('High Contrast')).toBeTruthy();
  });

  it('shows not implemented alert when settings button is pressed', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const settingsButton = getByTestId('profile-settings-button');
    fireEvent.press(settingsButton);

    expect(Alert.alert).toHaveBeenCalledWith('Not Implemented', 'This feature is not implemented in Week 5');
  });

  it('shows not implemented alert when edit button is pressed', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const editButton = getByTestId('profile-edit');
    fireEvent.press(editButton);

    expect(Alert.alert).toHaveBeenCalledWith('Not Implemented', 'This feature is not implemented in Week 5');
  });

  it('shows not implemented alert when text size is pressed', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const textSizeButton = getByTestId('settings-text-size');
    fireEvent.press(textSizeButton);

    expect(Alert.alert).toHaveBeenCalledWith('Not Implemented', 'This feature is not implemented in Week 5');
  });

  it('shows not implemented alert when sign out is pressed', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    const signOutButton = getByTestId('profile-signout');
    fireEvent.press(signOutButton);

    expect(Alert.alert).toHaveBeenCalledWith('Not Implemented', 'This feature is not implemented in Week 5');
  });

  it('renders appointment banner', () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByText('Now: Physical Therapy Appointment')).toBeTruthy();
    expect(getByText('02:00 PM')).toBeTruthy();
    expect(getByText('At clinic')).toBeTruthy();
    expect(getByText('View')).toBeTruthy();
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByLabelText('Settings button')).toBeTruthy();
    expect(getByLabelText('Edit profile')).toBeTruthy();
    expect(getByLabelText('Text Size settings')).toBeTruthy();
    expect(getByLabelText('Sign out')).toBeTruthy();
  });

  it('has proper testIDs for all interactive elements', () => {
    const { getByTestId } = render(<ProfileScreen navigation={mockNavigation as any} route={{} as any} />);

    expect(getByTestId('profile-settings-button')).toBeTruthy();
    expect(getByTestId('profile-scroll-view')).toBeTruthy();
    expect(getByTestId('profile-edit')).toBeTruthy();
    expect(getByTestId('toggle-push')).toBeTruthy();
    expect(getByTestId('toggle-email')).toBeTruthy();
    expect(getByTestId('toggle-reminders')).toBeTruthy();
    expect(getByTestId('toggle-dark-mode')).toBeTruthy();
    expect(getByTestId('settings-text-size')).toBeTruthy();
    expect(getByTestId('settings-contrast')).toBeTruthy();
    expect(getByTestId('settings-privacy')).toBeTruthy();
    expect(getByTestId('settings-help')).toBeTruthy();
    expect(getByTestId('profile-signout')).toBeTruthy();
    expect(getByTestId('appointment-view')).toBeTruthy();
  });
});