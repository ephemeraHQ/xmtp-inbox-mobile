import {DecodedMessage} from '@xmtp/react-native-sdk';
import {useEffect, useState} from 'react';
import {useConversation} from './useConversation';

export const useConversationMessages = (topic: string) => {
  const [messages, setMessages] = useState<DecodedMessage<unknown>[]>([]);
  const {conversation} = useConversation(topic);

  useEffect(() => {
    let cancelStream: (() => void) | undefined;
    const getMessages = async () => {
      if (conversation) {
        cancelStream = conversation.streamMessages(async message => {
          setMessages(prevMessages => [message, ...prevMessages]);
        });

        const initialMessages = await conversation.messages();
        setMessages([initialMessages[0]]);
      }
    };
    getMessages();
    return () => {
      cancelStream?.();
    };
  }, [conversation]);

  return {
    messages,
  };
};
