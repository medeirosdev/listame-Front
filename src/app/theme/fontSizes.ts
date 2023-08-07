import { RFValue } from 'react-native-responsive-fontsize';

export interface IThemeFontSizes {
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

export type ThemeFontSizesKeys = keyof IThemeFontSizes;

export const fontSizes: IThemeFontSizes = {
  button: RFValue(16),
  caption: RFValue(12),
  body: RFValue(16),
  bodySmall: RFValue(14),
  bodyLarge: RFValue(18),
  subtitle: RFValue(16),
  h1: RFValue(56),
  h2: RFValue(48),
  h3: RFValue(40),
  h4: RFValue(32),
  h5: RFValue(24),
  h6: RFValue(20),
};
