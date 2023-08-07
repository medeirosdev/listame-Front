import styled from 'styled-components/native';
import { IconOrientations } from '~/app/components/Button/types';
import { Icon } from '~/app/components/Icon';

interface IBaseIconProps {
  color: string;
  orientation: IconOrientations;
}

export const BaseIcon = styled(Icon)<IBaseIconProps>`
  margin-left: ${({ orientation }) =>
    orientation === 'right' ? '8px' : '0px'};
  margin-right: ${({ orientation }) =>
    orientation === 'left' ? '8px' : '0px'};
  color: ${(props) => props.color};
`;
