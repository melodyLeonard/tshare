import Svg, { Circle, Path } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// Scanning for nearby peers — a dot with expanding signal arcs.
export function Radar({ size = 22, color: c = color.link }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="1.8" fill={c} />
      <Path
        d="M15.5 12a3.5 3.5 0 0 0-3.5-3.5"
        stroke={c}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path d="M19 12a7 7 0 0 0-7-7" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
