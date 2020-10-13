import path from 'path';
import fs, { promises } from 'fs';
import uploadConfig from '../../../config/upload';
import { injectable, inject } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface Request {
  product_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateProductAvatarService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    product_id,
    avatarFilename
  }: Request): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new Error('Only authenticated user can update a product avatar.');
    }

    if (product.avatar) {
      const productAvatarFilePath = path.join(
        uploadConfig.tmpFolder,
        product.avatar
      );

      const productAvatarFileExists = await fs.promises.stat(
        productAvatarFilePath
      );

      if (productAvatarFileExists) {
        await fs.promises.unlink(productAvatarFilePath);
      }
    }

    product.avatar = avatarFilename;

    await this.productsRepository.save(product);

    return product;
  }
}
export default UpdateProductAvatarService;
