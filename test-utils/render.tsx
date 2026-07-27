import type { ReactElement } from 'react';
import TestRenderer, { type ReactTestRenderer } from 'react-test-renderer';

// A minimal render harness over react-test-renderer: enough to assert on visible
// text and fire presses, without depending on a heavier testing library.
type Node = { props: Record<string, unknown> };

const hasText = (node: Node, text: string) => {
  const c = node.props.children;
  return c === text || (Array.isArray(c) && c.includes(text));
};

export function renderUI(element: ReactElement) {
  let renderer!: ReactTestRenderer;
  TestRenderer.act(() => {
    renderer = TestRenderer.create(element);
  });
  return {
    getByText(text: string) {
      const [node] = renderer.root.findAll((n) => hasText(n, text));
      if (!node) throw new Error(`No visible text: ${text}`);
      return node;
    },
    queryByText(text: string) {
      return renderer.root.findAll((n) => hasText(n, text))[0] ?? null;
    },
    press(node: { props: Record<string, unknown>; parent: unknown }) {
      // The tapped text usually sits inside a Pressable, so climb to the nearest
      // ancestor that actually handles a press.
      let n = node as { props: Record<string, unknown>; parent: unknown } | null;
      while (n && typeof n.props.onPress !== 'function') {
        n = n.parent as typeof n;
      }
      if (!n) throw new Error('No pressable ancestor');
      const handler = n.props.onPress as () => void;
      TestRenderer.act(() => handler());
    },
  };
}
