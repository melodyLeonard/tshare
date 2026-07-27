// A short, readable code derived from a file's content root. A peer enters or
// scans it to pull the file; the full root travels with the connection. Grouped
// in fours so it's easy to read aloud or type.
export function shareCode(root: string): string {
  return root
    .slice(0, 12)
    .toUpperCase()
    .replace(/(.{4})(?=.)/g, '$1-');
}
