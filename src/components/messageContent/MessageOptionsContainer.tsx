import {Button, Container, HStack, Pressable} from 'native-base';
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import Haptic from 'react-native-haptic-feedback';
import {GroupContext} from '../../context/GroupContext';
import {translate} from '../../i18n';
import {colors} from '../../theme/colors';
import {Button as AppButton} from '../common/Button';
import {Text} from '../common/Text';
import {ReactionItems} from './ConversationMessageContent';

export const MessageOptionsContainer: FC<
  PropsWithChildren<{
    isMe: boolean;
    messageId: string;
    reactions: ReactionItems;
  }>
> = ({children, isMe, messageId, reactions}) => {
  const [shown, setShown] = useState(false);
  const {group, setReplyId} = useContext(GroupContext);

  const handleReactPress = useCallback(
    (content: string) => {
      Haptic.trigger('notificationSuccess');
      group?.send({
        reaction: {
          reference: messageId,
          action: 'added',
          schema: 'unicode',
          content,
        },
      });
      setShown(false);
    },
    [group, messageId],
  );

  const handleReplyPress = useCallback(() => {
    Haptic.trigger('contextClick');
    setReplyId(messageId);
    setShown(false);
  }, [setReplyId, messageId]);

  const handleRemoveReplyPress = useCallback(
    (content: string) => {
      Haptic.trigger('notificationSuccess');
      group?.send({
        reaction: {
          reference: messageId,
          action: 'removed',
          schema: 'unicode',
          content,
        },
      });
    },
    [group, messageId],
  );

  const handleLongPress = useCallback(() => {
    Haptic.trigger('longPress');
    setShown(true);
  }, [setShown]);

  const handlePress = useCallback(() => {
    setShown(false);
  }, [setShown]);

  return (
    <Pressable onPress={handlePress} onLongPress={handleLongPress}>
      <Container
        flexShrink={1}
        alignSelf={isMe ? 'flex-end' : 'flex-start'}
        alignItems={isMe ? 'flex-end' : 'flex-start'}
        borderRadius={'16px'}>
        {children}
        {reactions.length > 0 && (
          <HStack paddingTop={2}>
            {reactions.map(({content, count, addedByUser}) => {
              if (count <= 0) {
                return null;
              }
              return (
                <Pressable
                  onPress={
                    addedByUser
                      ? () => handleRemoveReplyPress(content)
                      : () => handleReactPress(content)
                  }
                  key={content}
                  style={[
                    styles.reaction,
                    addedByUser && styles.reactionFromUser,
                  ]}>
                  <Text
                    color={
                      addedByUser ? colors.textTertiary : colors.textSecondary
                    }
                    typography="text-xs/semi-bold"
                    marginX={1}>
                    {content} {count}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        )}
        {shown && (
          <Button.Group isAttached flexWrap={'wrap'}>
            <AppButton onPress={handleReplyPress} variant={'ghost'}>
              {translate('reply')}
            </AppButton>
            <AppButton onPress={() => handleReactPress('👍')} variant={'ghost'}>
              👍
            </AppButton>
            <AppButton onPress={() => handleReactPress('👎')} variant={'ghost'}>
              👎
            </AppButton>
          </Button.Group>
        )}
      </Container>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  reaction: {
    borderRadius: 16,
    height: 24,
    padding: 4,
  },
  reactionFromUser: {
    backgroundColor: colors.actionPrimary,
  },
  reactionNotFromUser: {},
});
