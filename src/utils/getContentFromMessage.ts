import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';

export const getContentFromMessage = (
  message: DecodedMessage<SupportedContentTypes>,
) => {
  if (!message) {
    return '';
  }
  let text = '';
  try {
    const content = message.content();
    if (typeof content === 'string') {
      text = content;
    } else {
      text = message.fallback ?? '';
    }
  } catch (e) {
    text = message.fallback ?? '';
  }
  return text;
};
