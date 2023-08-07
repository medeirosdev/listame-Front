import { RFValue } from 'react-native-responsive-fontsize';

export interface IThemeLineHeights {
  button: number;
  caption: number;
  body: number;
  bodySmall: number;
  bodyLarge: number;
  subtitle: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
}

export type ThemeLineHeightsKeys = keyof IThemeLineHeights;

export const lineHeights: IThemeLineHeights = {
  button: RFValue(24),
  caption: RFValue(18),
  body: RFValue(24),
  bodySmall: RFValue(21),
  bodyLarge: RFValue(28),
  subtitle: RFValue(24),
  h1: RFValue(84),
  h2: RFValue(72),
  h3: RFValue(60),
  h4: RFValue(48),
  h5: RFValue(36),
  h6: RFValue(30),
};
