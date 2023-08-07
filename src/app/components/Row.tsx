import { View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

export interface IRowProps extends ViewStyle {
  mb?: ViewStyle['marginBottom'];
  mt?: ViewStyle['marginTop'];
  mx?: ViewStyle['marginHorizontal'];
  my?: ViewStyle['marginVertical'];
  dir?: ViewStyle['flexDirection'];
}

export const Row = styled(View).attrs((props: IRowProps) => ({
  marginBottom: props.mb,
  marginTop: props.mt,
  marginHorizontal: props.mx,
  marginVertical: props.my,
  ...props,
}))`
  flex-direction: ${({ dir }) => dir || 'row'};
`;
