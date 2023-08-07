import { ComponentPropsWithRef, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { IconOrientations } from './icon-orientations.type';
import { ThemeFontSizesKeys } from '~/app/theme/fontSizes';
import { ThemeTypographyKeys } from '~/app/theme/typography';
import { ButtonVariants } from '.';
import { IButtonContainerProps } from '~/app/components/Button/anathomy';

interface ButtonWrapperProps {
  variant?: ButtonVariants;
  size?: ThemeFontSizesKeys;
  family?: ThemeTypographyKeys;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  icon?: string | ReactElement;
  iconSize?: number;
  labelColor?: string;
  fullWidth?: boolean;
  iconOrientation?: IconOrientations;
  loadingText?: string;
}

export type ButtonProps = ComponentPropsWithRef<typeof TouchableOpacity> &
  ButtonWrapperProps &
  IButtonContainerProps;
