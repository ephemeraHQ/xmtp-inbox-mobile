import Clipboard from '@react-native-clipboard/clipboard';
import {useFocusEffect} from '@react-navigation/native';
import {Box, FlatList, HStack, SectionList, Switch, VStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AppState,
  ListRenderItem,
  Platform,
  Pressable,
  SectionListRenderItem,
  StyleSheet,
} from 'react-native';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
} from 'react-native-permissions';
import {AvatarWithFallback} from '../components/AvatarWithFallback';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Icon, IconName} from '../components/common/Icon';
import {Pill} from '../components/common/Pill';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {AppConfig} from '../consts/AppConfig';
import {useClientContext} from '../context/ClientContext';
import {useWalletContext} from '../context/WalletContext';
import {useAddress} from '../hooks/useAddress';
import {useContactInfo} from '../hooks/useContactInfo';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {encryptedStorage} from '../services/encryptedStorage';
import {mmkvStorage} from '../services/mmkvStorage';
import {colors, greens, reds} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';
import {cancelStreamAllMessages} from '../utils/streamAllMessages';

interface Address {
  display: string;
  type: 'ETH' | 'ENS' | 'LENS';
}

interface Wallet {
  name: string;
  address: string;
  image: string;
  isSelected: boolean;
}

const useData = () => {
  const {address} = useAddress();
  const {displayName: ens, avatarUrl} = useContactInfo(address);
  const addresses: Address[] = [
    {
      display: address ? formatAddress(address) : '',
      type: 'ETH',
    },
  ];
  if (ens) {
    addresses.push({
      display: ens ?? '',
      type: 'ENS',
    });
    if (address) {
      mmkvStorage.saveEnsName(address, ens);
      if (avatarUrl && address) {
        mmkvStorage.saveEnsAvatar(address, avatarUrl);
      }
    }
  }

  if (AppConfig.LENS_ENABLED) {
    addresses.push({
      display: 'lens.eth',
      type: 'LENS',
    });
  }

  const wallets: Wallet[] = [
    {
      name: 'matt.galligan.eth',
      address: '0x44e...84410',
      isSelected: true,
      image: 'https://picsum.photos/200',
    },
    {
      name: 'nftcollector.eth',
      address: '0x29a...2ccAc',
      isSelected: false,
      image: 'https://picsum.photos/300',
    },
  ];
  return {
    avatarUrl: mmkvStorage.getEnsAvatar(address ?? '') ?? avatarUrl,
    name: ens ?? (address ? formatAddress(address) : ''),
    addresses,
    wallets,
  };
};

const getIconName = (type: Address['type']): IconName => {
  switch (type) {
    case 'ETH':
      return 'ethereum';
    case 'ENS':
      return 'ens';
    case 'LENS':
      return 'lens';
  }
};

interface ListItem {
  text: string;
  value?: boolean;
  onPress: () => void;
}

type Section = 'TOGGLE' | 'DELETE';

