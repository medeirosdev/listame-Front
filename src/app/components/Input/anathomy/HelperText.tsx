import styled from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { InputVariants } from '../types';

interface HelperTextProps {
  variant: InputVariants;
  hasError?: boolean;
}

export const HelperText = styled(Typography).attrs({
  fontGroup: 'captionMedium',
})<HelperTextProps>`
  color: ${({ theme: { colors }, variant, hasError }) => {
    if (hasError) return colors.error;
    if (variant === 'fullWhite') return colors.neutral.white;
    return colors.gray['600'];
  }};
  font-size: ${({ theme: { fontSizes } }) => `${fontSizes.caption}px`};
  margin-top: 4px;
  margin-left: 16px;
`;
