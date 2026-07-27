import Svg, { Path } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// Send — an upward arrow.
export function ArrowUp({ size = 22, color: c = color.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19V5M6 11l6-6 6 6"
        stroke={c}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
