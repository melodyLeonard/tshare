import Svg, { Circle, Rect } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// A phone-shaped peer.
export function Phone({ size = 22, color: c = color.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="6" y="3" width="12" height="18" rx="3" stroke={c} strokeWidth={2} />
      <Circle cx="12" cy="17.5" r="1" fill={c} />
    </Svg>
  );
}
