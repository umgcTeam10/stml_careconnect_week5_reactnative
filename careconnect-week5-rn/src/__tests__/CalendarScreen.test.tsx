import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { CalendarScreen } from '@/src/screens/CalendarScreen';

const makeNavigation = () => ({
  goBack: jest.fn(),
  navigate: jest.fn(),
});

describe('CalendarScreen', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders header and schedule content', () => {
    const { getByText } = render(
      <CalendarScreen navigation={makeNavigation() as any} />
    );

    expect(getByText('Calendar')).toBeTruthy();
    expect(getByText('January 2026')).toBeTruthy();
    expect(getByText("Today's Schedule")).toBeTruthy();
    expect(getByText('Morning Medication')).toBeTruthy();
    expect(getByText('Evening Walk')).toBeTruthy();
  });

  it('goes back when pressing Back', () => {
    const navigation = makeNavigation();
    const { getByLabelText } = render(
      <CalendarScreen navigation={navigation as any} />
    );

    fireEvent.press(getByLabelText('Back'));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('moves between months using month controls', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <CalendarScreen navigation={makeNavigation() as any} />
    );

    fireEvent.press(getByLabelText('Next month'));
    expect(getByText('February 2026')).toBeTruthy();
    expect(queryByText('January 2026')).toBeNull();

    fireEvent.press(getByLabelText('Previous month'));
    expect(getByText('January 2026')).toBeTruthy();
  });

  it('syncs month label when calendar month changes', () => {
    const { getByLabelText, getByText } = render(
      <CalendarScreen navigation={makeNavigation() as any} />
    );

    fireEvent.press(getByLabelText('Swipe to Feb 2026'));
    expect(getByText('February 2026')).toBeTruthy();
  });

  it('accepts day selection from calendar interaction', () => {
    const { getByLabelText, getByText } = render(
      <CalendarScreen navigation={makeNavigation() as any} />
    );

    fireEvent.press(getByLabelText('Select Tue Jan 27 2026'));
    expect(getByText('Calendar')).toBeTruthy();
    expect(getByText('Morning Medication')).toBeTruthy();
  });
});
