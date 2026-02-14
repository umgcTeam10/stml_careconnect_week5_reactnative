import { fireEvent, render, waitFor } from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@/src/utils/accessibilityFocus', () => ({
  useScreenFocusEffect: () => {},
}));
import { RoleScreen } from '@/src/screens/RoleScreen';

const createNavigation = () => ({
  navigate: jest.fn(),
});

const getDisabledState = (element: { props: { disabled?: boolean; accessibilityState?: any } }) =>
  element.props.disabled ?? element.props.accessibilityState?.disabled;

describe('RoleScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('disables continue until role selected', async () => {
    const navigation = createNavigation();
    const { getByTestId } = render(
      <RoleScreen navigation={navigation as any} route={{ key: 'Role', name: 'Role' }} />
    );

    const continueButton = getByTestId('role-continue');
    expect(getDisabledState(continueButton)).toBe(true);

    fireEvent.press(getByTestId('role-care-recipient'));

    await waitFor(() => {
      expect(getDisabledState(continueButton)).toBe(false);
    });
  });

  it('persists selected role and shows helper text', async () => {
    const navigation = createNavigation();
    const { getByTestId, getByText } = render(
      <RoleScreen navigation={navigation as any} route={{ key: 'Role', name: 'Role' }} />
    );

    fireEvent.press(getByTestId('role-caregiver'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('careconnect.role', 'caregiver');
    });

    expect(getByText('Next: sign in to save your role and continue.')).toBeTruthy();
  });

  it('toggles between caregiver and care recipient selections', async () => {
    const navigation = createNavigation();
    const { getByTestId, getAllByText, queryAllByText } = render(
      <RoleScreen navigation={navigation as any} route={{ key: 'Role', name: 'Role' }} />
    );

    expect(queryAllByText('Selected')).toHaveLength(0);

    fireEvent.press(getByTestId('role-caregiver'));
    await waitFor(() => {
      expect(getAllByText('Selected')).toHaveLength(1);
    });

    fireEvent.press(getByTestId('role-care-recipient'));
    await waitFor(() => {
      expect(getAllByText('Selected')).toHaveLength(1);
    });
  });

  it('navigates to login on continue', async () => {
    const navigation = createNavigation();
    const { getByTestId } = render(
      <RoleScreen navigation={navigation as any} route={{ key: 'Role', name: 'Role' }} />
    );

    fireEvent.press(getByTestId('role-care-recipient'));
    await waitFor(() => {
      expect(getDisabledState(getByTestId('role-continue'))).toBe(false);
    });

    fireEvent.press(getByTestId('role-continue'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('loads stored role on mount', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('caregiver');
    const navigation = createNavigation();
    const { getByTestId, getAllByText } = render(
      <RoleScreen navigation={navigation as any} route={{ key: 'Role', name: 'Role' }} />
    );

    await waitFor(() => {
      expect(getByTestId('role-continue')).not.toBeDisabled();
      expect(getAllByText('Selected')).toHaveLength(1);
    });
  });
});
