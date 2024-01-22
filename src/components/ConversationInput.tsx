import {Box, HStack, Image, Pressable, VStack} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Icon} from '../components/common/Icon';
import {translate} from '../i18n';
import {
  clearDraftImage,
  clearDraftText,
  getDraftImage,
  getDraftText,
  saveDraftImage,
  saveDraftText,
} from '../services/mmkvStorage';
import {colors} from '../theme/colors';

interface ConversationInputProps {
  sendMessage: (payload: {text: string}) => void;
  currentAddress?: string;
  topic?: string;
}

export const ConversationInput: FC<ConversationInputProps> = ({
  sendMessage,
  currentAddress,
  topic,
}) => {
  const [focused, setFocus] = useState<boolean>(false);
  const [text, setText] = useState<string>(
    currentAddress && topic ? getDraftText(currentAddress, topic) ?? '' : '',
  );
  const [assetUri, setAssetUri] = useState<string | null>(
    currentAddress && topic
      ? getDraftImage(currentAddress, topic) ?? null
      : null,
  );

  useEffect(() => {
    if (text && currentAddress && topic) {
      saveDraftText(currentAddress, topic, text);
    }
    if (!text && currentAddress && topic) {
      clearDraftText(currentAddress, topic);
    }
  }, [currentAddress, text, topic]);

  useEffect(() => {
    if (assetUri && currentAddress && topic) {
      saveDraftImage(currentAddress, topic, assetUri);
    }
    if (!assetUri && currentAddress && topic) {
      clearDraftImage(currentAddress, topic);
    }
  }, [currentAddress, assetUri, topic]);

  const handleImageUploadPress = useCallback(() => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
      },
      response => {
        response.assets?.forEach(asset => {
          if (asset.uri) {
            setAssetUri(asset.uri);
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
        response.assets?.forEach(asset => {
          if (asset.uri) {
            setAssetUri(asset.uri);
          }
        });
      },
    );
  }, []);

  const handleSend = useCallback(() => {
    sendMessage({text});
    setText('');
    setAssetUri(null);
  }, [sendMessage, text]);

  const canSend = text.length > 0 || assetUri;

  return (
    <VStack flexShrink={1}>
      <HStack alignItems={'flex-end'}>
        <Pressable onPress={handleImageUploadPress}>
          <Icon name="photo" size={40} color={colors.actionPrimary} />
        </Pressable>
        <Pressable onPress={handleCameraPress}>
          <Icon name="camera" size={40} color={colors.actionPrimary} />
        </Pressable>
        {assetUri ? (
          <Box>
            <Box position={'absolute'} zIndex={10} right={0}>
              <Pressable onPress={() => setAssetUri(null)}>
                <Icon name="x-circle" size={25} color={colors.actionPrimary} />
              </Pressable>
            </Box>
            <Image
              source={{uri: assetUri}}
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
        paddingY={2}
        bottom={0}
        borderRadius={24}
        borderBottomRightRadius={0}>
        <TextInput
          value={text}
          style={styles.input}
          onChangeText={setText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
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
  },
});
