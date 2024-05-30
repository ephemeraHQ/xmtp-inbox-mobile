import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {mmkvStorage} from '../services/mmkvStorage';
import {formatAddress} from './formatAddress';
import {getSenderNameFromMessage} from './getSenderNameFromMessage';

// Mock the dependencies
jest.mock('../services/mmkvStorage', () => ({
  mmkvStorage: {
    getEnsName: jest.fn(),
  },
}));

jest.mock('./formatAddress', () => ({
  formatAddress: jest.fn(),
}));

describe('getSenderNameFromMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty string if message is undefined', () => {
    expect(getSenderNameFromMessage()).toBe('');
  });

  it('should return ENS name if available', () => {
    const message: DecodedMessage<SupportedContentTypes> = {
      senderAddress: '0x1234567890abcdef',
    } as DecodedMessage<SupportedContentTypes>;

    // @ts-expect-error
    mmkvStorage.getEnsName.mockReturnValue('ensName.eth');

    expect(getSenderNameFromMessage(message)).toBe('ensName.eth');
    expect(mmkvStorage.getEnsName).toHaveBeenCalledWith('0x1234567890abcdef');
  });

  it('should return formatted address if ENS name is not available', () => {
    const message: DecodedMessage<SupportedContentTypes> = {
      senderAddress: '0x1234567890abcdef',
    } as DecodedMessage<SupportedContentTypes>;

    // @ts-expect-error
    mmkvStorage.getEnsName.mockReturnValue(null);
    // @ts-expect-error
    formatAddress.mockReturnValue('0x1234...cdef');

    expect(getSenderNameFromMessage(message)).toBe('0x1234...cdef');
    expect(mmkvStorage.getEnsName).toHaveBeenCalledWith('0x1234567890abcdef');
    expect(formatAddress).toHaveBeenCalledWith('0x1234567890abcdef');
  });
});
