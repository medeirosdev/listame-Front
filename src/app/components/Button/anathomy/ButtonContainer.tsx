import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IconOrientations } from '../types';

export interface IButtonContainerProps {
  fullWidth?: boolean;
  isLoading?: boolean;
  iconOrientation?: IconOrientations;
  bg?: string;
  borderColor?: string;
  borderRadius?: string;
  hasIconAndText?: boolean;
}

export const ButtonContainer = styled.TouchableOpacity<IButtonContainerProps>`
  flex-grow: ${({ fullWidth }) => (fullWidth ? 1 : 0)};
  flex-direction: ${({ iconOrientation }) =>
    iconOrientation === 'right' ? 'row' : 'row-reverse'};
  justify-content: ${({ hasIconAndText }) =>
    hasIconAndText ? 'space-between' : 'center'};
  align-items: center;
  height: ${RFValue(48)}px;
  padding: ${RFValue(12)}px ${RFValue(16)}px;
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius || `${theme.radii.xxl}px`};
  background-color: ${({ bg, theme }) => bg ?? theme.colors.primary.blue[700]};
  ${({ borderColor }) => borderColor && { border: `2px solid ${borderColor}` }};
  opacity: ${(props) =>
    props.isLoading || props.disabled ? props.activeOpacity : 1};
`;
