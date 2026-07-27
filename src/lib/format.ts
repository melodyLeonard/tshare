const UNITS = ['KB', 'MB', 'GB', 'TB'];

// Human-readable byte size, e.g. 1_200_000 -> "1.1 MB". One decimal below 10,
// none above, so sizes stay compact in the UI.
export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${UNITS[unit]}`;
}
