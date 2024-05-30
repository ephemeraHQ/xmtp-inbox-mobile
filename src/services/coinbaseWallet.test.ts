import {configure, isConnected} from '@coinbase/wallet-mobile-sdk';
import {Alert} from 'react-native';
import {CoinbaseWallet} from './CoinbaseWallet';
import {mmkvStorage} from './mmkvStorage';

// Mock mmkvStorage
jest.mock('./mmkvStorage', () => ({
  mmkvStorage: {
    saveAddress: jest.fn(),
  },
}));

// Mock @coinbase/wallet-mobile-sdk
jest.mock('@coinbase/wallet-mobile-sdk', () => ({
  configure: jest.fn(),
  handleResponse: jest.fn(),
  isConnected: jest.fn(),
  WalletMobileSDKEVMProvider: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

// Mock react-native
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  Linking: {
    addEventListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  },
}));

describe('CoinbaseWallet', () => {
  let coinbaseWallet: CoinbaseWallet;

  beforeEach(() => {
    coinbaseWallet = new CoinbaseWallet();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should configure the Coinbase Wallet SDK and initialize provider', () => {
    expect(configure).toHaveBeenCalledWith({
      hostURL: new URL('https://wallet.coinbase.com/wsegue'),
      callbackURL: new URL('ephemera-chat://'),
      hostPackageName: 'org.toshi',
    });
    expect(coinbaseWallet.provider).toBeDefined();
  });

  test('connect should request accounts and save the address', async () => {
    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    // @ts-ignore-next-line
    coinbaseWallet.provider.request.mockResolvedValueOnce([mockAddress]);
    await coinbaseWallet.connect();

    expect(coinbaseWallet.address).toBe(mockAddress);
    expect(mmkvStorage.saveAddress).toHaveBeenCalledWith(mockAddress);
  });

  test('disconnect should call provider.disconnect', async () => {
    await coinbaseWallet.disconnect();
    expect(coinbaseWallet.provider.disconnect).toHaveBeenCalled();
  });

  test('isAvailableToConnect should return true', async () => {
    const result = await coinbaseWallet.isAvailableToConnect();
    expect(result).toBe(true);
  });

  test('isConnected should return true if address is set', async () => {
    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    coinbaseWallet.address = mockAddress;
    // @ts-ignore-next-line

    isConnected.mockResolvedValueOnce(true);

    const result = await coinbaseWallet.isConnected();
    expect(result).toBe(true);
  });

  test('getAddress should return the address if set', async () => {
    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    coinbaseWallet.address = mockAddress;
    const address = await coinbaseWallet.getAddress();
    expect(address).toBe(mockAddress);
  });

  test('getAddress should call connect if address is not set', async () => {
    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    // @ts-ignore-next-line

    coinbaseWallet.provider.request.mockResolvedValueOnce([mockAddress]);

    const address = await coinbaseWallet.getAddress();
    expect(address).toBe(mockAddress);
  });

  test('signMessage should return a signed message', async () => {
    const message = 'Test message';
    const signedMessage = 'signed_message';
    // @ts-ignore-next-line

    coinbaseWallet.provider.request.mockResolvedValueOnce(signedMessage);

    const result = await coinbaseWallet.signMessage(message);
    expect(result).toBe(signedMessage);
  });

  test('signMessage should throw an error if signing fails', async () => {
    const message = 'Test message';
    const errorMessage = 'Error signing message';
    // @ts-ignore-next-line

    coinbaseWallet.provider.request.mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(coinbaseWallet.signMessage(message)).rejects.toThrow(
      errorMessage,
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error signing message',
      errorMessage,
    );
  });
});
