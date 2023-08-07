import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Shadow } from '~/app/components/Shadow';
import { Typography } from '~/app/components/Typography';

export interface IScheduleListItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  hour: string;
  dayWithMonth: string;
  onPress?: () => void;
}

export const ListItem: FC<IScheduleListItemProps> = (props) => {
  const { hour, dayWithMonth, title, subtitle, description, onPress } = props;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress?.()}>
      <ListItemShadowContainer dp="dp01">
        <ListItemDate>
          <ListItemDateHour>{hour}</ListItemDateHour>
          <ListItemDateDivider />
          <ListItemDateDayMonth>{dayWithMonth}</ListItemDateDayMonth>
        </ListItemDate>
        <ListItemDetais>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Description>{description}</Description>
        </ListItemDetais>
      </ListItemShadowContainer>
    </TouchableOpacity>
  );
};

export const ListItemShadowContainer = styled(Shadow)`
  flex-direction: row;
  align-items: center;
  height: 82px;
  margin-top: 8px;
  overflow: hidden;
`;

export const ListItemDate = styled.View.attrs({})`
  height: 100%;
  justify-content: center;
  padding: 0 10px;
  background-color: ${({ theme: { colors } }) => colors.primary.blue[500]};
  border-top-left-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
  border-bottom-left-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
`;

export const ListItemDateHour = styled(Typography).attrs({
  fontGroup: 'h6Medium',
})`
  color: ${({ theme: { colors } }) => colors.neutral.white};
`;

export const ListItemDateDivider = styled.View`
  height: 1px;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

export const ListItemDateDayMonth = styled(Typography).attrs({
  fontGroup: 'bodySmallRegular',
})`
  color: ${({ theme: { colors } }) => colors.neutral.white};
  align-self: center;
`;

export const ListItemDetais = styled.View`
  margin-left: 16px;
`;

export const Title = styled(Typography).attrs({
  fontGroup: 'bodySmallMedium',
})`
  color: ${({ theme: { colors } }) => colors.gray[900]};
`;

export const Subtitle = styled(Typography).attrs({
  fontGroup: 'captionRegular',
})`
  color: ${({ theme: { colors } }) => colors.gray[600]};
`;

export const Description = styled(Typography).attrs({
  fontGroup: 'captionRegular',
})`
  color: ${({ theme: { colors } }) => colors.gray[800]};
`;
