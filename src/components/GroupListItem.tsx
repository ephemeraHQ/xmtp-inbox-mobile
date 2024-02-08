import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {HStack, VStack} from 'native-base';
import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ScreenNames} from '../navigation/ScreenNames';
import {getMessageTimeDisplay} from '../utils/getMessageTimeDisplay';
import {Text} from './common/Text';

interface GroupListItemProps {
  group: Group<any>;
  display: string;
  lastMessageTime: number;
}

export const GroupListItem: FC<GroupListItemProps> = ({
  group,
  display,
  lastMessageTime,
}) => {
  const {navigate} = useTypedNavigation();

  return (
    <Pressable
      onPress={() => {
        navigate(ScreenNames.Group, {
          id: group.id,
        });
      }}>
      <HStack space={[2, 3]} alignItems={'center'} w={'100%'} padding={'16px'}>
        <VStack flex={1} justifyContent={'flex-end'}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            typography="text-base/bold">
            {group.id}
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
