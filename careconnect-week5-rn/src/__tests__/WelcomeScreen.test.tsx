import { fireEvent, render } from '@testing-library/react-native';

import { WelcomeScreen } from '@/src/screens/WelcomeScreen';

const createNavigation = () => ({
  navigate: jest.fn(),
});

describe('WelcomeScreen', () => {
  it('renders the title and actions', () => {
    const navigation = createNavigation();
    const { getByTestId, getByText } = render(
      <WelcomeScreen navigation={navigation as any} route={{ key: 'Welcome', name: 'Welcome' }} />
    );

    expect(getByText('CareConnect')).toBeTruthy();
    expect(getByText('Compassionate care coordination made simple')).toBeTruthy();
    expect(getByTestId('welcome-login')).toBeTruthy();
    expect(getByTestId('welcome-get-started')).toBeTruthy();
  });

  it('navigates when buttons are pressed', () => {
    const navigation = createNavigation();
    const { getByTestId } = render(
      <WelcomeScreen navigation={navigation as any} route={{ key: 'Welcome', name: 'Welcome' }} />
    );

    fireEvent.press(getByTestId('welcome-login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');

    fireEvent.press(getByTestId('welcome-get-started'));
    expect(navigation.navigate).toHaveBeenCalledWith('Role');
  });
});
