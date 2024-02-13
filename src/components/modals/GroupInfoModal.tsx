import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {HStack, Pressable, VStack} from 'native-base';
import React, {FC, useCallback} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {AppConfig} from '../../consts/AppConfig';
import {EventEmitterEvents} from '../../consts/EventEmitters';
import {useContactInfo} from '../../hooks/useContactInfo';
import {translate} from '../../i18n';
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
  group: Group<any>;
}

const GroupParticipant: React.FC<{
  address: string;
  onRemove: (address: string) => void;
}> = ({address, onRemove}) => {
  const {displayName, avatarUrl} = useContactInfo(address);
  return (
    <VStack
      alignItems={'center'}
      justifyContent={'center'}
      marginY={AppConfig.LENS_ENABLED ? 0 : 2}>
      <HStack alignItems={'center'}>
        <Text typography="text-xl/bold" textAlign={'center'}>
          {displayName}
        </Text>
        <AvatarWithFallback
          style={{marginLeft: 10}}
          size={40}
          address={address}
          avatarUri={avatarUrl}
        />
        <Pressable marginLeft={'10px'} onPress={() => onRemove(address)}>
          <Icon name={'trash'} type={'mini'} color={colors.actionPrimary} />
        </Pressable>
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
}) => {
  const onRemovePress = useCallback(
    async (address: string) => {
      await group.removeMembers([address]);
      DeviceEventEmitter.emit(
        `${EventEmitterEvents.GROUP_CHANGED}_${group.id}`,
      );
      hide();
    },
    [group, hide],
  );

  return (
    <Modal onBackgroundPress={hide} isOpen={shown}>
      <VStack alignItems={'center'} justifyContent={'center'}>
        <HStack w={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Text typography="text-title/bold" textAlign={'center'}>
            {translate('group')}
          </Text>
          <Pressable onPress={onPlusPress} alignSelf={'flex-end'}>
            <Icon
              name={'plus-circle'}
              type={'mini'}
              color={colors.actionPrimary}
              style={{marginLeft: 8}}
            />
          </Pressable>
        </HStack>
        {addresses?.map(address => (
          <GroupParticipant
            key={address}
            address={address}
            onRemove={onRemovePress}
          />
        ))}
      </VStack>
    </Modal>
  );
};
