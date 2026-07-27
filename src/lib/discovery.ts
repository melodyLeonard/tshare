import type { Peer } from '../types';

// The shape react-native-zeroconf hands back for a resolved service.
export interface ResolvedService {
  name: string;
  port?: number;
  host?: string;
  addresses?: string[];
  txt?: Record<string, string>;
}

// Turn a resolved mDNS service into a peer we can connect to. Prefers an IPv4
// address (they carry dots; IPv6 carries colons) and takes a friendly name from
// the TXT record when the advertiser provided one.
export function toPeer(service: ResolvedService): Peer | null {
  if (!service.port) {
    return null;
  }
  const host = (service.addresses ?? []).find((a) => a.includes('.')) ?? service.host;
  if (!host) {
    return null;
  }
  return {
    id: service.name,
    name: service.txt?.name ?? service.name,
    host,
    port: service.port,
  };
}
