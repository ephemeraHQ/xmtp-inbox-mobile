import {
  DecodedMessage,
  GroupUpdatedContent,
  RemoteAttachmentContent,
} from '@xmtp/react-native-sdk';
import {Container} from 'native-base';
import React, {FC, useMemo} from 'react';
import {ContentTypes, SupportedContentTypes} from '../../consts/ContentTypes';
import {translate} from '../../i18n';
import {MessageIdReactionsMapping} from '../../queries/useGroupMessagesQuery';
import {colors} from '../../theme/colors';
import {formatAddress} from '../../utils/formatAddress';
import {ImageMessage} from '../ImageMessage';
import {Text} from '../common/Text';
import {MessageOptionsContainer} from './MessageOptionsContainer';
import {ReplyMessageContent} from './ReplyMessageContent';
import {TextMessageContent} from './TextMessageContent';

interface ConversationMessageContentProps {
  message: DecodedMessage<SupportedContentTypes>;
  isFromUser: boolean;
  reactions: MessageIdReactionsMapping[string];
}

interface ReactionItem {
  content: string;
  count: number;
  addedByUser: boolean;
}

export type ReactionItems = ReactionItem[];

export const ConversationMessageContent: FC<
  ConversationMessageContentProps
> = ({message, isFromUser, reactions}) => {
  const reacts = useMemo(() => {
    const arr: ReactionItems = [];
    for (const content of reactions.keys()) {
      const value = reactions.get(content);
      if (!value) {
        continue;
      }
      const addedByUser = value.addedByUser;
      const count = value.count;
      arr.push({content, count, addedByUser});
    }
    return arr;
  }, [reactions]);

  if (message.contentTypeId === ContentTypes.Text) {
    return (
      <MessageOptionsContainer
        reactions={reacts}
        isFromUser={isFromUser}
        messageId={message.id}>
        <TextMessageContent isFromUser={isFromUser} message={message} />
      </MessageOptionsContainer>
    );
  }

  if (message.contentTypeId === ContentTypes.RemoteStaticAttachment) {
    return (
      <MessageOptionsContainer
        reactions={reacts}
        isFromUser={isFromUser}
        messageId={message.id}>
        <Container
          borderRadius={'16px'}
          borderBottomRightRadius={isFromUser ? 0 : '16px'}
          borderTopLeftRadius={isFromUser ? '16px' : 0}
          paddingY={3}>
          <ImageMessage
            content={message.content() as RemoteAttachmentContent}
          />
        </Container>
      </MessageOptionsContainer>
    );
  }

  if (message.contentTypeId === ContentTypes.GroupUpdated) {
    const content = message.content() as GroupUpdatedContent;
    let text = '';
    if (content?.membersAdded.length > 0) {
      if (content?.membersAdded.length > 1) {
        text = translate('group_add_plural', {
          initiatedByInboxId: formatAddress(
            content?.membersAdded[0].initiatedByInboxId ?? '',
          ),
          count: String(content?.membersAdded.length),
        });
      } else {
        text = translate('group_add_single', {
          initiatedByInboxId: formatAddress(
            content?.membersAdded[0].initiatedByInboxId,
          ),
          inboxId: formatAddress(content?.membersAdded[0].inboxId),
        });
      }
    } else if (content?.membersRemoved.length > 0) {
      if (content?.membersRemoved.length > 1) {
        text = translate('group_remove_plural', {
          initiatedByInboxId: formatAddress(
            content?.membersRemoved[0].initiatedByInboxId,
          ),
          addressCount: String(content?.membersRemoved.length),
        });
      } else {
        text = translate('group_remove_single', {
          initiatedByInboxId: formatAddress(
            content?.membersRemoved[0].initiatedByInboxId,
          ),
          inboxId: formatAddress(content?.membersRemoved[0].inboxId),
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
  if (message.contentTypeId === ContentTypes.Reply) {
    return (
      <MessageOptionsContainer
        reactions={reacts}
        isFromUser={isFromUser}
        messageId={message.id}>
        <ReplyMessageContent message={message} isFromUser={isFromUser} />
      </MessageOptionsContainer>
    );
  }

  console.log('Unsupported content type', message.contentTypeId);
  // TODO: Add support for other content types
  return null;
};
