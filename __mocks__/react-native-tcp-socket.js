// No sockets under Jest: servers and connections are inert stubs.
const socket = { on() {}, write() {}, destroy() {} };

module.exports = {
  __esModule: true,
  default: {
    createServer: () => ({ listen: () => ({ close() {} }) }),
    createConnection: () => socket,
  },
};
