import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {EventEmitterEvents} from '../consts/EventEmitters';
import {useGroup} from '../hooks/useGroup';
import {withRequestLogger} from '../utils/logger';
import {QueryKeys} from './QueryKeys';

export const useGroupParticipantsQuery = (id: string) => {
  const {group} = useGroup(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const groupChangeSubscription = DeviceEventEmitter.addListener(
      `${EventEmitterEvents.GROUP_CHANGED}_${id}`,
      () => {
        queryClient.refetchQueries({
          queryKey: [QueryKeys.GroupParticipants, id],
        });
      },
    );

    return () => {
      groupChangeSubscription.remove();
    };
  }, [id, queryClient]);

  return useQuery({
    queryKey: [QueryKeys.GroupParticipants, group?.id],
    queryFn: async () => {
      if (!group) {
        return [];
      }
      await withRequestLogger(group.sync(), {name: 'group_sync'});
      return withRequestLogger(group.memberAddresses(), {
        name: 'group_members',
      });
    },
  });
};
