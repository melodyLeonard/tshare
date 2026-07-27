import { renderUI } from '@testing/render';
import { SendScreen } from '.';

const base = {
  progress: 0,
  chunks: { total: 0, done: 0 },
  onPick: jest.fn(),
  onClose: jest.fn(),
};

describe('SendScreen', () => {
  it('invites the user to choose a file when idle', () => {
    const ui = renderUI(<SendScreen phase="idle" {...base} />);
    expect(ui.getByText('Choose a file')).toBeTruthy();
  });

  it('reports Rust hashing progress while preparing', () => {
    const ui = renderUI(
      <SendScreen
        phase="hashing"
        {...base}
        progress={0.5}
        chunks={{ total: 6, done: 3 }}
      />,
    );
    expect(ui.getByText('Hashing chunks · Rust · 3/6')).toBeTruthy();
    expect(ui.countByTestId('chunk-verified')).toBe(3);
  });

  it('shows the share code once ready', () => {
    const ui = renderUI(<SendScreen phase="ready" {...base} code="D749-81EF-A70A" />);
    expect(ui.getByText('D749-81EF-A70A')).toBeTruthy();
  });
});
