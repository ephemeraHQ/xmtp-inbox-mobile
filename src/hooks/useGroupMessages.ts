import {DecodedMessage} from '@xmtp/react-native-sdk';
import {useCallback, useEffect, useState} from 'react';
import {useGroup} from './useGroup';

export const useGroupMessages = (id: string) => {
  const [messages, setMessages] = useState<DecodedMessage<unknown>[]>([]);
  const {group} = useGroup(id);

  const getMessages = useCallback(async () => {
    if (group) {
      await group.sync();
      const initialMessages = await group.messages();
      setMessages(initialMessages);
    }
  }, [group]);

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
