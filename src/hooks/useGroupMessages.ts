import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {ContentTypes} from '../consts/ContentTypes';
import {QueryKeys} from '../queries/QueryKeys';
import {
  GroupMessagesQueryRequestData,
  useGroupMessagesQuery,
} from '../queries/useGroupMessagesQuery';
import {useGroup} from './useGroup';

export const useGroupMessages = (topic: string) => {
  const {data: group} = useGroup(topic);
  const queryClient = useQueryClient();

  useEffect(
    () => {
      const cancelStream = group?.streamGroupMessages(async message => {
        queryClient.setQueryData<GroupMessagesQueryRequestData>(
          [QueryKeys.GroupMessages, topic],
          prevMessages => [message, ...(prevMessages ?? [])],
        );
        if (message.contentTypeId === ContentTypes.GroupMembershipChange) {
          await group.sync();
          const addresses = await group.memberAddresses();
          queryClient.setQueryData(
            [QueryKeys.GroupParticipants, topic],
            addresses,
          );
        }
      });
      return () => {
        cancelStream?.then(callback => {
          callback();
        });
      };
    },
    // iOS - Rerender causes lost stream, these shouldn't change anyways so it should be fine
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // group, queryClient, topic
    ],
  );

  return useGroupMessagesQuery(topic);
};
