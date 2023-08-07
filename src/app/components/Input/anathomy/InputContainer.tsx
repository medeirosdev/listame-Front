import { View } from 'react-native';
import styled from 'styled-components/native';
import { InputVariants } from '../types';

interface IInputContainerProps {
  variant: InputVariants;
  isFocused?: boolean;
  isTextarea?: boolean;
  hasError?: boolean;
}

export const InputContainer = styled(View)<IInputContainerProps>`
  width: 100%;
  height: 60px;
  pointer-events: none;
  overflow: hidden;
  position: relative;
  flex-direction: column-reverse;
  border-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme: { colors } }) => colors.brand};

  ${({
    theme: { colors, radii },
    variant,
    isFocused,
    isTextarea,
    hasError,
  }) => {
    if (hasError) return { borderColor: colors.error };
    if (variant === 'fullWhite')
      return {
        borderColor: isFocused ? colors.neutral.white : colors.gray[300],
      };
    if (variant === 'rounded') {
      return {
        borderRadius: radii.full,
        backgroundColor: colors.neutral.white,
      };
    }

    if (isTextarea) {
      return {
        height: '100px',
      };
    }
  }};
`;
