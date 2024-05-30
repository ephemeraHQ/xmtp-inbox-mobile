import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {mmkvStorage} from '../services/mmkvStorage';
import {formatAddress} from './formatAddress';

export const getSenderNameFromMessage = (
  message?: DecodedMessage<SupportedContentTypes>,
) => {
  if (!message) {
    return '';
  }
  return (
    mmkvStorage.getEnsName(message.senderAddress) ??
    formatAddress(message.senderAddress)
  );
};
