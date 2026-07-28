import { useEffect, useState } from 'react';
import Zeroconf from 'react-native-zeroconf';
import { SERVICE_TYPE } from '../constants';
import { type ResolvedService, toPeer } from '../lib/discovery';
import type { Peer } from '../types';

// Advertise this device over mDNS and browse for other tshare peers on the
// local network. Own service is filtered out by name. Returns the live list.
export function useDiscovery(name: string, port: number): Peer[] {
  const [peers, setPeers] = useState<Record<string, Peer>>({});

  useEffect(() => {
    const zc = new Zeroconf();
    zc.on('resolved', (service: ResolvedService) => {
      const peer = toPeer(service);
      if (peer && peer.id !== name) {
        setPeers((current) => ({ ...current, [peer.id]: peer }));
      }
    });
    zc.on('removed', (gone: string) => setPeers(({ [gone]: _dropped, ...rest }) => rest));

    zc.publishService(SERVICE_TYPE, 'tcp', 'local.', name, port);
    zc.scan(SERVICE_TYPE, 'tcp', 'local.');

    return () => {
      zc.unpublishService(name);
      zc.stop();
      zc.removeDeviceListeners();
    };
  }, [name, port]);

  return Object.values(peers);
}
