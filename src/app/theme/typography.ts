export interface IThemeTypography {
  regular: string;
  bold: string;
  medium: string;
  semibold: string;
}

export type ThemeTypographyKeys = keyof IThemeTypography;

export const typography: IThemeTypography = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  medium: 'Roboto-Medium',
  semibold: 'Roboto-Medium',
};

export type ThemeTypographyHeadline =
  | 'h1Regular'
  | 'h1Bold'
  | 'h2Bold'
  | 'h3Bold'
  | 'h4Medium'
  | 'h5Medium'
  | 'h6Medium'
  | 'h6Bold';

export type ThemeTypographySubtitle = 'subtitleSemiBold';

export type ThemeTypographyBody =
  | 'bodySmallRegular'
  | 'bodySmallMedium'
  | 'bodyRegular'
  | 'bodyMedium'
  | 'bodyLargeRegular'
  | 'bodyLargeMedium';

export type ThemeTypographyCaption =
  | 'captionRegular'
  | 'captionMedium'
  | 'captionBold';
export type ThemeTypographyButton = 'buttonMedium';

export type ThemeTypographyGroups =
  | ThemeTypographyHeadline
  | ThemeTypographySubtitle
  | ThemeTypographyBody
  | ThemeTypographyCaption
  | ThemeTypographyButton;
