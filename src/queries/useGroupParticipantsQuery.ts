import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {EventEmitterEvents} from '../consts/EventEmitters';
import {useGroup} from '../hooks/useGroup';
import {withRequestLogger} from '../utils/logger';
import {QueryKeys} from './QueryKeys';

export const useGroupParticipantsQuery = (topic: string) => {
  const {data: group} = useGroup(topic);
  const queryClient = useQueryClient();

  useEffect(() => {
    const groupChangeSubscription = DeviceEventEmitter.addListener(
      `${EventEmitterEvents.GROUP_CHANGED}_${topic}`,
      () => {
        queryClient.refetchQueries({
          queryKey: [QueryKeys.GroupParticipants, topic],
        });
      },
    );

    return () => {
      groupChangeSubscription.remove();
    };
  }, [topic, queryClient]);

  return useQuery({
    queryKey: [QueryKeys.GroupParticipants, group?.topic],
    queryFn: async () => {
      if (!group) {
        return [];
      }
      await withRequestLogger(group.sync(), {name: 'group_sync'});
      return withRequestLogger(group.memberInboxIds(), {
        name: 'group_members',
      });
    },
  });
};
