import { getRepository, Repository, IsNull } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAllProducts(
    product_family: number
  ): Promise<Product[] | undefined> {
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
    console.log(findProduct);
    return findProduct;
  }

  public async findById(id: string): Promise<Product | undefined> {
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
    barcode,
    unit,
    sales_price,
    ncm,
    is_active
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      code,
      name,
      barcode,
      unit,
      sales_price,
      ncm,
      is_active
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
