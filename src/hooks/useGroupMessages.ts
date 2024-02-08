import {DecodedMessage} from '@xmtp/react-native-sdk';
import {useCallback, useEffect, useState} from 'react';
import {useClient} from './useClient';
import {useGroup} from './useGroup';

export const useGroupMessages = (id: string) => {
  const [messages, setMessages] = useState<DecodedMessage<unknown>[]>([]);
  const {client} = useClient();
  const {group} = useGroup(id);

  const getMessages = useCallback(async () => {
    if (group) {
      await group.sync();
      const initialMessages = await group.messages();
      setMessages(
        initialMessages.map(
          mess =>
            DecodedMessage.from(
              mess as unknown as string,
              client!,
            ) as DecodedMessage,
        ),
      );
    }
  }, [client, group]);

  useEffect(() => {
    let cancelStream: (() => void) | undefined;
    getMessages();
    return () => {
      cancelStream?.();
    };
  }, [getMessages]);

  return {
    messages,
    refetch: getMessages,
  };
};
