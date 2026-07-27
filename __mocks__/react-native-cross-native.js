// There's no native runtime under Jest, so loading a module resolves to a stub
// whose calls return empty. Screens and hooks can then be rendered and driven
// without the device bridge.
module.exports = {
  createNativeModule: async () => ({
    call: async () => '',
    dispose: () => {},
  }),
};
