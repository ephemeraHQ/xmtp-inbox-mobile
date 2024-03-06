import {Conversation, DecodedMessage, Group} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';

export const getMessageId = (
  message: DecodedMessage<SupportedContentTypes>,
) => {
  return message.id;
};

export const getConversationId = (
  conversation: Conversation<SupportedContentTypes>,
) => {
  return conversation.topic;
};

export const getGroupId = (group: Group<SupportedContentTypes>) => {
  return group.id;
};
