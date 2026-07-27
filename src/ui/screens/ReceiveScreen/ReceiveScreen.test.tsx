import { renderUI } from '@testing/render';
import { ReceiveScreen } from '.';

const base = {
  code: '',
  onChangeCode: jest.fn(),
  onConnect: jest.fn(),
  onClose: jest.fn(),
};

describe('ReceiveScreen', () => {
  it('prompts for a code and offers Connect', () => {
    const ui = renderUI(<ReceiveScreen {...base} connecting={false} />);
    expect(ui.getByText('Enter a share code')).toBeTruthy();
    expect(ui.getByText('Connect')).toBeTruthy();
  });

  it('shows a waiting hint while connecting', () => {
    const ui = renderUI(<ReceiveScreen {...base} connecting={true} />);
    expect(ui.getByText('Connecting…')).toBeTruthy();
    expect(ui.getByText('Looking for a seeder with this file…')).toBeTruthy();
  });
});
