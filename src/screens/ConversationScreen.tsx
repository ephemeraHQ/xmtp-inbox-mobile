import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';
import {useRoute} from '@react-navigation/native';
import {DecodedMessage} from '@xmtp/react-native-sdk';
import {
  Avatar,
  Box,
  Container,
  FlatList,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {ListRenderItem, Platform, StyleSheet, TextInput} from 'react-native';
import {Icon} from '../components/common/Icon';
import {Text} from '../components/common/Text';
import {useClient} from '../hooks/useClient';
import {useConversation} from '../hooks/useConversation';
import {useConversationMessages} from '../hooks/useConversationMessages';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';
// import {Lookui} from '@thirdweb-dev/react-native';
import {
  getChainProvider,
  shortenAddress,
  useSupportedChains,
  useWalletContext,
} from '@thirdweb-dev/react-native';
import {ethers} from 'ethers';

const getTimestamp = (timestamp: number) => {
  // If today, return hours and minutes if not return date
  const date = new Date(timestamp);
  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  return date.toLocaleDateString();
};

const useEnsInfo = (address: string) => {
  const [info, setInfo] = useState<{
    ens?: string | null;
    avatarUrl?: string | null;
  }>({
    ens: null,
    avatarUrl: null,
  });

  const supportedChains = useSupportedChains();
  const {clientId} = useWalletContext();

  useEffect(() => {
    const fetchInfo = async () => {
      const ethereum = supportedChains.find(chain => chain.chainId === 1);
      const provider = getChainProvider(1, {
        clientId,
        supportedChains: ethereum
          ? [
              {
                chainId: 1,
                rpc: [...ethereum.rpc],
                nativeCurrency: ethereum.nativeCurrency,
                slug: ethereum.slug,
              },
            ]
          : undefined,
      });
      if (provider instanceof ethers.providers.JsonRpcProvider) {
        console.log('here1117');
        const [ens, avatarUrl] = await Promise.all([
          provider.lookupAddress(address),
          provider.getAvatar(address),
        ]);
        console.log('here1117 ens', address, avatarUrl);
        setInfo({
          ens,
          avatarUrl,
        });
      } else {
        console.log('here1116');
        const ens = await provider.lookupAddress(address);
        console.log('here1116 ens', ens);
        setInfo({
          ens,
          avatarUrl: null,
        });
      }
    };
    if (address && clientId) {
      fetchInfo();
    }
  }, [address, clientId, supportedChains]);

  return info;
};

const useData = (topic: string) => {
  const {messages} = useConversationMessages(topic);
  const {client} = useClient();
  const {conversation} = useConversation(topic);
  const {ens, avatarUrl} = useEnsInfo(conversation?.peerAddress || '');

  return {
    profileImage: avatarUrl,
    name: ens ?? shortenAddress(conversation?.peerAddress || ''),
    address: conversation?.peerAddress,
    myAddress: client?.address,
    messages,
    conversation,
  };
};

export const ConversationScreen = () => {
  const {params} = useRoute();
  const {topic} = params as {topic: string};
  const {profileImage, name, myAddress, messages, address, conversation} =
    useData(topic);
  const {goBack} = useTypedNavigation();

  const [text, setText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(`CONVERSATION_TEXT_${topic}`).then(draft => {
      if (draft) {
        setText(draft);
      }
    });
  }, [topic]);

  const updateText = useCallback(
    (newText: string) => {
      AsyncStorage.setItem(`CONVERSATION_TEXT_${topic}`, newText);
      setText(newText);
    },
    [topic],
  );

  const sendMessage = useCallback(() => {
    if (text) {
      updateText('');
      conversation?.send(text);
    }
  }, [text, updateText, conversation]);

  const renderItem: ListRenderItem<DecodedMessage<unknown>> = ({item}) => {
    const isMe = item.senderAddress === myAddress;
    return (
      <Box marginLeft={6} marginRight={6} marginY={2} flexShrink={1}>
        <VStack>
          <Container
            backgroundColor={
              isMe ? colors.actionPrimary : colors.backgroundSecondary
            }
            alignSelf={isMe ? 'flex-end' : 'flex-start'}
            borderRadius={'16px'}
            borderBottomRightRadius={isMe ? 0 : '16px'}
            borderTopLeftRadius={isMe ? '16px' : 0}
            paddingY={3}
            paddingX={5}>
            <Text
              typography="text-base/medium"
              // flexShrink={1}
              color={isMe ? colors.actionPrimaryText : colors.textPrimary}>
              {item.content() as string}
            </Text>
          </Container>
          <Text
            flexShrink={1}
            color={colors.primaryN200}
            typography="text-xs/semi-bold"
            alignSelf={isMe ? 'flex-end' : 'flex-start'}>
            {getTimestamp(item.sent)}
          </Text>
        </VStack>
      </Box>
    );
  };

  return (
    <Box backgroundColor={colors.backgroundPrimary}>
      <BlurView style={styles.blur} blurType="light" blurAmount={5}>
        <Box width="100%">
          <HStack
            w={'100%'}
            alignItems={'center'}
            paddingLeft={3}
            paddingRight={4}>
            <Pressable onPress={goBack}>
              <Icon name="chevron-left-thick" size={24} />
            </Pressable>

            <VStack flex={1} paddingLeft={2}>
              <Text typography="text-lg/heavy">{name}</Text>
              <HStack alignItems={'center'}>
                <Icon name="ethereum" size={16} />
                <Text
                  typography="text-xs/mono medium"
                  color={colors.textSecondary}>
                  {address ? formatAddress(address) : ''}
                </Text>
              </HStack>
            </VStack>
            <Avatar
              source={profileImage ? {uri: profileImage} : undefined}
              marginLeft={2}
              size={'40px'}
            />
          </HStack>
        </Box>
      </BlurView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        height={'100%'}
        w="100%">
        <Box height={'90%'}>
          <FlatList
            inverted
            height={'100%'}
            data={messages}
            renderItem={renderItem}
            ListFooterComponent={<Box height={'120px'} />}
          />
        </Box>
        <HStack
          marginBottom={'60px'}
          borderColor={colors.actionPrimary}
          borderWidth={2}
          paddingLeft={4}
          marginX={2}
          paddingY={2}
          bottom={0}
          borderRadius={24}
          borderBottomRightRadius={0}>
          <TextInput
            value={text}
            style={styles.input}
            onChangeText={updateText}
          />
          <Pressable onPress={sendMessage}>
            <Box
              marginRight={2}
              backgroundColor={colors.actionPrimary}
              borderRadius={32}
              height={'30px'}
              width={'30px'}
              justifyContent={'center'}
              alignItems={'center'}
              borderBottomRightRadius={0}>
              <Icon
                name="arrow-small-up-thick"
                size={24}
                color={colors.actionPrimaryText}
              />
            </Box>
          </Pressable>
        </HStack>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'SF Pro Rounded',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 23,
    letterSpacing: 0.5,
    flex: 1,
  },
  blur: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    elevation: 200,
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    paddingBottom: 8,
  },
});
