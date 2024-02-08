import {Conversation} from '@xmtp/react-native-sdk';
import {HStack, VStack} from 'native-base';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {useContactInfo} from '../hooks/useContactInfo';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ScreenNames} from '../navigation/ScreenNames';
import {getMessageTimeDisplay} from '../utils/getMessageTimeDisplay';
import {AvatarWithFallback} from './AvatarWithFallback';
import {Text} from './common/Text';

interface ConversationListItemProps {
  conversation: Conversation<any>;
  display: string;
  lastMessageTime: number;
}

export const ConversationListItem: FC<ConversationListItemProps> = ({
  conversation,
  display,
  lastMessageTime,
}) => {
  const {navigate} = useTypedNavigation();
  const {displayName, avatarUrl} = useContactInfo(conversation.peerAddress);

  return (
    <Pressable
      onPress={() => {
        navigate(ScreenNames.Conversation, {
          topic: conversation.topic,
        });
      }}>
      <HStack space={[2, 3]} alignItems={'center'} w={'100%'} padding={'16px'}>
        <AvatarWithFallback
          avatarUri={avatarUrl}
          size={48}
          style={{marginRight: 16}}
          address={conversation.peerAddress}
        />
        <VStack flex={1} justifyContent={'flex-end'}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            typography="text-base/bold">
            {displayName}
          </Text>
          <Text numberOfLines={1} typography="text-sm/regular">
            {display}
          </Text>
        </VStack>
        <Text
          alignSelf={'flex-start'}
          typography="text-xs/regular"
          style={{textAlignVertical: 'top'}}>
          {getMessageTimeDisplay(lastMessageTime)}
        </Text>
      </HStack>
    </Pressable>
  );
};
