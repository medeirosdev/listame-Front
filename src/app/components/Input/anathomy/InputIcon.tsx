import { StyledProps } from 'styled-components';
import styled from 'styled-components/native';
import { Icon, IconProps } from '~/app/components/Icon';
import { InputVariants } from '~/app/components/Input/types';

interface IInputIconProps extends IconProps {
  hasError?: boolean;
  variant?: InputVariants;
}

type StyledAttrs = StyledProps<IInputIconProps>;

export const InputIcon = styled(Icon).attrs((props: StyledAttrs) => {
  const { hasError, variant, theme } = props;
  if (hasError) return { color: theme.colors.error };
  if (variant === 'fullWhite') return { color: theme.colors.neutral.white };
  return { color: theme.colors.gray['600'] };
})<IInputIconProps>``;
