import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IUsersRepository {
  findAllProducts(family_code: number): Promise<Product[] | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
}
