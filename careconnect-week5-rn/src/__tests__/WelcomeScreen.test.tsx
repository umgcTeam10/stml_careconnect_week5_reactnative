import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { WelcomeScreen } from '@/src/screens/WelcomeScreen';

jest.mock('@/src/utils/accessibilityFocus', () => ({
  useScreenFocusEffect: () => {},
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

const createNavigation = () => ({
  navigate: jest.fn(),
});

function renderWelcomeScreen(navigation: ReturnType<typeof createNavigation>) {
  return render(
    <WelcomeScreen navigation={navigation as any} route={{ key: 'Welcome', name: 'Welcome' }} />
  );
}

describe('WelcomeScreen', () => {
  it('renders the title and actions', () => {
    const navigation = createNavigation();
    const { getByTestId, getByText } = renderWelcomeScreen(navigation);

    expect(getByText('CareConnect')).toBeTruthy();
    expect(getByText('Compassionate care coordination made simple')).toBeTruthy();
    expect(getByTestId('welcome-login')).toBeTruthy();
    expect(getByTestId('welcome-get-started')).toBeTruthy();
  });

  it('navigates when buttons are pressed', () => {
    const navigation = createNavigation();
    const { getByTestId } = renderWelcomeScreen(navigation);

    fireEvent.press(getByTestId('welcome-login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');

    fireEvent.press(getByTestId('welcome-get-started'));
    expect(navigation.navigate).toHaveBeenCalledWith('Role');
  });
});
