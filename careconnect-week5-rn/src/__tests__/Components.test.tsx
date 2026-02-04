import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { PrimaryButton } from '@/src/components/PrimaryButton';
import { TextField } from '@/src/components/TextField';
import { colors } from '@/src/utils/theme';

describe('PrimaryButton', () => {
  it('fires onPress when enabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<PrimaryButton title="Submit" onPress={onPress} />);

    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<PrimaryButton title="Submit" onPress={onPress} disabled />);

    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies disabled styles when disabled', () => {
    const { getByRole } = render(<PrimaryButton title="Submit" onPress={() => {}} disabled />);
    const button = getByRole('button');
    const flattenedStyle = StyleSheet.flatten(button.props.style);
    expect(flattenedStyle.backgroundColor).toBe(colors.primaryDisabled);
  });
});

describe('TextField', () => {
  it('renders label and calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <TextField
        label="Email Address"
        value=""
        onChangeText={onChangeText}
        placeholder="you@example.com"
      />
    );

    expect(getByText('Email Address')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'user@example.com');
    expect(onChangeText).toHaveBeenCalledWith('user@example.com');
  });
});
