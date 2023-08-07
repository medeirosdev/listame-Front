import styled from 'styled-components/native';

interface ILayoutContainerProps {
  isCentered?: boolean;
  my?: number;
}

export const LayoutContainer = styled.SafeAreaView<ILayoutContainerProps>`
  margin: 0px 24px;
  flex: 1;
  ${({ isCentered, my }) => {
    if (my) {
      return {
        marginTop: `${my}px`,
        marginBottom: `${my}px`,
      };
    }
    if (isCentered)
      return {
        justifyContent: 'space-around',
      };
  }}
`;
