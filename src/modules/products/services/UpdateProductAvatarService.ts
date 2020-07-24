import path from 'path';
import fs, { promises } from 'fs';

import { getRepository } from 'typeorm';

import uploadConfig from '../../../config/upload';
import Product from '../infra/typeorm/entities/Product';

interface Request {
  product_id: string;
  avatarFilename: string;
}

class UpdateProductAvatarService {
  public async execute({
    product_id,
    avatarFilename
  }: Request): Promise<Product | undefined> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new Error('Only authenticated user can update a product avatar.');
    }

    if (product.avatar) {
      const productAvatarFilePath = path.join(
        uploadConfig.tmpFolder,
        product.avatar
      );

      const productAvatarFileExists = await promises.stat(
        productAvatarFilePath
      );

      if (productAvatarFileExists) {
        await fs.promises.unlink(productAvatarFilePath);
      }
    }

    product.avatar = avatarFilename;

    await productsRepository.save(product);

    return product;
  }
}
export default UpdateProductAvatarService;
