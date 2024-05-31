import {useQueryClient} from '@tanstack/react-query';
import {act, renderHook} from '@testing-library/react-hooks';
import {ContentTypes} from '../consts/ContentTypes';
import {QueryKeys} from '../queries/QueryKeys';
import {useGroupMessagesQuery} from '../queries/useGroupMessagesQuery';
import {useGroup} from './useGroup';
import {useGroupMessages} from './useGroupMessages';

// Mock dependencies
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

jest.mock('./useGroup', () => ({
  useGroup: jest.fn(),
}));

jest.mock('../queries/useGroupMessagesQuery', () => ({
  useGroupMessagesQuery: jest.fn(),
}));

describe('useGroupMessages', () => {
  const mockQueryClient = {
    setQueryData: jest.fn(),
  };

  const mockGroup = {
    streamGroupMessages: jest.fn(),
    sync: jest.fn(),
    memberAddresses: jest.fn(),
  };

  const topic = 'test-topic';

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useGroup as jest.Mock).mockReturnValue({data: mockGroup});
    (useGroupMessagesQuery as jest.Mock).mockReturnValue({data: []});
  });

  test('should set up the group message stream and handle incoming messages', async () => {
    const mockMessage = {
      contentTypeId: ContentTypes.Text,
      content: 'Test message',
    };

    mockGroup.streamGroupMessages.mockImplementation(callback => {
      callback(mockMessage);
      return Promise.resolve(() => {});
    });

    renderHook(() => useGroupMessages(topic));

    expect(mockGroup.streamGroupMessages).toHaveBeenCalled();
    expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(
      [QueryKeys.GroupMessages, topic],
      expect.any(Function),
    );

    const updateFn = mockQueryClient.setQueryData.mock.calls[0][1];
    const prevMessages: any[] = [];
    const newMessages = updateFn(prevMessages);
    expect(newMessages).toEqual([mockMessage, ...prevMessages]);

    if (mockMessage.contentTypeId === ContentTypes.GroupUpdated) {
      await act(async () => {
        await mockGroup.sync();
        const addresses = await mockGroup.memberAddresses();
        expect(mockQueryClient.setQueryData).toHaveBeenCalledWith(
          [QueryKeys.GroupParticipants, topic],
          addresses,
        );
      });
    }
  });

  test('should clean up the group message stream on unmount', async () => {
    const cancelCallback = jest.fn();
    mockGroup.streamGroupMessages.mockReturnValue(
      Promise.resolve(cancelCallback),
    );

    const {unmount} = renderHook(() => useGroupMessages(topic));

    await act(async () => {
      unmount();
    });

    expect(cancelCallback).toHaveBeenCalled();
  });

  test('should return the result of useGroupMessagesQuery', () => {
    const mockQueryData = {data: ['message1', 'message2']};
    (useGroupMessagesQuery as jest.Mock).mockReturnValue(mockQueryData);

    const {result} = renderHook(() => useGroupMessages(topic));

    expect(result.current).toBe(mockQueryData);
  });
});
