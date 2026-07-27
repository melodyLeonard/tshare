import Svg, { Path } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// A generic file (any type — the app doesn't care what's inside).
export function FileIcon({ size = 22, color: c = color.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
        stroke={c}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M14 3v5h5" stroke={c} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}
