import styled from 'styled-components/native';
import { Typography } from '~/app/components/Typography';

interface IBaseLabelProps {
  color: string;
}

export const BaseLabel = styled(Typography).attrs({
  fontGroup: 'buttonMedium',
})<IBaseLabelProps>`
  color: ${(props) => props.color};
`;
