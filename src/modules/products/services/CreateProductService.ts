import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  code: string;
  name: string;
  sales_price: number;
  unit: string;
  barcode: number;
  ncm: number;
  amount: number;
  is_inactive: number;
  exception: number;
  product_family: number;
  category: number;
  sub_category: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    code,
    name,
    barcode,
    unit,
    sales_price,
    ncm,
    amount,
    is_inactive,
    exception,
    product_family,
    category,
    sub_category
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
      amount,
      is_inactive,
      exception,
      product_family,
      category,
      sub_category
    });

    return product;
  }
}

export default CreateProductService;
