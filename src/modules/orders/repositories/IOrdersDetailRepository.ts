import Orderdetail from '../infra/typeorm/entities/Orderdetail';
import ICreateOrderDetailDTO from '../dtos/ICreateOrderDetailDTO';

export default interface IOrdersDetailiRepository {
  findById(id: string): Promise<Orderdetail | undefined>;
  create(data: ICreateOrderDetailDTO): Promise<Orderdetail>;
  save(orderdetail: Orderdetail): Promise<Orderdetail>;
}
