import path from 'path';
import fs from 'fs';
import mime from 'mime';
import uploadConfig from '../../../../../config/upload';
import aws, { S3 } from 'aws-sdk';

import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
    });
  }

  public async saveFile(file: string): Promise<string> {
    console.log('Inside of S3Storage');
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found.');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    console.log('bucket criado :', uploadConfig.config.aws.bucket);
    await this.client
      .putObject(
        {
          Body: fileContent,
          Bucket: uploadConfig.config.aws.bucket as string,
          Key: file,
          ACL: 'public-read',
          ContentType
        },
        function(err, data) {
          if (err) {
            console.log('PutObject return:', err, err.stack);
          } else {
            console.log('Success', data);
            // throw err;
          }
        }
      )
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file
      })
      .promise();
  }
}

export default S3StorageProvider;
