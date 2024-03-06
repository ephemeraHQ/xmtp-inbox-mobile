import {
  DecodedMessage,
  GroupChangeContent,
  RemoteAttachmentContent,
} from '@xmtp/react-native-sdk';
import {Button, Container} from 'native-base';
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import {Pressable, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ContentTypes, SupportedContentTypes} from '../consts/ContentTypes';
import {ConversationContext} from '../context/ConversationContext';
import {useFrame} from '../hooks/useFrame';
import {translate} from '../i18n';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';
import {ImageMessage} from './ImageMessage';
import {Button as AppButton} from './common/Button';
import {Text} from './common/Text';

interface ConversationMessageContentProps {
  message: DecodedMessage<SupportedContentTypes>;
  isMe: boolean;
}

const OptionsContainer: FC<
  PropsWithChildren<{isMe: boolean; messageId: string}>
> = ({children, isMe, messageId}) => {
  const [shown, setShown] = useState(false);
  const {setReaction, setReply} = useContext(ConversationContext);

  const handleReactPress = useCallback(() => {
    setReaction(messageId);
  }, [setReaction, messageId]);

  const handleReplyPress = useCallback(() => {
    setReply(messageId);
  }, [setReply, messageId]);

  return (
    <Pressable onPress={() => setShown(prev => !prev)}>
      <Container
        flexShrink={1}
        alignSelf={isMe ? 'flex-end' : 'flex-start'}
        alignItems={isMe ? 'flex-end' : 'flex-start'}
        borderRadius={'16px'}>
        {children}
        {shown && (
          <Button.Group isAttached flexWrap={'wrap'}>
            <AppButton onPress={handleReplyPress} variant={'ghost'}>
              Reply
            </AppButton>
            <AppButton onPress={handleReactPress} variant={'ghost'}>
              React
            </AppButton>
          </Button.Group>
        )}
      </Container>
    </Pressable>
  );
};

const TextMessage = ({
  isMe,
  message,
}: {
  isMe: boolean;
  message: DecodedMessage<SupportedContentTypes>;
}) => {
  const {width} = useWindowDimensions();
  const {frameData, postFrame} = useFrame(message.content() as string);
  if (!frameData) {
    return (
      <Container
        backgroundColor={
          isMe ? colors.actionPrimary : colors.backgroundSecondary
        }
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

  return (
    <Container
      alignSelf={isMe ? 'flex-end' : 'flex-start'}
      borderRadius={'16px'}
      borderBottomRightRadius={isMe ? 0 : '16px'}
      borderTopLeftRadius={isMe ? '16px' : 0}
      paddingY={3}
      paddingX={5}>
      <FastImage
        source={{uri: frameData.image}}
        style={{height: 150, width: width / 2, borderRadius: 10}}
      />
      <Button.Group
        paddingTop={1}
        width={width / 2}
        isAttached
        flexWrap={'wrap'}>
        {frameData.buttons.map((it, id) => (
          <AppButton
            variant={'outline'}
            key={String(it)}
            flex={1}
            onPress={() => postFrame(id + 1)}>
            {it}
          </AppButton>
        ))}
      </Button.Group>
    </Container>
  );
};

export const ConversationMessageContent: FC<
  ConversationMessageContentProps
> = ({message, isMe}) => {
  if (message.contentTypeId === ContentTypes.Text) {
    return (
      <OptionsContainer isMe={isMe} messageId={message.id}>
        <TextMessage isMe={isMe} message={message} />
      </OptionsContainer>
    );
  }

  if (message.contentTypeId === ContentTypes.RemoteStaticAttachment) {
    return (
      <OptionsContainer isMe={isMe} messageId={message.id}>
        <Container
          borderRadius={'16px'}
          borderBottomRightRadius={isMe ? 0 : '16px'}
          borderTopLeftRadius={isMe ? '16px' : 0}
          paddingY={3}>
          <ImageMessage
            content={message.content() as RemoteAttachmentContent}
          />
        </Container>
      </OptionsContainer>
    );
  }

  if (message.contentTypeId === ContentTypes.GroupMembershipChange) {
    const content = message.content() as GroupChangeContent;
    let text = '';
    if (content?.membersAdded.length > 0) {
      if (content?.membersAdded.length > 1) {
        text = translate('group_add_plural', {
          initiatedByAddress: formatAddress(
            content?.membersAdded[0].initiatedByAddress ?? '',
          ),
          addressCount: String(content?.membersAdded.length),
        });
      } else {
        text = translate('group_add_single', {
          initiatedByAddress: formatAddress(
            content?.membersAdded[0].initiatedByAddress,
          ),
          address: formatAddress(content?.membersAdded[0].address),
        });
      }
    } else if (content?.membersRemoved.length > 0) {
      if (content?.membersRemoved.length > 1) {
        text = translate('group_remove_plural', {
          initiatedByAddress: formatAddress(
            content?.membersRemoved[0].initiatedByAddress,
          ),
          addressCount: String(content?.membersRemoved.length),
        });
      } else {
        text = translate('group_remove_single', {
          initiatedByAddress: formatAddress(
            content?.membersRemoved[0].initiatedByAddress,
          ),
          address: formatAddress(content?.membersRemoved[0].address),
        });
      }
    }

    return (
      <Container
        alignSelf="center"
        borderRadius={'16px'}
        paddingY={3}
        marginX={'8px'}>
        <Text
          typography="text-base/medium"
          color={colors.textSecondary}
          alignSelf="center">
          {text}
        </Text>
      </Container>
    );
  }

  // TODO: Add support for other content types
  return null;
};
