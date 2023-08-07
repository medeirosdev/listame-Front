import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IThemeShadows } from '~/app/theme/shadows';

interface IShadowProps {
  dp: keyof IThemeShadows;
  style?: ViewStyle;
}

export const Shadow = (props: PropsWithChildren<IShadowProps>) => {
  const { dp = 'dp01', children, style = {} } = props;
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        ...theme.shadows[dp],
        elevation: theme.elevations[dp],
        borderRadius: theme.radii.xs,
        backgroundColor: theme.colors.neutral.white,
      },
    });
  }, [dp]);

  return <View style={[styles.container, style]}>{children}</View>;
};
