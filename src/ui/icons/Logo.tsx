import Svg, { Circle, Path } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// The mark: two nodes joined by a beam — one device sending to another.
export function Logo({ size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 12h10" stroke={color.link} strokeWidth={2} strokeLinecap="round" />
      <Circle cx="5" cy="12" r="3" fill={color.send} />
      <Circle cx="19" cy="12" r="3" stroke={color.link} strokeWidth={2} />
    </Svg>
  );
}
