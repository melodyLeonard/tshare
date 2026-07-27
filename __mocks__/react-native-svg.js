// The SVG primitives have no test-renderer backend, so under Jest we swap them
// for pass-through components. Icons then render as no-ops and screens can be
// tested for their text and behaviour without a native canvas.
const React = require('react');

const passthrough = ({children}) =>
  React.createElement(React.Fragment, null, children ?? null);

module.exports = new Proxy(
  {__esModule: true},
  {get: (target, key) => (key in target ? target[key] : passthrough)},
);
