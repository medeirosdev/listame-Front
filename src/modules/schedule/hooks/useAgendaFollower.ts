import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { queryClient } from '~/app/services/queryClient';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';
import { agendasApi } from '~/modules/home/services/api/agendasApi';

export const useAgendaFollower = (id: string) => {
  const {
    data: followers,
    isLoading: isFollowersLoading,
    error: followersError,
    refetch,
  } = useQuery(['getAgendaFollowers', id], getAgendaFollowers);

  const user = useAppSelector(currentUserSelector);

  async function getAgendaFollowers({ queryKey }: { queryKey: QueryKey }) {
    const [_, agendaId] = queryKey;
    const followers = await agendasApi.getFollowers(agendaId as string);
    return followers;
  }

  const {
    mutate: followAgenda,
    isLoading: isFollowingLoading,
    error: followError,
  } = useMutation(agendasApi.follow, {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      refetch();
    },
  });

  const {
    mutate: unfollowAgenda,
    isLoading: isUnfollowingLoading,
    error: unfollowError,
  } = useMutation(agendasApi.unfollow, {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      refetch();
    },
  });

  async function follow() {
    return followAgenda(id);
  }

  async function unfollow() {
    return unfollowAgenda(id);
  }

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries(['getAgendaFollowers']);
    };
  }, []);

  const followersCount = useMemo(() => followers?.length || 0, [followers]);
  const isFollowing = useMemo(() => {
    if (!user?.id || !followers?.length) return false;
    return followers.some((follower) => follower.user_id === user?.id);
  }, [followers]);

  return {
    isFollowing,
    followersCount,
    follow,
    unfollow,
    followError,
    unfollowError,
    followersError,
    isLoading: isFollowersLoading || isFollowingLoading || isUnfollowingLoading,
  };
};
