import {DecodedMessage, RemoteAttachmentContent} from '@xmtp/react-native-sdk';
import {Container} from 'native-base';
import React, {FC} from 'react';
import {colors} from '../theme/colors';
import {ImageMessage} from './ImageMessage';
import {Text} from './common/Text';

interface ConversationMessageContentProps {
  message: DecodedMessage<unknown>;
  isMe: boolean;
}

export const ConversationMessageContent: FC<
  ConversationMessageContentProps
> = ({message, isMe}) => {
  if (message.contentTypeId === 'xmtp.org/text:1.0') {
    return (
      <Container
        backgroundColor={
          isMe ? colors.actionPrimary : colors.backgroundSecondary
        }
        alignSelf={isMe ? 'flex-end' : 'flex-start'}
        borderRadius={'16px'}
        borderBottomRightRadius={isMe ? 0 : '16px'}
        borderTopLeftRadius={isMe ? '16px' : 0}
        paddingY={3}
        paddingX={5}>
        <Text
          typography="text-base/medium"
          color={isMe ? colors.actionPrimaryText : colors.textPrimary}>
          {message.content() as string}
        </Text>
      </Container>
    );
  }

  if (message.contentTypeId === 'xmtp.org/remoteStaticAttachment:1.0') {
    return (
      <ImageMessage content={message.content() as RemoteAttachmentContent} />
    );
  }

  // TODO: Add support for other content types
  return null;
};
