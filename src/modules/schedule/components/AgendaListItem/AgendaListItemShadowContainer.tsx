import styled from 'styled-components/native';
import { Shadow } from '~/app/components/Shadow';

export const AgendaListItemShadowContainer = styled(Shadow).attrs({
  dp: 'dp01',
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  overflow: hidden;
  padding: 8px;
`;
