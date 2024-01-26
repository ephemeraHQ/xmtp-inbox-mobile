import {Box, HStack, Input, Pressable, SectionList, VStack} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {SectionListRenderItem} from 'react-native';
import {AvatarWithFallback} from '../components/AvatarWithFallback';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useClient} from '../hooks/useClient';
import {useContactInfo} from '../hooks/useContactInfo';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {getConsent} from '../services/mmkvStorage';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';

interface Contact {
  address: string;
  isConnected?: boolean;
  topic?: string;
}

const useData = () => {
  const {client} = useClient();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [recents, setRecents] = useState<Contact[]>([]);

  useEffect(() => {
    if (client?.conversations) {
      client?.conversations?.list().then(list => {
        const recentConvos = list.slice(0, 3).map(it => {
          return {
            address: it.peerAddress,
            isConnected: getConsent(it.clientAddress, it.peerAddress),
            topic: it.topic,
          };
        });
        setRecents(recentConvos);
      });
    }
  }, [client?.conversations]);

  useEffect(() => {
    const fetchConsentList = async () => {
      const list = await client?.contacts?.consentList();
      const convos = await client?.conversations?.list();
      const convoMap = new Map<string, string>();
      convos?.forEach(item => {
        convoMap.set(item.peerAddress, item.topic);
      });
      const contactList: Contact[] = [];
      list?.forEach(async item => {
        if (item.permissionType === 'allowed') {
          contactList.push({
            address: item.value,
            isConnected: true,
            topic: convoMap.get(item.value),
          });
        }
      });
      setContacts(contactList);
    };
    fetchConsentList();
  }, [client?.contacts, client?.conversations]);

  return {
    recents,
    contacts,
  };
};

const ListItem: SectionListRenderItem<Contact, {title: string}> = ({
  item,
  index,
  section,
}) => {
  const {avatarUrl, displayName} = useContactInfo(item.address);
  const {goBack, navigate} = useTypedNavigation();
  const isTop = index === 0;
  const isBottom = index === section.data.length - 1;
  const handleNavigation = () => {
    goBack();
    if (item.isConnected && item.topic) {
      navigate(ScreenNames.Conversation, {topic: item.topic});
    } else {
      navigate(ScreenNames.NewConversation, {address: item.address});
    }
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
        <AvatarWithFallback
          address={item.address}
          avatarUri={avatarUrl}
          size={48}
        />
        <VStack flex={1}>
          <Text typography="text-title/bold" paddingLeft={'16px'}>
            {displayName ?? formatAddress(item.address)}
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

export const SearchScreen = () => {
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
          // curr.name?.toLowerCase().includes(searchText.toLowerCase()) ||
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
        // contact.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.address.toLowerCase().includes(searchText.toLowerCase()),
    );

    return [
      {
        title: '',
        data: searchText
          ? [
              {
                address: searchText,
              },
            ]
          : [],
      },
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
        renderItem={ListItem}
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
