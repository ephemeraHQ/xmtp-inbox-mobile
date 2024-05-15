declare module 'react-native-config' {
  export interface NativeConfig {
    XMTP_ENV: string;
    THRID_WEB_CLIENT_ID: string;
    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    PRIVY_APP_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
