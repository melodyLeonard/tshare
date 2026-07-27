import Svg, { Path } from 'react-native-svg';
import { color } from '../../constants/theme';
import type { IconProps } from './types';

// Dismiss a sheet or cancel a transfer.
export function Close({ size = 22, color: c = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
