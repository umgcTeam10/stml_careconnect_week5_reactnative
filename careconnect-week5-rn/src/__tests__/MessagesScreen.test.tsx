import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { MessagesScreen } from '@/src/screens/MessagesScreen';

const makeProps = () => ({
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  route: { key: 'messages', name: 'Messages', params: {} },
});

describe('MessagesScreen', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders primary messaging content', () => {
    const { getByPlaceholderText, getByText } = render(
      <MessagesScreen {...(makeProps() as any)} />
    );

    expect(getByText('Messages')).toBeTruthy();
    expect(getByText('Emergency SOS')).toBeTruthy();
    expect(getByText('Quick Contact')).toBeTruthy();
    expect(getByPlaceholderText('Type your message...')).toBeTruthy();
    expect(getByText('Yes')).toBeTruthy();
    expect(getByText('On my way')).toBeTruthy();
    expect(getByText('Call me')).toBeTruthy();
    expect(getByText('Recent Messages')).toBeTruthy();
    expect(getByText('CareConnect')).toBeTruthy();
    expect(getByText('Now: Physical Therapy Appointment')).toBeTruthy();
  });

  it('navigates back when pressing Back', () => {
    const props = makeProps();
    const { getByLabelText } = render(
      <MessagesScreen {...(props as any)} />
    );

    fireEvent.press(getByLabelText('Back'));
    expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('shows not implemented alert for interactive actions', () => {
    const { getByLabelText, getByTestId } = render(
      <MessagesScreen {...(makeProps() as any)} />
    );

    fireEvent.press(getByLabelText('Emergency SOS'));
    fireEvent.press(getByLabelText('Sarah Primary Care'));
    fireEvent(getByTestId('messages-compose'), 'focus');
    fireEvent.press(getByLabelText('Send message'));
    fireEvent.press(getByLabelText('View current event'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Not implemented',
      'Not implemented in Week 4'
    );
    expect(Alert.alert).toHaveBeenCalledTimes(5);
  });
});
