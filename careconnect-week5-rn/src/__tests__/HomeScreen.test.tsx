import { fireEvent, render, waitFor } from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen } from '@/src/screens/HomeScreen';

const createNavigation = () => ({
  navigate: jest.fn(),
});

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the home placeholder and missing role', async () => {
    const navigation = createNavigation();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const { getByText } = render(
      <HomeScreen navigation={navigation as any} route={{ key: 'Home', name: 'Home' } as any} />
    );

    expect(getByText('Home (placeholder)')).toBeTruthy();
    await waitFor(() => {
      expect(getByText('Selected role: Not set')).toBeTruthy();
    });
  });

  it('navigates to health logs when pressed', () => {
    const navigation = createNavigation();
    const { getByTestId } = render(
      <HomeScreen navigation={navigation as any} route={{ key: 'Home', name: 'Home' } as any} />
    );

    fireEvent.press(getByTestId('home-health-logs'));
    expect(navigation.navigate).toHaveBeenCalledWith('HealthLogs');
  });

  it('shows stored caregiver role and can change role', async () => {
    const navigation = createNavigation();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('caregiver');
    const { getByText, getByLabelText } = render(
      <HomeScreen navigation={navigation as any} route={{ key: 'Home', name: 'Home' } as any} />
    );

    await waitFor(() => {
      expect(getByText('Selected role: Caregiver')).toBeTruthy();
    });

    fireEvent.press(getByLabelText('Change role'));
    expect(navigation.navigate).toHaveBeenCalledWith('Auth', { screen: 'Role' });
  });

  it('shows stored care recipient role', async () => {
    const navigation = createNavigation();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('careRecipient');
    const { getByText } = render(
      <HomeScreen navigation={navigation as any} route={{ key: 'Home', name: 'Home' } as any} />
    );

    await waitFor(() => {
      expect(getByText('Selected role: Care Recipient')).toBeTruthy();
    });
  });
});
