// Every fixed value the app relies on lives here, so behaviour that has to
// match across peers (chunk size, service name, protocol) has one source.

export const APP_NAME = 'tshare';

// Deep links and share codes use this scheme: tshare://<root>
export const LINK_SCHEME = 'tshare';

// A file is split into fixed-size chunks. Each chunk is hashed and addressed by
// that hash, so the same file produces the same manifest on any device.
export const CHUNK_SIZE = 1024 * 1024; // 1 MiB

// Local discovery advertises this service; peers resolve it as _tshare._tcp.
export const SERVICE_TYPE = 'tshare';

// The direct transfer socket. A range lets several transfers coexist.
export const BASE_PORT = 47810;

// Bumped when the wire format changes, so peers can refuse a mismatch early.
export const PROTOCOL_VERSION = 1;
