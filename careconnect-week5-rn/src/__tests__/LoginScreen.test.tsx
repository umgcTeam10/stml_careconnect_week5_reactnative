import { Alert } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { LoginScreen } from '@/src/screens/LoginScreen';

const createNavigation = () => ({
  navigate: jest.fn(),
});

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error for invalid email', () => {
    const navigation = createNavigation();
    const { getByTestId, getByText } = render(
      <LoginScreen navigation={navigation as any} route={{ key: 'Login', name: 'Login' }} />
    );

    fireEvent.changeText(getByTestId('login-email'), 'invalid');
    fireEvent.changeText(getByTestId('login-password'), '123456');
    fireEvent.press(getByTestId('login-submit'));

    expect(getByText('Please enter a valid email.')).toBeTruthy();
  });

  it('shows error for short password', () => {
    const navigation = createNavigation();
    const { getByTestId, getByText } = render(
      <LoginScreen navigation={navigation as any} route={{ key: 'Login', name: 'Login' }} />
    );

    fireEvent.changeText(getByTestId('login-email'), 'user@example.com');
    fireEvent.changeText(getByTestId('login-password'), '123');
    fireEvent.press(getByTestId('login-submit'));

    expect(getByText('Password must be at least 6 characters.')).toBeTruthy();
  });

  it('navigates on valid credentials', () => {
    const navigation = createNavigation();
    const { getByTestId, queryByText } = render(
      <LoginScreen navigation={navigation as any} route={{ key: 'Login', name: 'Login' }} />
    );

    fireEvent.changeText(getByTestId('login-email'), 'user@example.com');
    fireEvent.changeText(getByTestId('login-password'), '123456');
    fireEvent.press(getByTestId('login-submit'));

    expect(queryByText('Please enter a valid email.')).toBeNull();
    expect(navigation.navigate).toHaveBeenCalledWith('AppTabs', { screen: 'Home' });
  });

  it('clears validation error on input change', () => {
    const navigation = createNavigation();
    const { getByTestId, getByText, queryByText } = render(
      <LoginScreen navigation={navigation as any} route={{ key: 'Login', name: 'Login' }} />
    );

    fireEvent.changeText(getByTestId('login-email'), 'invalid');
    fireEvent.changeText(getByTestId('login-password'), '123456');
    fireEvent.press(getByTestId('login-submit'));
    expect(getByText('Please enter a valid email.')).toBeTruthy();

    fireEvent.changeText(getByTestId('login-email'), 'user@example.com');
    expect(queryByText('Please enter a valid email.')).toBeNull();
  });

  it('triggers forgot password alert', () => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const navigation = createNavigation();
    const { getByTestId } = render(
      <LoginScreen navigation={navigation as any} route={{ key: 'Login', name: 'Login' }} />
    );

    fireEvent.press(getByTestId('login-forgot'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Reset password',
      'We will help you reset your password soon.'
    );
  });

  it('toggles remember me checkbox', () => {
    const navigation = createNavigation();
    const { getByRole } = render(
      <LoginScreen navigation={navigation as any} route={{ key: 'Login', name: 'Login' }} />
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox.props.accessibilityState?.checked).toBe(false);

    fireEvent.press(checkbox);
    expect(checkbox.props.accessibilityState?.checked).toBe(true);
  });
});
