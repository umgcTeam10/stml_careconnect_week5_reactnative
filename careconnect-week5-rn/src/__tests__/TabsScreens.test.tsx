import { render } from '@testing-library/react-native';

import { CalendarScreen } from '@/src/screens/CalendarScreen';
import { MessagesScreen } from '@/src/screens/MessagesScreen';
import { ProfileScreen } from '@/src/screens/ProfileScreen';
import { TasksScreen } from '@/src/screens/TasksScreen';

describe('Tab placeholder screens', () => {
  it('renders tasks placeholder', () => {
    const { getByText } = render(<TasksScreen />);
    expect(getByText('Tasks (placeholder)')).toBeTruthy();
    expect(getByText('Your care tasks will appear here.')).toBeTruthy();
  });

  it('renders calendar placeholder', () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText('Calendar (placeholder)')).toBeTruthy();
    expect(getByText('Upcoming appointments will show here.')).toBeTruthy();
  });

  it('renders messages placeholder', () => {
    const { getByText } = render(<MessagesScreen />);
    expect(getByText('Messages (placeholder)')).toBeTruthy();
    expect(getByText('Secure messaging will appear here.')).toBeTruthy();
  });

  it('renders profile screen settings', () => {
  const { getByTestId } = render(<ProfileScreen {...({ navigation: {}, route: {} } as any)} />);

  expect(getByTestId('toggle-push')).toBeTruthy();
  expect(getByTestId('toggle-email')).toBeTruthy();
  expect(getByTestId('toggle-reminders')).toBeTruthy();
  expect(getByTestId('toggle-dark-mode')).toBeTruthy();

  expect(getByTestId('settings-text-size')).toBeTruthy();
  expect(getByTestId('settings-contrast')).toBeTruthy();
  expect(getByTestId('settings-privacy')).toBeTruthy();
  expect(getByTestId('settings-help')).toBeTruthy();

  expect(getByTestId('profile-signout')).toBeTruthy();
});
});
