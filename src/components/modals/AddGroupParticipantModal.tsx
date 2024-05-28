import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {Box, FlatList, HStack, Input, Pressable, VStack} from 'native-base';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {
  Alert,
  DeviceEventEmitter,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import {EventEmitterEvents} from '../../consts/EventEmitters';
import {TestIds} from '../../consts/TestIds';
import {useContactInfo} from '../../hooks/useContactInfo';
import {useContacts} from '../../hooks/useContacts';
import {translate} from '../../i18n';
import {colors} from '../../theme/colors';
import {formatAddress} from '../../utils/formatAddress';
import {AvatarWithFallback} from '../AvatarWithFallback';
import {Button} from '../common/Button';
import {Icon} from '../common/Icon';
import {Modal} from '../common/Modal';
import {Text} from '../common/Text';

export interface GroupInfoModalProps {
  shown: boolean;
  hide: () => void;
  group: Group<any>;
}

const ListItem: FC<{
  address: string;
  onPress: (address: string) => void;
  index: number;
}> = ({address, onPress}) => {
  const {avatarUrl, displayName} = useContactInfo(address);
  const handlePress = () => {
    onPress(address);
  };
  return (
    <Pressable
      onPress={handlePress}
      testID={`${TestIds.SEARCH_RESULT}_${address}`}>
      <HStack
        alignItems={'center'}
        marginX={'16px'}
        paddingX={'12px'}
        paddingY={'12px'}
        flexDirection={'row'}>
        <AvatarWithFallback address={address} avatarUri={avatarUrl} size={48} />
        <VStack flex={1}>
          <Text typography="text-title/bold" paddingLeft={'16px'}>
            {displayName ?? formatAddress(address)}
          </Text>
          <Text
            color={colors.textSecondary}
            typography="text-sm/mono medium"
            paddingLeft={'16px'}>
            {formatAddress(address)}
          </Text>
        </VStack>
        {/* {item.isConnected ? <Icon name={'check-thick'} size={24} /> : null} */}
      </HStack>
    </Pressable>
  );
};

export const AddGroupParticipantModal: FC<GroupInfoModalProps> = ({
  hide,
  shown,
  group,
}) => {
  const {height} = useWindowDimensions();
  const [searchText, setSearchText] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const contacts = useContacts();

  const onAdd = useCallback(async () => {
    try {
      await group.addMembers(participants);
      DeviceEventEmitter.emit(
        `${EventEmitterEvents.GROUP_CHANGED}_${group.topic}`,
      );
      hide();
    } catch (err: any) {
      Alert.alert(translate('error_group_adding'), err?.message);
      console.error(err);
    }
  }, [participants, group, hide]);

  const onItemPress = useCallback(
    (address: string) => {
      if (participants.includes(address)) {
        return setParticipants(prev => prev.filter(it => it !== address));
      }
      setParticipants([...participants, address]);
    },
    [participants],
  );

  const renderItem: ListRenderItem<{address: string; name: string}> = ({
    item,
    index,
  }) => {
    return (
      <ListItem onPress={onItemPress} address={item.address} index={index} />
    );
  };

  const items = useMemo(() => {
    const filteredContacts = contacts.filter(contact =>
      contact.address.toLowerCase().includes(searchText.toLowerCase()),
    );

    return [
      ...(searchText
        ? [
            {
              name: formatAddress(searchText),
              address: searchText,
            },
          ]
        : []),
      ...filteredContacts,
    ];
  }, [contacts, searchText]);

  return (
    <Modal onBackgroundPress={hide} isOpen={shown}>
      <VStack
        alignItems={'center'}
        justifyContent={'center'}
        height={height / 2}>
        <Input
          testID={TestIds.SEARCH_INPUT}
          variant={'unstyled'}
          leftElement={
            <Box paddingLeft={'8px'}>
              <Icon
                name="magnifying-glass"
                color={colors.textSecondary}
                type="outline"
              />
            </Box>
          }
          rightElement={
            searchText ? (
              <Pressable onPress={() => setSearchText('')}>
                <Icon
                  name="x-circle"
                  color={colors.textSecondary}
                  type="outline"
                />
              </Pressable>
            ) : undefined
          }
          backgroundColor={colors.backgroundTertiary}
          value={searchText}
          onChangeText={setSearchText}
          marginX={'16px'}
          paddingY={'12px'}
          paddingX={'8px'}
        />
        <FlatList width={'100%'} data={items} renderItem={renderItem} />
        {participants.length > 0 && (
          <Button onPress={onAdd}>
            <Text
              typography="text-base/medium"
              color={colors.backgroundPrimary}>
              {translate('add_to_group')}
            </Text>
          </Button>
        )}
      </VStack>
    </Modal>
  );
};
