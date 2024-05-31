import {DecodedMessage} from '@xmtp/react-native-sdk';
import {Box, Button, Container} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SupportedContentTypes} from '../../consts/ContentTypes';
import {useFrame} from '../../hooks/useFrame';
import {colors} from '../../theme/colors';
import {Button as AppButton} from '../common/Button';
import {Text} from '../common/Text';

export const TextMessageContent = ({
  isFromUser,
  message,
}: {
  isFromUser: boolean;
  message: DecodedMessage<SupportedContentTypes>;
}) => {
  const {width} = useWindowDimensions();
  const {frameData, postFrame} = useFrame(message.content() as string);
  if (!frameData) {
    return (
      <Container
        backgroundColor={
          isFromUser ? colors.actionPrimary : colors.backgroundSecondary
        }
        borderRadius={'16px'}
        borderBottomRightRadius={isFromUser ? 0 : '16px'}
        borderTopLeftRadius={isFromUser ? '16px' : 0}
        paddingY={3}
        paddingX={5}>
        <Text
          typography="text-base/medium"
          color={isFromUser ? colors.actionPrimaryText : colors.textPrimary}>
          {message.content() as string}
        </Text>
      </Container>
    );
  }
  const imageWidth = (width * 2) / 3;
  const imageHeight =
    imageWidth / (frameData.image?.aspectRatio === '1:1' ? 1 : 1.91);

  return (
    <Box
      alignSelf={isFromUser ? 'flex-end' : 'flex-start'}
      borderRadius={'16px'}
      borderBottomRightRadius={isFromUser ? 0 : '16px'}
      borderTopLeftRadius={isFromUser ? '16px' : 0}
      paddingY={3}
      paddingX={5}>
      <FastImage
        resizeMode="contain"
        source={{uri: frameData.image?.content}}
        style={{
          height: imageHeight,
          width: imageWidth,
          borderRadius: 10,
        }}
      />
      <Button.Group
        paddingTop={1}
        width={imageWidth}
        isAttached
        flexWrap={'wrap'}>
        {frameData.buttons.map((it, id) => (
          <AppButton
            variant={'outline'}
            key={String(it.label)}
            flex={1}
            // TODO: Support other actions
            onPress={() => postFrame(id + 1)}>
            {it.label}
          </AppButton>
        ))}
      </Button.Group>
    </Box>
  );
};
