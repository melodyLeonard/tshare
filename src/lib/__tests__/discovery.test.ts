import { toPeer } from '../discovery';

describe('toPeer', () => {
  it('maps a resolved service to a peer, preferring the IPv4 address', () => {
    expect(
      toPeer({
        name: 'Mel-iPhone',
        port: 47810,
        addresses: ['fe80::1', '192.168.1.5'],
        txt: { name: "Mel's iPhone" },
      }),
    ).toEqual({
      id: 'Mel-iPhone',
      name: "Mel's iPhone",
      host: '192.168.1.5',
      port: 47810,
    });
  });

  it('falls back to the service name when there is no TXT name', () => {
    expect(toPeer({ name: 'Studio', port: 47810, addresses: ['10.0.0.2'] })).toEqual({
      id: 'Studio',
      name: 'Studio',
      host: '10.0.0.2',
      port: 47810,
    });
  });

  it('returns null without a usable address or port', () => {
    expect(toPeer({ name: 'x', addresses: [] })).toBeNull();
    expect(toPeer({ name: 'y', port: 47810, addresses: [] })).toBeNull();
  });
});
