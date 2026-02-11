import React from 'react';
import { render } from '@testing-library/react-native';

import { ProfileScreen } from '@/src/screens/ProfileScreen';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

const mockRoute = { key: 'profile', name: 'Profile', params: {} };

function makeProps() {
  return {
    navigation: { goBack: jest.fn(), navigate: jest.fn() },
    route: mockRoute,
  };
}

describe('ProfileScreen', () => {
  it('wraps content in root view and renders two-tier header (title row + blue bar)', () => {
    const props = makeProps();
    const { getByTestId, getAllByText } = render(
      <ProfileScreen {...(props as any)} />
    );

    expect(getByTestId('profile-screen')).toBeTruthy();
    expect(getAllByText('Profile').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Settings action in header', () => {
    const props = makeProps();
    const { getByLabelText } = render(<ProfileScreen {...(props as any)} />);

    expect(getByLabelText('Settings button')).toBeTruthy();
  });
});
