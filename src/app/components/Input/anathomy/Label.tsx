import styled from 'styled-components/native';
import { InputVariants } from '~/app/components/Input/types';
import { Typography } from '~/app/components/Typography';

interface LabelProps {
  variant: InputVariants;
  isFocused?: boolean;
  hasError?: boolean;
}

export const Label = styled(Typography).attrs({
  fontGroup: 'captionMedium',
})<LabelProps>`
  position: absolute;
  margin: 6px 16px;
  top: 0px;
  color: ${({ theme: { colors }, variant, hasError }) => {
    if (hasError) return colors.error;
    return variant === 'fullWhite' ? colors.neutral.white : colors.brand;
  }};
  font-size: ${({ theme: { fontSizes } }) => `${fontSizes.caption}px`};
  font-weight: ${({ isFocused }) => (isFocused ? 'bold' : 'normal')};
`;
