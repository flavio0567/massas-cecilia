import fs from 'fs';
import path from 'path';

import IStorageProvider from '../models/IStoageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async savefile(file: string): Promise<string> {
    await fs.promise.rename();
  }

  public async deletefile(file: string): Promise<void> {}
}

export default DiskStorageProvider;
