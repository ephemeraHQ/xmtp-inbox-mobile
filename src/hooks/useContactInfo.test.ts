import {act, renderHook} from '@testing-library/react-hooks';
import {mmkvStorage} from '../services/mmkvStorage';
import {getEnsInfo} from '../utils/getEnsInfo';
import {useContactInfo} from './useContactInfo';

// Mock dependencies
jest.mock('../services/mmkvStorage', () => ({
  mmkvStorage: {
    getEnsName: jest.fn(),
    getEnsAvatar: jest.fn(),
    saveEnsName: jest.fn(),
    saveEnsAvatar: jest.fn(),
    clearEnsAvatar: jest.fn(),
  },
}));

jest.mock('../utils/formatAddress', () => ({
  formatAddress: jest.fn(address => `Formatted: ${address}`),
}));

jest.mock('../utils/getEnsInfo', () => ({
  getEnsInfo: jest.fn(),
}));

describe('useContactInfo', () => {
  const address = '0x1234567890abcdef1234567890abcdef12345678';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return initial state when no address is provided', () => {
    const {result} = renderHook(() => useContactInfo());

    expect(result.current).toEqual({
      displayName: null,
      avatarUrl: null,
      loading: true,
    });
  });

  test('should return cached ENS name and avatar if available', () => {
    (mmkvStorage.getEnsName as jest.Mock).mockReturnValue('cachedName');
    (mmkvStorage.getEnsAvatar as jest.Mock).mockReturnValue('cachedAvatarUrl');
    (getEnsInfo as jest.Mock).mockRejectedValueOnce('Failed to fetch ENS info');

    const {result} = renderHook(() => useContactInfo(address));

    expect(result.current).toEqual({
      displayName: 'cachedName',
      avatarUrl: 'cachedAvatarUrl',
      loading: true,
    });
  });

  test('should fetch ENS info and update state', async () => {
    (mmkvStorage.getEnsName as jest.Mock).mockReturnValue(null);
    (mmkvStorage.getEnsAvatar as jest.Mock).mockReturnValue(null);
    (getEnsInfo as jest.Mock).mockResolvedValue({
      ens: 'ensName',
      avatarUrl: 'ensAvatarUrl',
    });

    const {result, waitForNextUpdate} = renderHook(() =>
      useContactInfo(address),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(getEnsInfo).toHaveBeenCalledWith(address);
    expect(mmkvStorage.saveEnsName).toHaveBeenCalledWith(address, 'ensName');
    expect(mmkvStorage.saveEnsAvatar).toHaveBeenCalledWith(
      address,
      'ensAvatarUrl',
    );
    expect(result.current).toEqual({
      displayName: 'ensName',
      avatarUrl: 'ensAvatarUrl',
      loading: false,
    });
  });

  test('should handle error when fetching ENS info', async () => {
    (mmkvStorage.getEnsName as jest.Mock).mockReturnValue(null);
    (mmkvStorage.getEnsAvatar as jest.Mock).mockReturnValue(null);
    (getEnsInfo as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch ENS info'),
    );

    const {result, waitForNextUpdate} = renderHook(() =>
      useContactInfo(address),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(getEnsInfo).toHaveBeenCalledWith(address);
    expect(result.current).toEqual({
      displayName: `Formatted: ${address}`,
      avatarUrl: null,
      loading: false,
    });
  });

  test('should save displayName to mmkvStorage when displayName changes', async () => {
    (mmkvStorage.getEnsName as jest.Mock).mockReturnValue(null);
    (mmkvStorage.getEnsAvatar as jest.Mock).mockReturnValue(null);
    (getEnsInfo as jest.Mock).mockResolvedValue({
      ens: 'ensName',
      avatarUrl: 'ensAvatarUrl',
    });

    const {waitForNextUpdate} = renderHook(() => useContactInfo(address));

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(mmkvStorage.saveEnsName).toHaveBeenCalledWith(address, 'ensName');
  });
});
