import { DefaultTheme } from 'styled-components/native';

import { colors } from './colors';
import { elevations } from './elevations';
import { fontSizes } from './fontSizes';
import { radii } from './radii';
import { shadows } from './shadows';
import { typography } from './typography';
import { lineHeights } from './lineHeights';

export const theme: DefaultTheme = {
  fontSizes,
  radii,
  typography,
  colors,
  elevations,
  shadows: shadows,
  lineHeights,
};
