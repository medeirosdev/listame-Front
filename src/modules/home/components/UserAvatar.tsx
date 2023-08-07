import React, { FC } from 'react';
import { Avatar, IAvatarProps } from '~/app/components/Avatar';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';

type IUserAvatarProps = IAvatarProps;

export const UserAvatar: FC<IUserAvatarProps> = (props) => {
  const user = useAppSelector(currentUserSelector);

  return (
    <Avatar
      {...props}
      url={props.url || user?.avatar_url || null}
      fallbackName={user?.name}
    />
  );
};
