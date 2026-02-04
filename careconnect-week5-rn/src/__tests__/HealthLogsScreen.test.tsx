import { render } from '@testing-library/react-native';

import { HealthLogsScreen } from '@/src/screens/HealthLogsScreen';

describe('HealthLogsScreen', () => {
  it('renders placeholder content', () => {
    const { getByText } = render(<HealthLogsScreen />);

    expect(getByText('Health Logs (placeholder)')).toBeTruthy();
    expect(getByText('This is a light-theme placeholder for future logs.')).toBeTruthy();
  });
});
