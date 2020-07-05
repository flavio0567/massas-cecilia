import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAllProducts(): Promise<Product[] | undefined> {
    const findProduct = await this.ormRepository.find();
    return findProduct;
  }

  public async findAllProductsCategory(
    product_family: number,
    category: number
  ): Promise<Product[] | undefined> {
    const findProduct = await this.ormRepository.find({
      where: { product_family, category }
    });
    console.log(findProduct);
    return findProduct;
  }

  public async findAllProductsCategorySubCategory(
    product_family: number,
    category: number,
    sub_category: number
  ): Promise<Product[] | undefined> {
    const findProduct = await this.ormRepository.find({
      where: { product_family, category, sub_category }
    });
    return findProduct;
  }

  public async findById(id: number): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne(id);

    return findProduct;
  }
  public async findByCode(code: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { code }
    });

    return findProduct;
  }

  public async create({
    code,
    name,
    unit,
    amount,
    sales_price,
    barcode,
    ncm,
    is_inactive,
    product_family,
    category,
    sub_category
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      code,
      name,
      unit,
      amount,
      sales_price,
      barcode,
      ncm,
      is_inactive,
      product_family,
      category,
      sub_category
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async update(
    product: ICreateProductDTO
  ): Promise<Product | undefined> {
    await this.ormRepository.save(product);

    return;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
