import {
  DecodedMessage,
  GroupChangeContent,
  RemoteAttachmentContent,
} from '@xmtp/react-native-sdk';
import {Container, Image} from 'native-base';
import React, {FC} from 'react';
import {useWindowDimensions} from 'react-native';
import {ContentTypes, SupportedContentTypes} from '../consts/ContentTypes';
import {useFrame} from '../hooks/useFrame';
import {translate} from '../i18n';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';
import {ImageMessage} from './ImageMessage';
import {Button} from './common/Button';
import {Text} from './common/Text';

interface ConversationMessageContentProps {
  message: DecodedMessage<SupportedContentTypes>;
  isMe: boolean;
}

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

  return (
    <Container
      backgroundColor={isMe ? colors.actionPrimary : colors.backgroundSecondary}
      alignSelf={isMe ? 'flex-end' : 'flex-start'}
      borderRadius={'16px'}
      borderBottomRightRadius={isMe ? 0 : '16px'}
      borderTopLeftRadius={isMe ? '16px' : 0}
      paddingY={3}
      paddingX={5}>
      <Image
        source={{uri: frameData.image}}
        alt="frame image"
        height={150}
        width={width / 2}
      />
      <Container flexWrap={'wrap'} flexDirection={'row'} width={'100%'}>
        {frameData.buttons.map((it, id) => (
          <Button key={String(it)} onPress={() => postFrame(id + 1)}>
            {it}
          </Button>
        ))}
      </Container>
    </Container>
  );
};

export const ConversationMessageContent: FC<
  ConversationMessageContentProps
> = ({message, isMe}) => {
  if (message.contentTypeId === ContentTypes.Text) {
    return <TextMessage isMe={isMe} message={message} />;
  }

  if (message.contentTypeId === ContentTypes.RemoteStaticAttachment) {
    return (
      <Container alignSelf={isMe ? 'flex-end' : 'flex-start'}>
        <ImageMessage content={message.content() as RemoteAttachmentContent} />
      </Container>
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
