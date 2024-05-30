import {
  DecodedMessage,
  RemoteAttachmentContent,
  ReplyCodec,
} from '@xmtp/react-native-sdk';
import {ReplyContent} from '@xmtp/react-native-sdk/build/lib/NativeCodecs/ReplyCodec';
import {Container} from 'native-base';
import React, {useCallback, useContext, useMemo} from 'react';
import {Pressable} from 'react-native';
import {ContentTypes, SupportedContentTypes} from '../../consts/ContentTypes';
import {GroupContext} from '../../context/GroupContext';
import {translate} from '../../i18n';
import {colors} from '../../theme/colors';
import {Text} from '../common/Text';
import {ImageMessage} from '../ImageMessage';

interface ReplyMessageContentProps {
  message: DecodedMessage<SupportedContentTypes>;
  isMe: boolean;
}

export const ReplyMessageContent = ({
  message,
  isMe,
}: ReplyMessageContentProps) => {
  const {scrollToMessage} = useContext(GroupContext);

  const reply = (
    message as unknown as DecodedMessage<[ReplyCodec]>
  ).content() as ReplyContent<SupportedContentTypes>;

  const content = useMemo(() => {
    if (typeof reply === 'string' || typeof reply.content === 'string') {
      return reply;
    }
    switch (reply.contentType) {
      case ContentTypes.Text:
        const textContent = reply.content as unknown as {text: string};
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
              {textContent.text}
            </Text>
          </Container>
        );
      case ContentTypes.RemoteStaticAttachment:
        const remoteAttachmentContent =
          reply.content as unknown as RemoteAttachmentContent;
        return <ImageMessage content={remoteAttachmentContent} />;
      default:
        return null;
    }
  }, [isMe, reply]);

  const handlePress = useCallback(() => {
    if (reply.reference) {
      scrollToMessage(reply.reference);
    }
  }, [scrollToMessage, reply.reference]);

  if (!reply) {
    return null;
  }
  return (
    <Container
      borderRadius={'16px'}
      borderBottomRightRadius={isMe ? 0 : '16px'}
      borderTopLeftRadius={isMe ? '16px' : 0}>
      <Pressable onPress={handlePress}>
        <Text typography="text-xs/regular" color={colors.textSecondary}>
          {translate('replied_to')}
        </Text>
      </Pressable>
      {content}
    </Container>
  );
};
