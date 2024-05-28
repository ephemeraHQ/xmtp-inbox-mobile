import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {EventEmitterEvents} from '../consts/EventEmitters';
import {QueryKeys} from '../queries/QueryKeys';
import {useGroupParticipantsQuery} from '../queries/useGroupParticipantsQuery';
import {mmkvStorage} from '../services/mmkvStorage';

export const useGroupParticipants = (topic: string) => {
  const queryClient = useQueryClient();
  const [localParticipants] = useState(mmkvStorage.getGroupParticipants(topic));

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

  const query = useGroupParticipantsQuery(topic);

  useEffect(() => {
    if (query.isSuccess) {
      mmkvStorage.saveGroupParticipants(topic, query.data ?? []);
    }
  }, [query.data, query.isSuccess, topic]);

  return query.isSuccess ? query.data : localParticipants ?? [];
};
