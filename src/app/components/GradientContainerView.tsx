import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StyledProps } from 'styled-components';
import styled from 'styled-components/native';

export const GradientContainerView = styled(LinearGradient).attrs(
  ({
    theme,
    color,
    ...styles
  }: StyledProps<ViewStyle> & { color?: string }) => ({
    colors: color ?? theme.colors.gradient.blue.stops,
    useAngle: true,
    angle: theme.colors.gradient.blue.angle || 0,
    ...styles,
  }),
)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
