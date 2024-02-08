import {useRoute} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {useCallback} from 'react';
import {Asset} from 'react-native-image-picker';
import {ConversationHeader} from '../components/ConversationHeader';
import {ConversationInput} from '../components/ConversationInput';
import {GroupHeader} from '../components/GroupHeader';
import {Screen} from '../components/common/Screen';
import {useClient} from '../hooks/useClient';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ScreenNames} from '../navigation/ScreenNames';

export const NewConversationScreen = () => {
  const {replace} = useTypedNavigation();
  const {params} = useRoute();
  const {addresses} = params as {addresses: string[]};
  const {client} = useClient();

  const onSend = useCallback(
    async (message: {text?: string; asset?: Asset}) => {
      // TODO: Error Handling
      if (addresses.length !== 1) {
        client?.conversations
          ?.newGroup(addresses)
          .then(group => {
            group.send(message);
            replace(ScreenNames.Group, {id: group.id});
          })
          .catch(err => {
            console.log('error on new', err);
          });
      } else {
        client?.conversations
          ?.newConversation(addresses[0])
          .then(conversation => {
            conversation.send(message);
            replace(ScreenNames.Conversation, {topic: conversation.topic});
          });
      }
    },
    [addresses, client?.conversations, replace],
  );

  return (
    <Screen
      includeTopPadding={false}
      containerStlye={{
        alignItems: undefined,
      }}>
      <Box flexGrow={1} paddingBottom={'20px'}>
        {addresses.length > 1 ? (
          <GroupHeader peerAddresses={addresses} onGroupPress={() => {}} />
        ) : (
          <ConversationHeader
            peerAddress={addresses[0]}
            onAvatarPress={() => {}}
          />
        )}
        <Box flexGrow={1} />
        <ConversationInput sendMessage={onSend} />
      </Box>
    </Screen>
  );
};
