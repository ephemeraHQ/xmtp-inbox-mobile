import {Conversation} from '@xmtp/react-native-sdk';
import {useEffect, useState} from 'react';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {useClient} from './useClient';

export const useConversation = (topic: string) => {
  if (!topic) {
    throw new Error('useConversation requires a topic');
  }
  const {client} = useClient();
  const [conversation, setConversation] =
    useState<Conversation<SupportedContentTypes> | null>(null);

  useEffect(() => {
    const getConversation = async () => {
      const conversations = await client?.conversations.list();
      const convo = conversations?.find(c => c.topic === topic);
      if (convo) {
        setConversation(convo);
      }
    };
    getConversation();
  }, [client, topic]);

  return {
    conversation,
  };
};
