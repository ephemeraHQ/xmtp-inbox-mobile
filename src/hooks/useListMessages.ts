import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {ListConversation, ListMessages} from '../models/ListMessages';
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
      client.conversations.streamAllMessages(async message => {
        const topic = message.topic;
        const content = message.content();
        const messageStringContent =
          typeof content === 'string' ? content : message.fallback ?? '';
        queryClient.setQueryData<ListMessages>(
          [QueryKeys.List, client?.address],
          prev => {
            const existingConversation = prev?.find(it => {
              return 'conversation' in it && it.conversation.topic === topic;
            });
            // Handle existing conversations here, new conversations handled in stream
            if (existingConversation) {
              const data = prev?.map(it => {
                if ('conversation' in it && it.conversation.topic === topic) {
                  if ('conversation' in existingConversation) {
                    const newIt: ListConversation = {
                      conversation: existingConversation.conversation,
                      display: messageStringContent,
                      lastMessageTime: message.sent,
                      isRequest: it.isRequest,
                    };
                    return newIt;
                  }
                }
                return it;
              });
              return data;
            } else {
              return prev;
            }
          },
        );
      });
    };

    startStream();

    return () => {
      client?.conversations.cancelStreamAllMessages();
    };
  }, [client, queryClient]);

  useEffect(() => {
    const startStream = () => {
      if (!client) {
        return;
      }
      client.conversations.stream(async newConversation => {
        const [consent] = await Promise.all([newConversation.consentState()]);
        const content = '';
        queryClient.setQueryData<ListMessages>(
          [QueryKeys.List, client?.address],
          prev => {
            return [
              {
                conversation: newConversation,
                display: content,
                lastMessageTime: Date.now(),
                isRequest: consent !== 'allowed',
              },
              ...(prev ?? []),
            ];
          },
        );
      });
    };

    startStream();

    return () => {
      client?.conversations.cancelStream();
    };
  }, [client, queryClient]);

  // useEffect(() => {
  //   const startStream = () => {
  //     if (!client) {
  //       return;
  //     }
  //     client.conversations.streamGroups(async newGroup => {
  //       const messages = await newGroup.messages(1);
  //       const message = messagesJson[0], client);
  //       queryClient.setQueryData<ListMessages>(
  //         [QueryKeys.List, client?.address],
  //         prev => {
  //           return [
  //             {
  //               group: newGroup,
  //               display: '',
  //               lastMessageTime: message.sent,
  //               isRequest: false,
  //             },
  //             ...(prev ?? []),
  //           ];
  //         },
  //       );
  //     });
  //   };

  //   startStream();

  //   return () => {
  //     client?.conversations.cancelGroupStream();
  //   };
  // }, [client, queryClient]);

  return useListQuery();
};
