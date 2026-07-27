import { renderUI } from '@testing/render';
import { NearbyScreen } from '.';

const handlers = { onSend: jest.fn(), onReceive: jest.fn(), onPeer: jest.fn() };

describe('NearbyScreen', () => {
  it('offers Send and Receive, and scans when no peers are found', () => {
    const ui = renderUI(<NearbyScreen peers={[]} {...handlers} />);

    expect(ui.getByText('Send')).toBeTruthy();
    expect(ui.getByText('Receive')).toBeTruthy();
    expect(ui.getByText('Looking for devices')).toBeTruthy();
  });

  it('lists discovered peers instead of the empty state', () => {
    const ui = renderUI(
      <NearbyScreen
        peers={[{ id: '1', name: 'Studio MacBook', host: '10.0.0.2', port: 47810 }]}
        {...handlers}
      />,
    );

    expect(ui.getByText('Studio MacBook')).toBeTruthy();
    expect(ui.queryByText('Looking for devices')).toBeNull();
  });
});
