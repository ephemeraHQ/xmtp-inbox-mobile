import {
  Avatar,
  Box,
  HStack,
  Input,
  Pressable,
  SectionList,
  VStack,
} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {SectionListRenderItem} from 'react-native';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useClient} from '../hooks/useClient';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';

interface Contact {
  address: string;
}

const useData = () => {
  const {client} = useClient();
  const contactsTest = client?.contacts;
  const recents: Contact[] = [
    {
      address: '0x1234567890123456789012345678901234567890',
    },
    {
      address: '0x1234567890123456789012345678901234567891',
    },
    {
      address: '0x1234567890123456789012345678901234567899',
    },
  ];
  useEffect(() => {
    const test = async () => {
      const list = await contactsTest?.consentList();
      const contactList: string[] = [];
      console.log('here1114 list', list);
      list?.forEach(async item => {
        console.log('here1114 item', item);
        if (item.permissionType === 'allowed') {
          contactList.push(item.value);
        }
      });
    };
    test();
  }, [contactsTest]);

  const contacts: Contact[] = [
    {
      address: '0x1234567890123456789012345678901234567898',
      avatar: 'https://i.pravatar.cc/300',
      isConnected: false,
    },
    {
      address: '0x1234567890123456789012345678901234567897',
      avatar: 'https://i.pravatar.cc/300',
      isConnected: false,
    },
  ];

  return {
    recents,
    contacts,
  };
};

export const NewMessageScreen = () => {
  const {goBack, navigate} = useTypedNavigation();
  const [searchText, setSearchText] = useState('');

  const {recents, contacts} = useData();

  const items = useMemo(() => {
    const {filtered: filteredRecents, mapping: recentMapping} = recents.reduce<{
      filtered: Contact[];
      mapping: Set<string>;
    }>(
      ({filtered, mapping}, curr) => {
        if (
          curr.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          curr.address.toLowerCase().includes(searchText.toLowerCase())
        ) {
          filtered.push(curr);
          mapping.add(curr.address);
        }
        return {
          filtered,
          mapping,
        };
      },
      {
        filtered: [],
        mapping: new Set(),
      },
    );

    const filteredContacts = contacts.filter(
      contact =>
        !recentMapping.has(contact.address) &&
        (contact.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          contact.address.toLowerCase().includes(searchText.toLowerCase())),
    );

    return [
      {
        title: translate('recents'),
        data: filteredRecents,
      },
      {
        title: translate('contacts'),
        data: filteredContacts,
      },
    ];
  }, [recents, contacts, searchText]);

  const renderItem: SectionListRenderItem<Contact, {title: string}> = ({
    item,
    index,
    section,
  }) => {
    const isTop = index === 0;
    const isBottom = index === section.data.length - 1;
    const handleNavigation = () => {
      goBack();
      navigate(ScreenNames.Conversation, {topic: item.address});
    };
    return (
      <Pressable onPress={handleNavigation}>
        <HStack
          alignItems={'center'}
          marginX={'16px'}
          paddingX={'12px'}
          paddingY={'12px'}
          borderTopRadius={isTop ? '16px' : undefined}
          borderBottomRadius={isBottom ? '16px' : undefined}
          backgroundColor={colors.backgroundTertiary}
          flexDirection={'row'}>
          <Avatar source={{uri: item.avatar}} size={'48px'} />
          <VStack flex={1}>
            <Text typography="text-title/bold" paddingLeft={'16px'}>
              {item.name ?? formatAddress(item.address)}
            </Text>
            <Text
              color={colors.textSecondary}
              typography="text-sm/mono medium"
              paddingLeft={'16px'}>
              {formatAddress(item.address)}
            </Text>
          </VStack>
          {item.isConnected ? <Icon name={'check-thick'} size={24} /> : null}
        </HStack>
      </Pressable>
    );
  };

  return (
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
      <Input
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
        backgroundColor={colors.backgroundTertiary}
        value={searchText}
        onChangeText={setSearchText}
        marginX={'16px'}
        paddingY={'12px'}
        paddingX={'8px'}
      />
      <SectionList
        w={'100%'}
        sections={items}
        keyExtractor={item => item.address}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({section}) => {
          if (section.data.length === 0) {
            return null;
          }
          return (
            <Text
              typography="text-sm/semibold"
              paddingX={'32px'}
              paddingTop={'24px'}
              paddingBottom={'8px'}
              color={colors.textTertiary}>
              {section.title}
            </Text>
          );
        }}
      />
    </Screen>
  );
};
