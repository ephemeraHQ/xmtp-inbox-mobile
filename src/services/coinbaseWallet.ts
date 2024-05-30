import {
  configure,
  handleResponse,
  isConnected,
  WalletMobileSDKEVMProvider,
} from '@coinbase/wallet-mobile-sdk';
import {Signer} from '@xmtp/react-native-sdk';
import {Alert, Linking} from 'react-native';
import {WalletConnection} from '../models/WalletConnection';
import {createDeepLink} from '../navigation/linkingDefinition';
import {mmkvStorage} from './mmkvStorage';

export class CoinbaseWallet extends WalletConnection {
  provider: WalletMobileSDKEVMProvider;
  address?: string;
  signer: Signer;

  async signMessage(message: string): Promise<string> {
    const subscription = Linking.addEventListener('url', ({url}) => {
      handleResponse(new URL(url));
    });
    try {
      const signature: string = await this.provider.request({
        method: 'personal_sign',
        params: [message, this.address],
      });
      return signature;
    } catch (e: any) {
      Alert.alert('Error signing message', e?.message);
      throw e;
    } finally {
      subscription.remove();
    }
  }

  constructor() {
    super();
    configure({
      hostURL: new URL('https://wallet.coinbase.com/wsegue'),
      callbackURL: new URL(createDeepLink('')), // Your app's Universal Link
      hostPackageName: 'org.toshi',
    });
    this.provider = new WalletMobileSDKEVMProvider();

    this.signer = {
      getAddress: this.getAddress,
      signMessage: this.signMessage,
    };
  }

  async connect() {
    const subscription = Linking.addEventListener('url', ({url}) => {
      console.log('url', url);
      handleResponse(new URL(url));
    });
    try {
      const accounts: string[] = await this.provider.request({
        method: 'eth_requestAccounts',
        params: [],
      });
      subscription.remove();
      console.log('Connected to Coinbase Wallet', accounts);
      this.address = accounts[0];
      mmkvStorage.saveAddress(this.address);
    } finally {
      subscription.remove();
    }
  }

  async disconnect() {
    await this.provider.disconnect();
  }

  async isAvailableToConnect() {
    // return isCoinbaseWalletInstalled();
    return true;
  }

  async isConnected() {
    const connected = await isConnected();
    console.log('isConnected', connected);
    return !!this.address;
  }

  async getAddress() {
    if (!this.address) {
      await this.connect();
    }
    if (!this.address) {
      throw new Error('Failed to get address');
    }
    return this.address;
  }
}

export const coinbaseWallet = new CoinbaseWallet();
