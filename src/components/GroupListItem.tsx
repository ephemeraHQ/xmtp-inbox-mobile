import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {Box, HStack, VStack} from 'native-base';
import React, {FC, useCallback, useMemo} from 'react';
import {Pressable} from 'react-native';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {useGroupName} from '../hooks/useGroupName';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ScreenNames} from '../navigation/ScreenNames';
import {useFirstGroupMessageQuery} from '../queries/useFirstGroupMessageQuery';
import {useGroupParticipantsQuery} from '../queries/useGroupParticipantsQuery';
import {getContentFromMessage} from '../utils/getContentFromMessage';
import {getMessageTimeDisplay} from '../utils/getMessageTimeDisplay';
import {GroupAvatarStack} from './GroupAvatarStack';
import {Text} from './common/Text';

interface GroupListItemProps {
  group: Group<SupportedContentTypes>;
}

export const GroupListItem: FC<GroupListItemProps> = ({group}) => {
  const topic = group?.topic;
  const {data: addresses} = useGroupParticipantsQuery(topic);
  const {navigate} = useTypedNavigation();
  const {groupName} = useGroupName(topic);
  const {data: messages, isLoading, isError} = useFirstGroupMessageQuery(topic);
  const firstMessage = messages?.[0];

  const handlePress = useCallback(() => {
    navigate(ScreenNames.Group, {
      topic,
    });
  }, [topic, navigate]);

  const display: string | undefined = useMemo(() => {
    if (!firstMessage) {
      return '';
    }
    return getContentFromMessage(firstMessage);
  }, [firstMessage]);

  const lastMessageTime: number | undefined = useMemo(() => {
    if (isLoading) {
      return undefined;
    }
    if (isError) {
      return undefined;
    }
    if (!firstMessage) {
      return undefined;
    }

    return firstMessage?.sent;
  }, [firstMessage, isLoading, isError]);

  return (
    <Pressable onPress={handlePress}>
      <HStack space={[2, 3]} alignItems={'center'} w={'100%'} padding={'16px'}>
        <Box marginRight={'30px'}>
          <GroupAvatarStack
            style={{paddingRight: 10}}
            addresses={addresses ?? []}
          />
        </Box>
        <VStack flex={1} justifyContent={'flex-end'}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            typography="text-base/bold">
            {groupName}
          </Text>
          {!isLoading && (
            <Text numberOfLines={1} typography="text-sm/regular">
              {display}
            </Text>
          )}
        </VStack>
        {lastMessageTime && (
          <Text
            alignSelf={'flex-start'}
            typography="text-xs/regular"
            style={{textAlignVertical: 'top'}}>
            {getMessageTimeDisplay(lastMessageTime)}
          </Text>
        )}
      </HStack>
    </Pressable>
  );
};
