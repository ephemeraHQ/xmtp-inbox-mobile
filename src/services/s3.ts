import AWS from 'aws-sdk';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Config from 'react-native-config';

AWS.config.update({
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  region: Config.AWS_S3_REGION,
});

const s3 = new AWS.S3();

export const AWSHelper = {
  uploadFile: async function (fileUri: string, name: string): Promise<string> {
    try {
      const base64Data = await ReactNativeBlobUtil.fs.readFile(
        fileUri.slice('file://'.length),
        'base64',
      );

      const params = {
        Bucket: Config.AWS_S3_BUCKET,
        Key: name,
        Body: Buffer.from(base64Data, 'base64'),
        ACL: 'public-read', // This will make the file publicly available
      };

      return new Promise((res, rej) => {
        s3.upload(params, function (err: Error, data: any) {
          if (err) {
            rej(err);
          }
          return res(data.Location);
        });
      });
    } catch (error) {
      throw error;
    }
  },
};
