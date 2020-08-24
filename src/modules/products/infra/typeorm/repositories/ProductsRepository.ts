import { getRepository, Repository, Raw } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findProducts(): Promise<Product[] | undefined> {
    const findProduct = await this.ormRepository.find({
      order: {
        name: 'ASC'
      }
    });
    return findProduct;
  }

  public async findFamilyProducts(): Promise<Product[] | undefined> {
    const findProduct = await this.ormRepository.find({
      where: {
        product_family: Raw(family => `${family} > 0`),
        category: 0,
        sub_category: 0,
        is_inactive: 0
      },
      order: {
        product_family: 'ASC'
      }
    });
    return findProduct;
  }

  public async findProductsCategory(
    product_family: number
  ): Promise<Product[] | undefined> {
    const findProduct = await this.ormRepository.find({
      where: {
        product_family,
        category: Raw(family => `${family} > 0`),
        sub_category: Raw(family => `${family} = 0`),
        is_inactive: 0
      },
      order: {
        category: 'ASC'
      }
    });
    return findProduct;
  }

  public async findProductsSubCategory(
    product_family: number,
    category: number
  ): Promise<Product[] | undefined> {
    const findProduct = await this.ormRepository.find({
      where: {
        product_family,
        category,
        sub_category: Raw(sub_category => `${sub_category} > 0`),
        is_inactive: 0
      },
      order: {
        product_family: 'ASC'
      }
    });
    return findProduct;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne(id);

    return findProduct;
  }

  public async findByCode(code: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { code, is_inactive: 0 }
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
