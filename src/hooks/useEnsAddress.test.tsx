import {act, renderHook} from '@testing-library/react-hooks';
import {getEnsAddress} from 'viem/ens';
import {viemClient} from '../utils/viemClient';
import {useEnsAddress} from './useEnsAddress';

// Mock dependencies
jest.mock('viem/ens', () => ({
  getEnsAddress: jest.fn(),
}));

jest.mock('../utils/viemClient', () => ({}));

jest.mock('./useDebounce', () => ({
  useDebounce: jest.fn(value => value),
}));

describe('useEnsAddress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return null initially', () => {
    const {result} = renderHook(() => useEnsAddress());
    expect(result.current.data).toBeNull();
  });

  test('should fetch ENS address and update state', async () => {
    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    (getEnsAddress as jest.Mock).mockResolvedValueOnce(mockAddress);

    const {result, waitForNextUpdate} = renderHook(() =>
      useEnsAddress('vitalik.eth'),
    );

    await act(async () => {
      await waitForNextUpdate({timeout: 2000});
    });

    expect(getEnsAddress).toHaveBeenCalledWith(viemClient, {
      name: 'vitalik.eth',
    });
    expect(result.current.data).toBe(mockAddress);
  });

  test('should set ENS address to null if search text is empty', async () => {
    (getEnsAddress as jest.Mock).mockResolvedValueOnce(
      '0x1234567890abcdef1234567890abcdef12345678',
    );

    const {result, rerender} = renderHook(
      ({searchText}) => useEnsAddress(searchText),
      {
        initialProps: {searchText: 'vitalik.eth'},
      },
    );
    (getEnsAddress as jest.Mock).mockResolvedValueOnce(null);

    rerender({searchText: ''});

    expect(result.current.data).toBeNull();
  });
});
