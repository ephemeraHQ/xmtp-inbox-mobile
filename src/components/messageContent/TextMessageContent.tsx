import {DecodedMessage} from '@xmtp/react-native-sdk';
import {Button, Container} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SupportedContentTypes} from '../../consts/ContentTypes';
import {useFrame} from '../../hooks/useFrame';
import {colors} from '../../theme/colors';
import {Button as AppButton} from '../common/Button';
import {Text} from '../common/Text';

export const TextMessageContent = ({
  isMe,
  message,
}: {
  isMe: boolean;
  message: DecodedMessage<SupportedContentTypes>;
}) => {
  const {width} = useWindowDimensions();
  const {frameData, postFrame} = useFrame(message.content() as string);
  if (!frameData) {
    return (
      <Container
        backgroundColor={
          isMe ? colors.actionPrimary : colors.backgroundSecondary
        }
        borderRadius={'16px'}
        borderBottomRightRadius={isMe ? 0 : '16px'}
        borderTopLeftRadius={isMe ? '16px' : 0}
        paddingY={3}
        paddingX={5}>
        <Text
          typography="text-base/medium"
          color={isMe ? colors.actionPrimaryText : colors.textPrimary}>
          {message.content() as string}
        </Text>
      </Container>
    );
  }

  return (
    <Container
      alignSelf={isMe ? 'flex-end' : 'flex-start'}
      borderRadius={'16px'}
      borderBottomRightRadius={isMe ? 0 : '16px'}
      borderTopLeftRadius={isMe ? '16px' : 0}
      paddingY={3}
      paddingX={5}>
      <FastImage
        source={{uri: frameData.image}}
        style={{height: 150, width: width / 2, borderRadius: 10}}
      />
      <Button.Group
        paddingTop={1}
        width={width / 2}
        isAttached
        flexWrap={'wrap'}>
        {frameData.buttons.map((it, id) => (
          <AppButton
            variant={'outline'}
            key={String(it)}
            flex={1}
            onPress={() => postFrame(id + 1)}>
            {it}
          </AppButton>
        ))}
      </Button.Group>
    </Container>
  );
};
