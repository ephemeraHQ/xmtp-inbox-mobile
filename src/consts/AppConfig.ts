// Just a way to gate some features that are not ready yet
export const AppConfig = {
  IMAGE_UPLOAD_ENABLED: false,
  LENS_ENABLED: false,
  XMTP_ENV: 'dev' as 'local' | 'dev' | 'production',
  MULTI_WALLET: false,
};
