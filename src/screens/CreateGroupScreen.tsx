import {Box, HStack, Input, Pressable, SectionList, VStack} from 'native-base';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {SectionListRenderItem} from 'react-native';
import {getAddress, isAddress} from 'viem';
import {AvatarWithFallback} from '../components/AvatarWithFallback';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {TestIds} from '../consts/TestIds';
import {useClient} from '../hooks/useClient';
import {useContactInfo} from '../hooks/useContactInfo';
import {useEnsAddress} from '../hooks/useEnsAddress';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {mmkvStorage} from '../services/mmkvStorage';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';

interface Contact {
  displayName: string;
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
            displayName:
              mmkvStorage.getEnsName(it.peerAddress) ??
              formatAddress(it.peerAddress),
            address: it.peerAddress,
            isConnected: mmkvStorage.getConsent(
              it.clientAddress,
              it.peerAddress,
            ),
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
            displayName:
              mmkvStorage.getEnsName(item.value) ??
              formatAddress(getAddress(item.value)),
            address: getAddress(item.value),
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

const VerticalListItem: FC<{item: Contact; index: number; section: any}> = ({
  item,
  index,
  section,
}) => {
  const {avatarUrl, displayName} = useContactInfo(item.address);
  const handlePress = () => section.onPress(item);

  return (
    <Pressable
      onPress={handlePress}
      testID={`${TestIds.SEARCH_RESULT}_${item.address}`}>
      <HStack
        alignItems="center"
        marginX="16px"
        paddingX="12px"
        paddingY="12px"
        borderTopRadius={index === 0 ? '16px' : undefined}
        borderBottomRadius={
          index === section.data.length - 1 ? '16px' : undefined
        }
        backgroundColor={colors.backgroundTertiary}
        flexDirection="row">
        <AvatarWithFallback
          address={item.address}
          avatarUri={avatarUrl}
          size={48}
        />
        <VStack flex={1} alignItems="flex-start">
          <Text
            typography="text-title/bold"
            color={colors.textSecondary}
            paddingLeft="16px">
            {displayName ?? formatAddress(item.address)}
          </Text>
          <Text
            color={colors.textSecondary}
            typography="text-sm/mono medium"
            paddingLeft="16px">
            {formatAddress(item.address)}
          </Text>
        </VStack>
        {item.isConnected ? <Icon name="check-thick" size={24} /> : null}
      </HStack>
    </Pressable>
  );
};

const HorizontalListItem: FC<{item: Contact; index: number; section: any}> = ({
  item,
  index,
  section,
}) => {
  const {avatarUrl, displayName} = useContactInfo(item.address);
  const handlePress = () => section.onPress(item);
  return (
    <Pressable
      onPress={handlePress}
      testID={`${TestIds.SEARCH_RESULT}_${item.address}`}>
      <VStack
        alignItems="center"
        paddingX="12px"
        paddingY="12px"
        borderTopRadius={index === 0 ? '16px' : undefined}
        borderBottomRadius={
          index === section.data.length - 1 ? '16px' : undefined
        }
        backgroundColor={'transparent'}
        flexDirection="column">
        <AvatarWithFallback
          address={item.address}
          avatarUri={avatarUrl}
          size={48}
        />
        <Text typography="text-xs/regular" color={colors.textSecondary}>
          {displayName ?? formatAddress(item.address)}
        </Text>
        {item.isConnected ? <Icon name="check-thick" size={24} /> : null}
      </VStack>
    </Pressable>
  );
};

const ListItem: FC<{
  item: Contact;
  section: {
    title: string;
    onPress: (item: Contact) => void;
    data: readonly Contact[];
  };
  index: number;
  horizontal?: boolean;
}> = ({item, index, section, horizontal}) => {
  return horizontal ? (
    <HorizontalListItem item={item} index={index} section={section} />
  ) : (
    <VerticalListItem item={item} index={index} section={section} />
  );
};

export const CreateGroupScreen = () => {
  const {goBack, navigate} = useTypedNavigation();
  const {client} = useClient();
  const [errorString, setErrorString] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [participants, setParticipants] = useState<Contact[]>([]);

  const {recents, contacts} = useData();
  const onItemPress = useCallback(
    (item: Contact) => {
      setParticipants(prev => [...prev, item]);
    },
    [setParticipants],
  );

  const onGroupStart = useCallback(async () => {
    setErrorString(null);

    const participantAddresses = participants.map(
      participant => participant.address,
    );
    const canMessage = await client?.canGroupMessage(participantAddresses);
    for (const address of participantAddresses) {
      if (!canMessage?.[address.toLowerCase()]) {
        setErrorString(translate('not_on_xmtp_group'));
        return;
      }
    }
    goBack();
    navigate(ScreenNames.NewConversation, {addresses: participantAddresses});
  }, [participants, navigate, goBack, client]);
  const {data: ensAddress} = useEnsAddress(searchText);
  const isValidAddress = useMemo(() => isAddress(searchText), [searchText]);

  const items = useMemo(() => {
    const {filtered: filteredRecents, mapping: recentMapping} = recents.reduce<{
      filtered: Contact[];
      mapping: Set<string>;
    }>(
      ({filtered, mapping}, curr) => {
        if (curr.address.toLowerCase().includes(searchText.toLowerCase())) {
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
        contact.address.toLowerCase().includes(searchText.toLowerCase()),
    );

    const searchData = [];
    if (isValidAddress) {
      searchData.push({
        displayName: formatAddress(searchText),
        address: searchText,
      });
    }
    if (ensAddress) {
      searchData.push({
        displayName: searchText,
        address: ensAddress,
      });
    }

    return [
      {
        title: '',
        data: searchData,
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
  }, [recents, contacts, isValidAddress, ensAddress, searchText]);

  const renderItem =
    ({horizontal = false}: {horizontal?: boolean} = {}): SectionListRenderItem<
      Contact,
      {title: string; data: Contact[]}
    > =>
    ({item, section, index, ...rest}) => {
      return (
        <ListItem
          {...rest}
          item={item}
          index={index}
          section={{
            ...section,
            onPress: onItemPress,
          }}
          horizontal={horizontal}
        />
      );
    };

  return (
    <Screen
      testId={TestIds.SEARCH_SCREEN}
      title={
        <Text typography="text-sm/heavy" textAlign={'center'}>
          {translate('add_members_to_group')}
        </Text>
      }
      includeTopPadding={false}
      left={
        <Pressable onPress={goBack}>
          <Text typography="text-sm/semibold" textAlign={'left'}>
            {translate('cancel')}
          </Text>
        </Pressable>
      }
      right={
        <Pressable onPress={onGroupStart} disabled={!(participants.length > 0)}>
          <Text
            typography={
              participants.length > 0 ? 'text-sm/semibold' : 'text-sm/regular'
            }
            textAlign={'right'}>
            {translate('create_group')}
          </Text>
        </Pressable>
      }>
      <Input
        testID={TestIds.SEARCH_INPUT}
        variant={'unstyled'}
        autoCapitalize="none"
        autoCorrect={false}
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
        defaultValue={searchText}
        onChangeText={setSearchText}
        marginX={'16px'}
        paddingY={'12px'}
        paddingX={'8px'}
      />
      {isValidAddress && (
        <HStack paddingX={'16px'} paddingTop={'16px'} w="100%">
          <Icon name="check-circle" color={colors.actionPositive} size={17} />
          <Text
            paddingLeft={'8px'}
            color={colors.actionPositive}
            typography="text-xs/semi-bold">
            {translate('valid_address')}
          </Text>
        </HStack>
      )}
      {errorString && (
        <HStack paddingX={'16px'} paddingTop={'16px'} w="100%">
          <Icon name="x-circle" color={colors.actionNegative} size={17} />
          <Text
            paddingLeft={'8px'}
            color={colors.actionNegative}
            typography="text-xs/semi-bold">
            {errorString}
          </Text>
        </HStack>
      )}
      <VStack paddingX={'16px'} paddingTop={'16px'} w="100%">
        <SectionList
          w={'100%'}
          horizontal={true}
          sections={[{title: '', data: participants}]}
          renderItem={renderItem({horizontal: true})}
        />
      </VStack>
      <SectionList
        w={'100%'}
        sections={items}
        keyExtractor={item => item.address}
        renderItem={renderItem()}
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
