import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { IAgendaListItemProps } from '~/modules/schedule/components/AgendaList/anathomy/ListItem';
import { AgendaListItem } from '~/modules/schedule/components/AgendaListItem/AgendaListItem';

export const AgendaHeaderRow: FC<IAgendaListItemProps> = (props) => {
  return (
    <HeaderRow>
      <AgendaListItem {...props} />
    </HeaderRow>
  );
};

const HeaderRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.primary.blue[50]};
  padding: 16px 24px;
`;
