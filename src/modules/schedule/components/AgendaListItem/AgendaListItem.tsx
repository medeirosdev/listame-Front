import React from 'react';
import styled from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import defaultAgendaAvatar from '~/app/assets/agenda-default.png';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { IAgenda } from '~/modules/schedule/types/agendas';
import { useRoute } from '@react-navigation/native';

export interface IAgendaListProps {
  id?: IAgenda['id'];
  name: string;
  owner?: string;
  avatar: string | null;
}

export const AgendaListItem = (props: IAgendaListProps) => {
  const { name, owner, avatar, id } = props;
  const navigation = usePrivateNavigation();
  const route = useRoute();

  const ignoreOnPress = route.name === 'ScheduleDetails';

  const goToScheduleDetailsPage = () => {
    if (!id) return;

    navigation.navigate('ScheduleDetails', {
      id,
    });
  };

  console.log({ avatar });
  return (
    <AgendaTouchableContainer
      disabled={ignoreOnPress}
      activeOpacity={ignoreOnPress ? 0 : 0.7}
      onPress={goToScheduleDetailsPage}>
      <Avatar
        source={
          avatar && avatar?.includes('http')
            ? {
                uri: avatar,
                width: 48,
                height: 48,
              }
            : defaultAgendaAvatar
        }
      />
      <TextContainer>
        <Title>{name}</Title>
        <Subtitle>{owner}</Subtitle>
      </TextContainer>
    </AgendaTouchableContainer>
  );
};

export const AgendaTouchableContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const Title = styled(Typography).attrs({
  fontGroup: 'bodySmallMedium',
  numberOfLines: 1,
})`
  color: ${({ theme: { colors } }) => colors.gray[900]};
  overflow: hidden;
  width: 90%;
`;

export const Subtitle = styled(Typography).attrs({
  fontGroup: 'captionRegular',
  numberOfLines: 1,
})`
  color: ${({ theme: { colors } }) => colors.gray[600]};
  overflow: hidden;
  width: 80%;
`;

export const Avatar = styled.Image`
  border-radius: ${({ theme: { radii } }) => `${radii.full}px`};
  margin-right: 8px;
`;
