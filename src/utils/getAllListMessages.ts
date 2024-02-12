import {Client} from '@xmtp/react-native-sdk';
import {
  ListConversation,
  ListGroup,
  ListMessages,
} from '../models/ListMessages';
import {saveConsent} from '../services/mmkvStorage';

export const getAllListMessages = async (client?: Client<any> | null) => {
  if (!client) {
    return [];
  }

  const consentList = await client.contacts.refreshConsentList();

  consentList.forEach(async item => {
    saveConsent(client.address, item.value, item.permissionType === 'allowed');
  });
  await client.conversations.syncGroups();

  const [convos, groups] = await Promise.all([
    client.conversations.list(),
    client.conversations.listGroups(),
  ]);

  const allMessages: PromiseSettledResult<ListConversation | ListGroup>[] =
    await Promise.allSettled([
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
        await group.sync();
        const messages = await group.messages();
        const content = messages?.[0].content();
        const display =
          typeof content === 'string' ? content : messages?.[0].fallback ?? '';
        return {
          group,
          display,
          lastMessageTime: messages[0].sent,
          isRequest: false,
        };
      }),
    ]);

  // Remove the rejected promises and return the list of messages using .reduce
  const allMessagesFiltered = allMessages.reduce<ListMessages>((acc, curr) => {
    if (curr.status === 'fulfilled' && curr.value) {
      if ('group' in curr.value) {
        acc.push(curr.value);
      } else if ('conversation' in curr.value) {
        acc.push(curr.value);
      }
    }
    return acc;
  }, []);

  const sorted = allMessagesFiltered.sort((a, b) => {
    return b.lastMessageTime - a.lastMessageTime;
  });

  return sorted;
};
