// There's no mDNS under Jest, so the discovery client is inert: it accepts the
// same calls and never emits a peer.
class Zeroconf {
  on() {}
  scan() {}
  publishService() {}
  unpublishService() {}
  stop() {}
  removeDeviceListeners() {}
}

module.exports = { __esModule: true, default: Zeroconf };
