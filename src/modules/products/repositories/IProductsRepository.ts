import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

interface ProductLoaded {
  products: Product[];
  contentLength: number;
}

export default interface IProductsRepository {
  findProducts(limit: number, page: number): Promise<ProductLoaded | undefined>;
  searchProducts(like: string): Promise<Product[] | undefined>;
  findFamilyProducts(): Promise<Product[] | undefined>;
  findAllProductsFamily(family: number): Promise<Product[] | undefined>;
  findProductsCategory(product_family: number): Promise<Product[] | undefined>;
  findProductsSubCategory(
    product_family: number,
    category: number
  ): Promise<Product[] | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: ICreateProductDTO): Promise<Product | undefined>;
  save(product: Product): Promise<Product>;
}
