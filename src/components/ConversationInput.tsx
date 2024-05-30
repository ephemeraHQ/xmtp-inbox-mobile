import {DecodedMessage} from '@xmtp/react-native-sdk';
import {Box, HStack, Image, Pressable, VStack} from 'native-base';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Platform, StyleSheet, TextInput} from 'react-native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Icon} from '../components/common/Icon';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {translate} from '../i18n';
import {mmkvStorage} from '../services/mmkvStorage';
import {colors} from '../theme/colors';
import {getContentFromMessage} from '../utils/getContentFromMessage';
import {getSenderNameFromMessage} from '../utils/getSenderNameFromMessage';
import {Text} from './common/Text';

interface ConversationInputProps {
  sendMessage: (payload: {
    text?: string;
    asset?: Asset;
    replyId?: string;
  }) => void;
  currentAddress?: string;
  id?: string;
  replyMessage?: DecodedMessage<SupportedContentTypes>;
  clearReply?: () => void;
}

export const ConversationInput: FC<ConversationInputProps> = ({
  sendMessage,
  currentAddress,
  id,
  replyMessage,
  clearReply,
}) => {
  const [focused, setFocus] = useState<boolean>(false);
  const [text, setText] = useState<string>(
    currentAddress && id
      ? mmkvStorage.getDraftText(currentAddress, id) ?? ''
      : '',
  );
  const [asset, setAssetUri] = useState<Asset | null>();
  // currentAddress && topic
  //   ? getDraftImage(currentAddress, topic) ?? null
  //   : null,

  const textInputRef = React.createRef<TextInput>();

  const replyContent = useMemo(() => {
    if (!replyMessage) {
      return undefined;
    }
    return getContentFromMessage(replyMessage);
  }, [replyMessage]);

  useEffect(() => {
    if (text && currentAddress && id) {
      mmkvStorage.saveDraftText(currentAddress, id, text);
    }
    if (!text && currentAddress && id) {
      mmkvStorage.clearDraftText(currentAddress, id);
    }
  }, [currentAddress, text, id]);

  const handleImageUploadPress = useCallback(() => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
      },
      response => {
        response.assets?.forEach(resAsset => {
          if (resAsset.uri) {
            setAssetUri(resAsset);
          }
        });
      },
    );
  }, []);

  const handleCameraPress = useCallback(() => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        response.assets?.forEach(resAsset => {
          if (resAsset.uri) {
            setAssetUri(resAsset);
          }
        });
      },
    );
  }, []);

  const canSend = text.length > 0 || asset;

  const handleSend = useCallback(() => {
    if (!canSend) {
      return;
    }
    sendMessage({text, asset: asset ?? undefined, replyId: replyMessage?.id});
    setText('');
    setAssetUri(null);
  }, [canSend, replyMessage, sendMessage, text, asset]);

  return (
    <VStack flexShrink={1}>
      {replyContent && (
        <HStack marginX={2}>
          <Text typography="text-sm/regular" color={colors.textSecondary}>
            {translate('conversation_replying_to', {
              name: getSenderNameFromMessage(replyMessage),
            })}
          </Text>
          <Text
            paddingLeft={1}
            numberOfLines={1}
            ellipsizeMode="tail"
            typography="text-sm/regular"
            color={colors.textSecondary}>
            {replyContent}
          </Text>
          <Pressable onPress={clearReply}>
            <Icon name="x-circle" size={20} color={colors.textSecondary} />
          </Pressable>
        </HStack>
      )}
      <HStack
        marginX={2}
        alignItems={'flex-end'}
        backgroundColor={'transparent'}>
        <Pressable onPress={handleImageUploadPress}>
          <Icon name="photo" size={40} color={colors.actionPrimary} />
        </Pressable>
        <Pressable onPress={handleCameraPress}>
          <Icon name="camera" size={40} color={colors.actionPrimary} />
        </Pressable>
        {asset ? (
          <Box>
            <Box position={'absolute'} zIndex={10} right={0}>
              <Pressable onPress={() => setAssetUri(null)}>
                <Icon name="x-circle" size={25} color={colors.actionPrimary} />
              </Pressable>
            </Box>
            <Image
              source={{uri: asset.uri}}
              height={'80px'}
              width={'80px'}
              borderRadius={10}
              marginBottom={'3px'}
              alt={translate('conversation_image_alt')}
            />
          </Box>
        ) : null}
      </HStack>

      <HStack
        borderColor={focused ? colors.actionPrimary : colors.textSecondary}
        borderWidth={2}
        paddingLeft={4}
        marginX={2}
        paddingY={Platform.select({
          ios: 2,
          android: 0,
        })}
        bottom={0}
        borderRadius={24}
        alignItems={'center'}
        borderBottomRightRadius={0}>
        <TextInput
          ref={textInputRef}
          autoFocus
          value={text}
          style={styles.input}
          onChangeText={setText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          returnKeyType={canSend ? 'send' : 'default'}
          onSubmitEditing={canSend ? handleSend : textInputRef.current?.blur}
        />
        <Pressable onPress={handleSend}>
          <Box
            marginRight={2}
            backgroundColor={
              canSend ? colors.actionPrimary : colors.textSecondary
            }
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
    </VStack>
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
    color: colors.textPrimary,
  },
});
