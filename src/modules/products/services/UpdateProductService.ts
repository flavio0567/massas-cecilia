import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
  name: string;
  unit: string;
  sales_price: number;
  amount: number;
  is_inactive: number;
  product_family: number;
  category: number;
  sub_category: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    id,
    name,
    sales_price,
    unit,
    amount,
    is_inactive,
    product_family,
    category,
    sub_category
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', 401);
    }

    product.name = name;
    product.unit = unit;
    product.sales_price = sales_price;
    product.amount = amount;
    product.is_inactive = is_inactive;
    product.product_family = product_family;
    product.category = category;
    product.sub_category = sub_category;

    await this.productsRepository.update(product);

    return product;
  }
}

export default UpdateProductService;
