import Svg, { Path, Rect } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// A laptop-shaped peer.
export function Laptop({ size = 22, color: c = color.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="5" width="16" height="11" rx="1.5" stroke={c} strokeWidth={2} />
      <Path d="M2 20h20" stroke={c} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
