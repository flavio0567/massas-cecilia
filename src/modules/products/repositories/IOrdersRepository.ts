import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  findProducts(): Promise<Product[] | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: ICreateProductDTO): Promise<Product | undefined>;
  save(product: Product): Promise<Product>;
}
