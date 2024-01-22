import {useRoute} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {useCallback} from 'react';
import {ConversationHeader} from '../components/ConversationHeader';
import {ConversationInput} from '../components/ConversationInput';
import {Screen} from '../components/common/Screen';
import {useClient} from '../hooks/useClient';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ScreenNames} from '../navigation/ScreenNames';

export const NewConversationScreen = () => {
  const {replace} = useTypedNavigation();
  const {params} = useRoute();
  const {address} = params as {address: string};
  const {client} = useClient();

  const onSend = useCallback(
    (message: {text: string}) => {
      client?.conversations?.newConversation(address).then(conversation => {
        conversation.send(message);
        replace(ScreenNames.Conversation, {topic: conversation.topic});
      });
    },
    [address, client?.conversations, replace],
  );

  return (
    <Screen
      includeTopPadding={false}
      containerStlye={{
        alignItems: undefined,
      }}>
      <Box flexGrow={1} paddingBottom={'20px'}>
        <ConversationHeader peerAddress={address} onAvatarPress={() => {}} />
        <Box flexGrow={1} />
        <ConversationInput sendMessage={onSend} />
      </Box>
    </Screen>
  );
};
