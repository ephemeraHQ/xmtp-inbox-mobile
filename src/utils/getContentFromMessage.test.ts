import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {getContentFromMessage} from './getContentFromMessage';

describe('getContentFromMessage', () => {
  it('should return an empty string if the message is null', () => {
    // @ts-expect-error
    expect(getContentFromMessage(null)).toBe('');
  });

  it('should return an empty string if the message is undefined', () => {
    // @ts-expect-error
    expect(getContentFromMessage(undefined)).toBe('');
  });

  it('should return the content if it is a string', () => {
    const message = {
      content: () => 'Hello, world!',
      fallback: 'Fallback content',
    } as DecodedMessage<SupportedContentTypes>;

    expect(getContentFromMessage(message)).toBe('Hello, world!');
  });

  it('should return the fallback if content is not a string', () => {
    const message = {
      content: () => ({text: 'Hello, world!'}),
      fallback: 'Fallback content',
    } as unknown as DecodedMessage<SupportedContentTypes>;

    expect(getContentFromMessage(message)).toBe('Fallback content');
  });

  it('should return an empty string if content is not a string and no fallback is provided', () => {
    const message = {
      content: () => ({text: 'Hello, world!'}),
      fallback: undefined,
    } as unknown as DecodedMessage<SupportedContentTypes>;

    expect(getContentFromMessage(message)).toBe('');
  });

  it('should return the fallback if an error is thrown', () => {
    const message = {
      content: () => {
        throw new Error('Error fetching content');
      },
      fallback: 'Fallback content',
    } as unknown as DecodedMessage<SupportedContentTypes>;

    expect(getContentFromMessage(message)).toBe('Fallback content');
  });

  it('should return an empty string if an error is thrown and no fallback is provided', () => {
    const message = {
      content: () => {
        throw new Error('Error fetching content');
      },
      fallback: undefined,
    } as unknown as DecodedMessage<SupportedContentTypes>;

    expect(getContentFromMessage(message)).toBe('');
  });
});
