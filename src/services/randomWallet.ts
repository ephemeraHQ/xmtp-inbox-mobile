import {
  generatePrivateKey,
  PrivateKeyAccount,
  privateKeyToAccount,
} from 'viem/accounts';

import {WalletConnection} from '../models/WalletConnection';
import {mmkvStorage} from './mmkvStorage';

export class RandomWallet extends WalletConnection {
  address?: string;
  account?: PrivateKeyAccount;

  constructor() {
    super();
  }

  async connect() {
    //
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    this.account = account;
    this.address = account.address;
    mmkvStorage.saveAddress(this.address);
  }

  async disconnect() {
    //
  }

  async isAvailableToConnect() {
    return true;
  }

  async isConnected() {
    return !!this.address;
  }

  async getAddress() {
    if (!this.account) {
      await this.connect();
    }
    if (!this.account?.address) {
      throw new Error('Failed to get address');
    }
    return this.account.address;
  }

  async signMessage(message: string): Promise<string> {
    if (!this.account?.signMessage) {
      throw new Error('Failed to sign message');
    }
    return this.account?.signMessage?.({message});
  }
}

export const randomWallet = new RandomWallet();
