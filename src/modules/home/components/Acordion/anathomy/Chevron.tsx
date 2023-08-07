import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { Icon } from '~/app/components/Icon';

interface ChevronProps {
  progress: Animated.SharedValue<number>;
}

export const Chevron = ({ progress }: ChevronProps) => {
  const theme = useTheme();
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${progress.value * Math.PI}rad` }],
  }));
  return (
    <Animated.View style={style}>
      <Icon name="expand_more" color={theme.colors.neutral.white} size={24} />
    </Animated.View>
  );
};
