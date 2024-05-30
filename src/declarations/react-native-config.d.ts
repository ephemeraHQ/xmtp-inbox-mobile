declare module 'react-native-config' {
  export interface NativeConfig {
    XMTP_ENV: string;
    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    PUSH_SERVER: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