export const AccountSettingsScreen = () => {
  const {navigate, goBack} = useTypedNavigation();
  const {client, setClient} = useClientContext();
  const {avatarUrl, addresses, wallets, name} = useData();
  const [walletsShown, setWalletsShown] = useState(false);
  const {wallet, setWallet} = useWalletContext();
  const {address} = useAddress();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const appState = useRef(AppState.currentState);

  const checkNotificationsCallback = useCallback(() => {
    checkNotifications().then(({status}) => {
      if (status === 'granted' || status === 'limited') {
        setNotificationsEnabled(true);
      }
    });
  }, [setNotificationsEnabled]);

  const toggleNotifications = useCallback(() => {
    if (notificationsEnabled) {
      openSettings();
    } else {
      requestNotifications(['alert', 'sound']).then(({status}) => {
        if (status === 'granted' || status === 'limited') {
          setNotificationsEnabled(true);
        } else {
          openSettings();
        }
      });
    }
  }, [notificationsEnabled]);

  useFocusEffect(checkNotificationsCallback);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkNotificationsCallback();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [checkNotificationsCallback]);

  const listItems = useMemo((): {section: Section; data: ListItem[]}[] => {
    return [
      {
        section: 'TOGGLE',
        data: [
          {
            text: translate('notifications'),
            onPress: toggleNotifications,
            value: notificationsEnabled,
          },
        ],
      },
      {
        section: 'DELETE',
        data: [
          {
            text: translate('clear_local_data'),
            onPress: () => {
              mmkvStorage.clearAll();
            },
          },
          {
            text: translate('disconnect_wallet'),
            onPress: async () => {
              if (!address) {
                return;
              }
              await encryptedStorage.clearClientKeys(address as `0x${string}`);
              setClient(null);
              cancelStreamAllMessages(client);
              wallet?.disconnect();
              setWallet(null);
              mmkvStorage.clearAll();
            },
          },
        ],
      },
    ];
  }, [
    address,
    client,
    notificationsEnabled,
    wallet,
    setClient,
    setWallet,
    toggleNotifications,
  ]);

  const renderItem: SectionListRenderItem<ListItem, {section: Section}> = ({
    section,
    item,
    index,
  }) => {
    const color = section.section === 'TOGGLE' ? greens[100] : reds[100];
    const isTop = index === 0;
    const isBottom = index === section.data.length - 1;

    return (
      <Pressable onPress={item.onPress}>
        <HStack
          space={[2, 3]}
          alignItems={'center'}
          paddingY={'8px'}
          paddingX={'12px'}
          marginX={'16px'}
          borderTopRadius={isTop ? '16px' : undefined}
          borderBottomRadius={isBottom ? '16px' : undefined}
          justifyContent={'space-between'}
          backgroundColor={colors.backgroundTertiary}>
          <Box
            marginRight={'12px'}
            paddingX={'4px'}
            paddingY={'6px'}
            borderRadius={'8px'}
            backgroundColor={color}>
            <Icon color={colors.actionPositive} name="gift" size={24} />
          </Box>
          <Text flex={1} textAlign={'left'}>
            {item.text}
          </Text>
          {typeof item.value === 'boolean' ? (
            <Switch
              isChecked={item.value}
              onToggle={item.onPress}
              colorScheme={color}
            />
          ) : (
            <Box />
          )}
        </HStack>
      </Pressable>
    );
  };

  const renderWalletModalItem: ListRenderItem<Wallet> = ({item}) => {
    const handleWalletChange = () => {};

    return (
      <Pressable onPress={handleWalletChange} key={item.address}>
        <HStack
          alignItems={'center'}
          flex={1}
          paddingY={'8px'}
          marginX={'16px'}
          space={[2, 3]}>
          <AvatarWithFallback
            style={styles.avatar}
            size={32}
            address={item.address}
            avatarUri={item.image}
          />
          <VStack flex={1} style={styles.nameContainer}>
            <Text typography="text-base/bold">{item.name}</Text>
            <Text typography="text-xs/mono medium" color={colors.textSecondary}>
              {item.address}
            </Text>
          </VStack>
          {item.isSelected ? (
            <Icon
              name={'check-circle'}
              size={24}
              color={colors.actionPositive}
            />
          ) : (
            <Box />
          )}
        </HStack>
      </Pressable>
    );
  };

  return (
    <>
      <Screen
        includeTopPadding={Platform.OS === 'android'}
        title={
          <Text typography="text-lg/heavy" textAlign={'center'}>
            {translate('you')}
          </Text>
        }
        left={
          <Pressable onPress={() => navigate(ScreenNames.QRCode)}>
            <Icon name="qr-code" />
          </Pressable>
        }
        right={
          <Pressable onPress={goBack}>
            <Icon name="x-circle" />
          </Pressable>
        }>
        <AvatarWithFallback
          size={80}
          avatarUri={avatarUrl}
          address={address ?? ''}
        />
        <Button
          onLongPress={() => Clipboard.setString(client?.address ?? '')}
          onPress={() => {
            if (AppConfig.MULTI_WALLET) {
              setWalletsShown(true);
            }
          }}
          _pressed={{backgroundColor: 'transparent'}}
          variant={'ghost'}
          rightIcon={
            <Icon
              name="chevron-down-thick"
              type="solid"
              size={22}
              color="#0F172A"
            />
          }>
          <Text typography="text-xl/bold">
            {__DEV__ ? client?.address : name}
          </Text>
        </Button>
        <HStack flexWrap={'wrap'} justifyContent={'center'}>
          {addresses.map(addressItem => (
            <Pill
              key={addressItem.display}
              size="sm"
              text={addressItem.display}
              leftIconName={getIconName(addressItem.type)}
            />
          ))}
        </HStack>
        <SectionList
          w={'100%'}
          keyExtractor={item => item.text}
          bounces={false}
          sections={listItems}
          renderItem={renderItem}
          renderSectionHeader={() => <Box paddingTop={'24px'} />}
        />
      </Screen>
      <Drawer
        title="Wallets"
        isOpen={walletsShown}
        onBackgroundPress={() => setWalletsShown(false)}>
        <FlatList
          w={'100%'}
          bounces={false}
          data={wallets}
          keyExtractor={item => item.address}
          ListFooterComponent={
            <VStack w={'100%'} alignItems={'flex-start'}>
              <Pressable>
                <HStack paddingX="12px" paddingY={'4px'} alignItems={'center'}>
                  <Box paddingX={'4px'} paddingY={'6px'} marginRight={'12px'}>
                    <Icon color={colors.actionPrimary} name="share" size={20} />
                  </Box>
                  <Text
                    typography="text-caption/regular"
                    color={colors.actionPrimary}>
                    Connect existing wallet
                  </Text>
                </HStack>
              </Pressable>
              <Pressable>
                <HStack paddingX="12px" paddingY={'4px'} alignItems={'center'}>
                  <Box paddingX={'4px'} paddingY={'6px'} marginRight={'12px'}>
                    <Icon
                      color={colors.actionPrimary}
                      name="plus-thick"
                      size={20}
                    />
                  </Box>
                  <Text
                    typography="text-caption/regular"
                    color={colors.actionPrimary}>
                    Create new wallet
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
          }
          renderItem={renderWalletModalItem}
        />
      </Drawer>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {marginRight: 16},
  nameContainer: {
    justifyContent: 'flex-start',
  },
});
