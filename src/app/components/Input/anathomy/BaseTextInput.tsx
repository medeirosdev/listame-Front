import { ComponentPropsWithRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { StyledProps } from 'styled-components';
import styled from 'styled-components/native';
import { InputVariants } from '~/app/components/Input/types';

interface IBaseTextInputProps extends ComponentPropsWithRef<typeof TextInput> {
  hasIcon?: boolean;
  variant: InputVariants;
}

type StyledAttrs = StyledProps<IBaseTextInputProps>;

export const BaseTextInput = styled.TextInput.attrs((props: StyledAttrs) => {
  const {
    theme: { colors },
    variant,
  } = props;
  return {
    placeholderTextColor:
      variant === 'fullWhite' ? colors.neutral.white : colors.gray['600'],
  } as TextInputProps;
})<IBaseTextInputProps>`
  width: ${(props) => (props.hasIcon ? '90%' : '100%')};
  border-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
  font-size: ${({ theme: { fontSizes } }) => `${fontSizes.caption}px`};
  color: ${({ theme: { colors } }) => colors.gray['600']};
  height: 100%;
  margin-bottom: -12px;
  padding: 0px 16px;
  justify-self: flex-start;

  ${({ theme: { colors }, variant }) => {
    if (variant === 'fullWhite') return { color: colors.neutral.white };
  }};
`;
