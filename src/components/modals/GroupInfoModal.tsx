import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {HStack, Input, Pressable, VStack} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import {Alert, DeviceEventEmitter} from 'react-native';
import {AppConfig} from '../../consts/AppConfig';
import {SupportedContentTypes} from '../../consts/ContentTypes';
import {EventEmitterEvents} from '../../consts/EventEmitters';
import {useClient} from '../../hooks/useClient';
import {useContactInfo} from '../../hooks/useContactInfo';
import {translate} from '../../i18n';
import {mmkvStorage} from '../../services/mmkvStorage';
import {colors} from '../../theme/colors';
import {AvatarWithFallback} from '../AvatarWithFallback';
import {Button} from '../common/Button';
import {Icon} from '../common/Icon';
import {Modal} from '../common/Modal';
import {Text} from '../common/Text';

export interface GroupInfoModalProps {
  shown: boolean;
  hide: () => void;
  addresses: string[];
  onPlusPress: () => void;
  group?: Group<SupportedContentTypes>;
  address: string;
}

const GroupParticipant: React.FC<{
  address: string;
  onRemove: (address: string) => void;
  currentAddress: boolean;
}> = ({address, currentAddress, onRemove}) => {
  const {displayName, avatarUrl} = useContactInfo(address);
  return (
    <VStack
      alignItems={'center'}
      justifyContent={'center'}
      marginY={AppConfig.LENS_ENABLED ? 0 : 2}>
      <HStack alignItems={'center'}>
        <Text typography="text-title/bold" textAlign={'center'}>
          {displayName}
        </Text>
        <AvatarWithFallback
          style={{marginLeft: 10}}
          size={40}
          address={address}
          avatarUri={avatarUrl}
        />
        {!currentAddress && (
          <Pressable marginLeft={'10px'} onPress={() => onRemove(address)}>
            <Icon name={'trash'} type={'mini'} color={colors.actionPrimary} />
          </Pressable>
        )}
      </HStack>
      {AppConfig.LENS_ENABLED && (
        <>
          <Text typography="text-sm/bold">{translate('domain_origin')}</Text>
          <Button
            variant={'ghost'}
            rightIcon={
              <Icon
                name={'arrow-right'}
                type={'mini'}
                color={colors.actionPrimary}
              />
            }>
            <Text
              typography="text-base/bold"
              color={colors.actionPrimary}
              textAlign={'center'}>
              {'lenster.xyz'}
            </Text>
          </Button>
        </>
      )}
    </VStack>
  );
};

export const GroupInfoModal: FC<GroupInfoModalProps> = ({
  hide,
  shown,
  addresses,
  onPlusPress,
  group,
  address: currentAddress,
}) => {
  const {client} = useClient();
  const [editing, setEditing] = useState(false);
  const [groupName, setGroupName] = useState('');
  const onRemovePress = useCallback(
    async (address: string) => {
      try {
        await group?.removeMembers([address]);
        DeviceEventEmitter.emit(
          `${EventEmitterEvents.GROUP_CHANGED}_${group?.topic}`,
        );
        hide();
      } catch (err: any) {
        Alert.alert(translate('error_group_remove'), err?.message);
        console.error(err);
      }
    },
    [group, hide],
  );

  const onBlur = useCallback(() => {
    if (!groupName) {
      return;
    }
    mmkvStorage.saveGroupName(
      client?.address ?? '',
      group?.topic ?? '',
      groupName,
    );
    setEditing(false);
    setGroupName('');
  }, [client?.address, group?.topic, groupName]);

  return (
    <Modal onBackgroundPress={hide} isOpen={shown}>
      <VStack alignItems={'center'} justifyContent={'center'}>
        {editing ? (
          <Input
            value={groupName}
            onChangeText={setGroupName}
            onBlur={onBlur}
            autoFocus
            placeholder={translate('group_name')}
            rightElement={
              <Pressable onPress={onBlur}>
                <Icon
                  name={'check'}
                  type={'mini'}
                  color={colors.actionPrimary}
                />
              </Pressable>
            }
          />
        ) : (
          <HStack w={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Text typography="text-xl/bold" textAlign={'center'}>
              {(!!group &&
                mmkvStorage.getGroupName(
                  client?.address ?? '',
                  group?.topic,
                )) ??
                translate('group')}
            </Text>
            <Pressable onPress={() => setEditing(true)} alignSelf={'flex-end'}>
              <Icon
                name={'pencil-square'}
                type={'mini'}
                color={colors.actionPrimary}
                style={{marginLeft: 8}}
              />
            </Pressable>
          </HStack>
        )}
        {addresses?.map(address => (
          <GroupParticipant
            key={address}
            address={address}
            onRemove={onRemovePress}
            currentAddress={
              currentAddress.toLowerCase() === address.toLowerCase()
            }
          />
        ))}
        <Button onPress={onPlusPress} width={'200px'}>
          {translate('add_to_group')}
        </Button>
      </VStack>
    </Modal>
  );
};
