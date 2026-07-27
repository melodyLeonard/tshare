import { renderUI } from '@testing/render';
import { Text } from 'react-native';
import { ActionButton } from '../ActionButton';

describe('ActionButton', () => {
  it('shows its label and fires onPress when tapped', () => {
    const onPress = jest.fn();
    const ui = renderUI(
      <ActionButton label="Send" icon={<Text>i</Text>} onPress={onPress} />,
    );

    ui.press(ui.getByText('Send'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
