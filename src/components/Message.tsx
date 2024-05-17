import {DecodedMessage} from '@xmtp/react-native-sdk';
import {Box, VStack} from 'native-base';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {ContentTypes, SupportedContentTypes} from '../consts/ContentTypes';
import {MessageIdReactionsMapping} from '../queries/useGroupMessagesQuery';
import {mmkvStorage} from '../services/mmkvStorage';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';
import {getMessageTimeDisplay} from '../utils/getMessageTimeDisplay';
import {Text} from './common/Text';
import {ConversationMessageContent} from './messageContent/ConversationMessageContent';

export interface MessageProps {
  message: DecodedMessage<SupportedContentTypes>;
  isMe: boolean;
  reactions: MessageIdReactionsMapping[string];
}

export const Message: FC<MessageProps> = ({message, isMe, reactions}) => {
  if (message.contentTypeId === ContentTypes.Reaction) {
    return null;
  }
  return (
    <Pressable>
      <Box marginLeft={6} marginRight={6} marginY={2} flexShrink={1}>
        <VStack>
          {!isMe && (
            <VStack justifyItems={'flex-end'}>
              <Text
                color={colors.primaryN200}
                textAlign={'end'}
                typography="text-xs/semi-bold"
                alignSelf={'flex-start'}>
                {mmkvStorage.getEnsName(message.senderAddress) ??
                  formatAddress(message.senderAddress)}
              </Text>
            </VStack>
          )}
          <ConversationMessageContent
            message={message}
            isMe={isMe}
            reactions={reactions}
          />
          <Text
            flexShrink={1}
            color={colors.primaryN200}
            typography="text-xs/semi-bold"
            alignSelf={
              message.contentTypeId === ContentTypes.GroupMembershipChange
                ? 'center'
                : isMe
                ? 'flex-end'
                : 'flex-start'
            }>
            {getMessageTimeDisplay(message.sent)}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};
