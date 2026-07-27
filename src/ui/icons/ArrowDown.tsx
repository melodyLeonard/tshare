import Svg, { Path } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// Receive — a downward arrow.
export function ArrowDown({ size = 22, color: c = color.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M6 13l6 6 6-6"
        stroke={c}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
