import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ThemeTypographyGroups } from '~/app/theme/typography';

export interface TypographyProps extends TextProps {
  color?: string;
  fontGroup?: ThemeTypographyGroups;
}

export type StylesByGroup = {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
};

export const Typography: FC<TypographyProps> = ({
  color,
  style,
  fontGroup = 'captionRegular',
  ...rest
}) => {
  const theme = useTheme();

  const flattenedStyles = StyleSheet.flatten(style);

  const styles = useMemo(() => {
    const stylesByGroup = new Map<ThemeTypographyGroups, StylesByGroup>();
    stylesByGroup.set('h1Regular', {
      fontSize: theme.fontSizes.h1,
      fontFamily: theme.typography.regular,
      lineHeight: theme.lineHeights.h1,
    });

    stylesByGroup.set('h1Bold', {
      fontSize: theme.fontSizes.h1,
      fontFamily: theme.typography.bold,
      lineHeight: theme.lineHeights.h1,
    });

    stylesByGroup.set('h2Bold', {
      fontSize: theme.fontSizes.h2,
      fontFamily: theme.typography.bold,
      lineHeight: theme.lineHeights.h2,
    });

    stylesByGroup.set('h3Bold', {
      fontSize: theme.fontSizes.h3,
      fontFamily: theme.typography.bold,
      lineHeight: theme.lineHeights.h3,
    });

    stylesByGroup.set('h4Medium', {
      fontSize: theme.fontSizes.h4,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.h4,
    });

    stylesByGroup.set('h5Medium', {
      fontSize: theme.fontSizes.h5,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.h5,
    });

    stylesByGroup.set('h6Medium', {
      fontSize: theme.fontSizes.h6,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.h6,
    });

    stylesByGroup.set('h6Bold', {
      fontSize: theme.fontSizes.h6,
      fontFamily: theme.typography.bold,
      lineHeight: theme.lineHeights.h6,
    });

    stylesByGroup.set('subtitleSemiBold', {
      fontSize: theme.fontSizes.subtitle,
      fontFamily: theme.typography.semibold,
      lineHeight: theme.lineHeights.subtitle,
    });

    stylesByGroup.set('bodySmallRegular', {
      fontSize: theme.fontSizes.bodySmall,
      fontFamily: theme.typography.regular,
      lineHeight: theme.lineHeights.bodySmall,
    });

    stylesByGroup.set('bodySmallMedium', {
      fontSize: theme.fontSizes.bodySmall,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.bodySmall,
    });

    stylesByGroup.set('bodyRegular', {
      fontSize: theme.fontSizes.body,
      fontFamily: theme.typography.regular,
      lineHeight: theme.lineHeights.body,
    });

    stylesByGroup.set('bodyMedium', {
      fontSize: theme.fontSizes.body,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.body,
    });
    stylesByGroup.set('bodyLargeRegular', {
      fontSize: theme.fontSizes.bodyLarge,
      fontFamily: theme.typography.regular,
      lineHeight: theme.lineHeights.bodyLarge,
    });
    stylesByGroup.set('bodyLargeMedium', {
      fontSize: theme.fontSizes.bodyLarge,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.bodyLarge,
    });

    stylesByGroup.set('captionRegular', {
      fontSize: theme.fontSizes.caption,
      fontFamily: theme.typography.regular,
      lineHeight: theme.lineHeights.caption,
    });

    stylesByGroup.set('captionMedium', {
      fontSize: theme.fontSizes.caption,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.caption,
    });

    stylesByGroup.set('captionBold', {
      fontSize: theme.fontSizes.caption,
      fontFamily: theme.typography.bold,
      lineHeight: theme.lineHeights.caption,
    });

    stylesByGroup.set('buttonMedium', {
      fontSize: theme.fontSizes.button,
      fontFamily: theme.typography.medium,
      lineHeight: theme.lineHeights.button,
    });

    return stylesByGroup.get(fontGroup);
  }, [fontGroup]);

  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: styles?.fontFamily,
          fontSize: styles?.fontSize,
          lineHeight: styles?.lineHeight,
          color: color ?? theme.colors.gray[700],
        },
        flattenedStyles,
      ]}
    />
  );
};
