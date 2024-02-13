import {DecodedMessage, RemoteAttachmentContent} from '@xmtp/react-native-sdk';
import {Container} from 'native-base';
import React, {FC} from 'react';
import {ContentTypes, SupportedContentTypes} from '../consts/ContentTypes';
import {translate} from '../i18n';
import {colors} from '../theme/colors';
import {ImageMessage} from './ImageMessage';
import {Text} from './common/Text';

interface ConversationMessageContentProps {
  message: DecodedMessage<SupportedContentTypes>;
  isMe: boolean;
}

export const ConversationMessageContent: FC<
  ConversationMessageContentProps
> = ({message, isMe}) => {
  if (message.contentTypeId === ContentTypes.Text) {
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

  if (message.contentTypeId === ContentTypes.RemoteStaticAttachment) {
    return (
      <Container alignSelf={isMe ? 'flex-end' : 'flex-start'}>
        <ImageMessage content={message.content() as RemoteAttachmentContent} />
      </Container>
    );
  }

  if (message.contentTypeId === ContentTypes.GroupMembershipChange) {
    return (
      <Container
        alignSelf="center"
        borderRadius={'16px'}
        paddingY={3}
        paddingX={5}>
        <Text
          typography="text-base/medium"
          color={colors.textSecondary}
          alignSelf="center">
          {translate('group_changed')}
        </Text>
      </Container>
    );
  }

  // TODO: Add support for other content types
  return null;
};
