import { renderUI } from '@testing/render';
import { ChunkGrid } from '../ChunkGrid';

describe('ChunkGrid', () => {
  it('draws one cell per chunk and fills the verified ones', () => {
    const ui = renderUI(<ChunkGrid total={10} verified={4} />);

    expect(ui.countByTestId('chunk-verified')).toBe(4);
    expect(ui.countByTestId('chunk-pending')).toBe(6);
  });
});
