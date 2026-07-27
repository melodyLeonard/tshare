import Svg, { Path } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// Verified — a checkmark, used when a transfer's integrity is confirmed.
export function Check({ size = 20, color: c = color.link }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 13l4 4L19 7"
        stroke={c}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
