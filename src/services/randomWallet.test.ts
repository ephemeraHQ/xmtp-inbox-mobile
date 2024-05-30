import {mmkvStorage} from './mmkvStorage';
import {RandomWallet} from './RandomWallet';

// Mock mmkvStorage
jest.mock('./mmkvStorage', () => ({
  mmkvStorage: {
    saveAddress: jest.fn(),
  },
}));

describe('RandomWallet', () => {
  let randomWallet: RandomWallet;

  beforeEach(() => {
    randomWallet = new RandomWallet();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should generate a private key and set account and address', () => {
    expect(randomWallet.account).toBeDefined();
    expect(randomWallet.address).toBe(randomWallet.account.address);
    mmkvStorage.saveAddress.mockReturnValue();
    expect(mmkvStorage.saveAddress).toHaveBeenCalledWith(randomWallet.address);
  });

  test('isAvailableToConnect should return true', async () => {
    const result = await randomWallet.isAvailableToConnect();
    expect(result).toBe(true);
  });

  test('isConnected should return true when address is set', async () => {
    const result = await randomWallet.isConnected();
    expect(result).toBe(true);
  });

  test('getAddress should return the address if set', async () => {
    const address = await randomWallet.getAddress();
    expect(address).toBe(randomWallet.account.address);
  });

  test('getAddress should throw an error if address is not set', async () => {
    randomWallet.address = undefined;
    await expect(randomWallet.getAddress()).rejects.toThrow(
      'Failed to get address',
    );
  });

  test('signMessage should return a signed message', async () => {
    const message = 'Test message';
    const signedMessage = 'signed_message'; // Mocked signed message

    randomWallet.account.signMessage = jest
      .fn()
      .mockResolvedValue(signedMessage);

    const result = await randomWallet.signMessage(message);
    expect(result).toBe(signedMessage);
    expect(randomWallet.account.signMessage).toHaveBeenCalledWith({message});
  });

  test('signMessage should throw an error if account does not have signMessage function', async () => {
    // @ts-expect-error
    randomWallet.account.signMessage = undefined;

    await expect(randomWallet.signMessage('Test message')).rejects.toThrow(
      'Failed to sign message',
    );
  });
});
