// No filesystem under Jest: paths resolve to a temp dir and writes are no-ops.
module.exports = {
  __esModule: true,
  default: {
    DocumentDirectoryPath: '/tmp',
    writeFile: async () => {},
    appendFile: async () => {},
  },
};
