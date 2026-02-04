import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import { AppNavigator } from '@/src/navigation/AppNavigator';

describe('AppNavigator', () => {
  it('renders the welcome screen as the initial route', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    expect(getByText('CareConnect')).toBeTruthy();
  });
});
