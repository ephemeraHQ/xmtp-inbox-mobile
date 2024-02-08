import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {Box, HStack, VStack} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {useGroupContactInfo} from '../hooks/useGroupContactInfo';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ScreenNames} from '../navigation/ScreenNames';
import {getMessageTimeDisplay} from '../utils/getMessageTimeDisplay';
import {GroupAvatarStack} from './GroupAvatarStack';
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
  const [addresses, setAddresses] = useState<string[]>([]);
  const {navigate} = useTypedNavigation();
  const {data, groupDisplayName} = useGroupContactInfo(addresses);
  useEffect(() => {
    group.memberAddresses().then(groupAddresses => {
      setAddresses(groupAddresses);
    });
  }, [group]);

  return (
    <Pressable
      onPress={() => {
        navigate(ScreenNames.Group, {
          id: group.id,
        });
      }}>
      <HStack space={[2, 3]} alignItems={'center'} w={'100%'} padding={'16px'}>
        <Box marginRight={'30px'}>
          <GroupAvatarStack style={{paddingRight: 30}} data={data} />
        </Box>
        <VStack flex={1} justifyContent={'flex-end'}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            typography="text-base/bold">
            {groupDisplayName}
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
