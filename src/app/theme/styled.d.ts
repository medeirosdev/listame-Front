import 'styled-components';
import { IThemeLineHeights } from '~/app/theme/lineHeights';

import { IThemeColors } from './colors';
import { IThemeElevations } from './elevations';
import { IThemeFontSizes } from './fontSizes';
import { IThemeRadii } from './radii';
import { IThemeShadows } from './shadows';
import { IThemeTypography } from './typography';

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: IThemeTypography;
    fontSizes: IThemeFontSizes;
    colors: IThemeColors;
    elevations: IThemeElevations;
    shadows: IThemeShadows;
    radii: IThemeRadii;
    lineHeights: IThemeLineHeights;
  }
}
