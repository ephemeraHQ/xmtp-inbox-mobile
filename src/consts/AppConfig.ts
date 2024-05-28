import {Platform} from 'react-native';

// Just a way to gate some features that are not ready yet
export const AppConfig = {
  LENS_ENABLED: false,
  XMTP_ENV: 'dev' as 'local' | 'dev' | 'production',
  MULTI_WALLET: false,
  PUSH_NOTIFICATIONS: Platform.OS === 'ios',
  GROUP_CONSENT: Platform.OS === 'android',
};
