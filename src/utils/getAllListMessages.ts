import {Client} from '@xmtp/react-native-sdk';
import {ListMessages} from '../models/ListMessages';
import {saveConsent} from '../services/mmkvStorage';

export const getAllListMessages = async (client?: Client<any> | null) => {
  if (!client) {
    return [];
  }
  const consentList = await client.contacts.refreshConsentList();
  consentList.forEach(async item => {
    saveConsent(client.address, item.value, item.permissionType === 'allowed');
  });

  const [convos, groups] = await Promise.all([
    client.conversations.list(),
    client.conversations.listGroups(),
  ]);
  const allMessages: ListMessages = await Promise.all([
    ...convos.map(async conversation => {
      const [messages, consent] = await Promise.all([
        conversation.messages(1),
        conversation.consentState(),
      ]);
      const content = messages[0].content();
      return {
        conversation,
        display:
          typeof content === 'string' ? content : messages[0].fallback ?? '',
        lastMessageTime: messages[0].sent,
        isRequest: consent !== 'allowed',
      };
    }),
    ...groups.map(async group => {
      const messages = await group.messages();
      const content = messages[0].content();
      const display =
        typeof content === 'string' ? content : messages[0].fallback ?? '';
      return {
        group,
        display,
        lastMessageTime: messages[0].sent,
        isRequest: false,
      };
    }),
  ]);
  const sorted = allMessages.sort((a, b) => {
    return b.lastMessageTime - a.lastMessageTime;
  });

  return sorted;
};
