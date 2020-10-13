import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
}

@injectable()
class ProductActivateService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', 401);
    }

    product.is_inactive = Number(!product.is_inactive);

    await this.productsRepository.update(product);

    return product;
  }
}

export default ProductActivateService;
