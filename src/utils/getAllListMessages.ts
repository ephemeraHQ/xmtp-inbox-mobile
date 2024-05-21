import {Client} from '@xmtp/react-native-sdk';
import {Platform} from 'react-native';
import {ListGroup, ListMessages} from '../models/ListMessages';
import {mmkvStorage} from '../services/mmkvStorage';
import {PushNotificatons} from '../services/pushNotifications';
import {withRequestLogger} from './logger';

export const getAllListMessages = async (client?: Client<any> | null) => {
  try {
    if (!client) {
      return [];
    }
    const [consentList] = await Promise.all([
      withRequestLogger(client.contacts.refreshConsentList(), {
        name: 'consent',
      }),
      withRequestLogger(client.conversations.syncGroups(), {
        name: 'group_sync',
      }),
    ]);

    consentList.forEach(async item => {
      mmkvStorage.saveConsent(
        client.address,
        item.value,
        item.permissionType === 'allowed',
      );
    });
    if (Platform.OS !== 'android') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _ = new PushNotificatons(client);
    }

    const groups = await withRequestLogger(client.conversations.listGroups(), {
      name: 'groups',
    });

    const allMessages: PromiseSettledResult<ListGroup>[] =
      await Promise.allSettled(
        groups.map(async group => {
          // const hasPushSubscription = mmkvStorage.getGroupIdPushSubscription(
          //   group.topic,
          // );
          // // if (!hasPushSubscription) {
          // console.log('PUSH NOTIFICATION Subscribing to group', group.topic);
          // XMTPPush.subscribe([group.topic]);
          // mmkvStorage.saveGroupIdPushSubscription(group.topic, true);
          // // }
          await group.sync();
          const messages = await withRequestLogger(group.messages(), {
            name: 'group_messages',
          });
          const content = messages?.[0]?.content();
          const display =
            typeof content === 'string'
              ? content
              : messages?.[0]?.fallback ?? '';
          return {
            group,
            display,
            lastMessageTime: messages[0]?.sent,
            isRequest: false,
          };
        }),
      );

    // Remove the rejected promises and return the list of messages using .reduce
    const allMessagesFiltered = allMessages.reduce<ListMessages>(
      (acc, curr) => {
        if (curr.status === 'fulfilled' && curr.value) {
          if ('group' in curr.value) {
            acc.push(curr.value);
          } else if ('conversation' in curr.value) {
            acc.push(curr.value);
          }
        } else {
          console.log('Error fetching messages', curr);
        }
        return acc;
      },
      [],
    );

    const sorted = allMessagesFiltered.sort((a, b) => {
      return b.lastMessageTime - a.lastMessageTime;
    });

    return sorted;
  } catch (e) {
    console.log('Error fetching messages', e);
    throw new Error('Error fetching messages');
  }
};
