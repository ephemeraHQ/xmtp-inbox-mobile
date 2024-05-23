import {useQueryClient} from '@tanstack/react-query';
import {XMTPPush} from '@xmtp/react-native-sdk';
import {useEffect} from 'react';
import {ListMessages} from '../models/ListMessages';
import {QueryKeys} from '../queries/QueryKeys';
import {useListQuery} from '../queries/useListQuery';
import {useClient} from './useClient';

export const useListMessages = () => {
  const {client} = useClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    const startStream = () => {
      if (!client) {
        return;
      }
      client.conversations.streamGroups(async newGroup => {
        console.log('NEW GROUP:', newGroup);
        const pushClient = new XMTPPush(client);
        pushClient.subscribe([newGroup.topic]);
        let content = '';
        try {
          const groupMessages = await newGroup.messages();
          try {
            const lastMessageContent = groupMessages[0]?.content();
            content =
              typeof lastMessageContent === 'string'
                ? lastMessageContent
                : groupMessages[0]?.fallback ?? '';
          } catch (err) {
            content = groupMessages[0]?.fallback ?? '';
          }
        } catch (err) {
          content = '';
        }
        queryClient.setQueryData<ListMessages>(
          [QueryKeys.List, client?.address],
          prev => {
            return [
              {
                group: newGroup,
                display: content,
                lastMessageTime: Date.now(),
                isRequest: false,
              },
              ...(prev ?? []),
            ];
          },
        );
      });
    };

    startStream();

    return () => {
      client?.conversations.cancelStreamGroups();
    };
  }, [client, queryClient]);

  return useListQuery();
};
