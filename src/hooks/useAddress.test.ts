import {renderHook} from '@testing-library/react-hooks';
import {useAddress} from './useAddress';
import {useClient} from './useClient';

jest.mock('./useClient');

describe('useAddress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return address and loading state from useClient', () => {
    const mockClient = {address: '0x1234567890abcdef1234567890abcdef12345678'};
    const mockLoading = false;

    (useClient as jest.Mock).mockReturnValue({
      client: mockClient,
      loading: mockLoading,
    });

    const {result} = renderHook(() => useAddress());

    expect(result.current.address).toBe(mockClient.address);
    expect(result.current.loading).toBe(mockLoading);
  });

  test('should return undefined address if client is not available', () => {
    const mockClient = null;
    const mockLoading = true;

    (useClient as jest.Mock).mockReturnValue({
      client: mockClient,
      loading: mockLoading,
    });

    const {result} = renderHook(() => useAddress());

    expect(result.current.address).toBeUndefined();
    expect(result.current.loading).toBe(mockLoading);
  });
});
