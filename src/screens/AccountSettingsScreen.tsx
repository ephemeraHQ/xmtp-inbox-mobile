import {
  useAddress,
  useDisconnect,
  useENS,
  useWallet,
  useWallets,
} from '@thirdweb-dev/react-native';
import {} from 'ethers';
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  SectionList,
  Switch,
  VStack,
} from 'native-base';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Linking,
  ListRenderItem,
  Pressable,
  SectionListRenderItem,
} from 'react-native';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Icon, IconName} from '../components/common/Icon';
import {Pill} from '../components/common/Pill';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {blues, colors, greens, reds} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';

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
  const address = useAddress();
  const walletsssd = useWallets();
  const wallet = useWallet();
  const {data} = useENS();
  // const;
  const {ens, avatarUrl} = data ?? {};
  console.log('here1116 walletsssd', walletsssd);
  if (!wallet) {
    throw new Error('Wallet not found');
  }

  console.log('here111 meta', wallet.getMeta());
  console.log('here111 meta', wallet.getSigner());
  // console.log('here111 meta', wallet.());
  console.log('here111 meta', wallet.getMeta());

  const addresses: Address[] = [
    {
      display: address ? formatAddress(address) : '',
      type: 'ETH',
    },
    {
      display: ens ?? '',
      type: 'ENS',
    },
    {
      display: 'matt.galligan.lens',
      type: 'LENS',
    },
  ];

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
    avatarUrl,
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

type Section = 'TOGGLE' | 'CONTACT' | 'DELETE';

export const AccountSettingsScreen = () => {
  const {navigate, goBack} = useTypedNavigation();
  const {avatarUrl, addresses, wallets, name} = useData();
  const [walletsShown, setWalletsShown] = useState(false);
  const disconnect = useDisconnect();
  const walletInstance = useWallet();

  console.log('here1116 walletInstance', walletInstance);

  const toggleShowCollectibles = useCallback(() => {
    return null;
  }, []);

  const toggleNotifications = useCallback(() => {
    return null;
  }, []);

  const handleLink = useCallback((url: string) => {
    return Linking.openURL(url);
  }, []);

  const listItems = useMemo((): {section: Section; data: ListItem[]}[] => {
    return [
      {
        section: 'TOGGLE',
        data: [
          {
            text: translate('show_collectibles_publicly'),
            onPress: toggleShowCollectibles,
            value: false,
          },
          {
            text: translate('notifications'),
            onPress: toggleNotifications,
            value: true,
          },
        ],
      },
      {
        section: 'CONTACT',
        data: [
          {
            text: translate('privacy'),
            onPress: () => handleLink('https://www.google.com'),
          },
          {
            text: translate('support'),
            onPress: () => handleLink('https://www.google.com'),
          },
        ],
      },
      {
        section: 'DELETE',
        data: [
          {
            text: translate('clear_local_data'),
            onPress: () => handleLink('https://www.google.com'),
          },
          {
            text: translate('disconnect_wallet'),
            onPress: () => {
              // handleLink('https://www.google.com')
              disconnect()
                .then(() => {
                  console.log('here1116 disconnected');
                })
                .catch(err => {
                  console.log('here1116 err', err);
                });
            },
          },
        ],
      },
    ];
  }, [toggleShowCollectibles, toggleNotifications, handleLink, disconnect]);

  const renderItem: SectionListRenderItem<ListItem, {section: Section}> = ({
    section,
    item,
    index,
  }) => {
    const color =
      section.section === 'TOGGLE'
        ? greens[100]
        : section.section === 'CONTACT'
        ? blues[100]
        : reds[100];
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
      <Pressable onPress={handleWalletChange}>
        <HStack
          alignItems={'center'}
          flex={1}
          paddingY={'8px'}
          marginX={'16px'}
          space={[2, 3]}>
          <Avatar
            marginRight={'16px'}
            width={'32px'}
            height={'32px'}
            source={{uri: item.image}}
          />
          <VStack flex={1} style={{justifyContent: 'flex-start'}}>
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
        <Avatar
          width={'80px'}
          height={'80px'}
          source={avatarUrl ? {uri: avatarUrl} : undefined}
        />
        <Button
          onPress={() => setWalletsShown(true)}
          variant={'ghost'}
          rightIcon={
            <Icon
              name="chevron-down-thick"
              type="solid"
              size={22}
              color="#0F172A"
            />
          }>
          <Text typography="text-xl/bold">{name}</Text>
        </Button>
        <HStack flexWrap={'wrap'} justifyContent={'center'}>
          {addresses.map(address => (
            <Pill
              size="sm"
              text={address.display}
              leftIconName={getIconName(address.type)}
            />
          ))}
        </HStack>
        <SectionList
          w={'100%'}
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
