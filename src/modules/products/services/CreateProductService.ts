import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  code: string;
  name: string;
  barcode: number;
  unit: string;
  sales_price: number;
  ncm: number;
  is_active: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    code,
    name,
    barcode,
    unit,
    sales_price,
    ncm,
    is_active,
  }: IRequest): Promise<Product> {
    const checkProductExists = await this.productsRepository.findByCode(code);

    if (checkProductExists) {
      throw new AppError('Code already used.', 401);
    }

    const product = await this.productsRepository.create({
      code,
      name,
      barcode,
      unit,
      sales_price,
      ncm,
      is_active,
    });

    return product;
  }
}

export default CreateProductService;
