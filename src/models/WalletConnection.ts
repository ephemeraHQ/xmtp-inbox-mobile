import {Signer} from '@xmtp/react-native-sdk';

export abstract class WalletConnection implements Signer {
  abstract connect(): Promise<void>;

  abstract disconnect(): Promise<void>;

  abstract isAvailableToConnect(): Promise<boolean>;

  abstract isConnected(): Promise<boolean>;

  abstract getAddress(): Promise<string>;

  abstract signMessage(message: string): Promise<string>;
}
