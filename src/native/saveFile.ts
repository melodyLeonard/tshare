import RNFS from '@dr.pogodin/react-native-fs';
import { orderedChunks } from '../lib/assemble';

// Write the received chunks to a file in the app's documents directory, one
// chunk appended after another (each base64 slice decodes to its bytes), and
// return where it landed.
export async function saveFile(
  name: string,
  chunks: Map<number, string>,
): Promise<string> {
  const ordered = orderedChunks(chunks, chunks.size);
  const path = `${RNFS.DocumentDirectoryPath}/${name}`;
  await RNFS.writeFile(path, ordered[0], 'base64');
  for (let i = 1; i < ordered.length; i++) {
    await RNFS.appendFile(path, ordered[i], 'base64');
  }
  return path;
}
