import { getRepository, Repository } from 'typeorm';

import IOrdersDetailRepository from '@modules/orders/repositories/IOrdersDetailRepository';
import ICreateOrderDetailDTO from '@modules/orders/dtos/ICreateOrderDetailDTO';

import Orderdetail from '../entities/Orderdetail';

class OrdersDetailRepository implements IOrdersDetailRepository {
  private ormRepository: Repository<Orderdetail>;

  constructor() {
    this.ormRepository = getRepository(Orderdetail);
  }

  public async findById(id: string): Promise<Orderdetail | undefined> {
    const findOrder = await this.ormRepository.findOne(id);

    return findOrder;
  }

  public async create({
    order_id,
    product_id,
    sales_price,
    unit,
    amount,
    quantity
  }: ICreateOrderDetailDTO): Promise<Orderdetail> {
    const orderdetail = this.ormRepository.create({
      order_id,
      product_id,
      sales_price,
      unit,
      amount,
      quantity
    });

    await this.ormRepository.save(orderdetail);

    return orderdetail;
  }

  public async save(orderdetail: Orderdetail): Promise<Orderdetail> {
    return this.ormRepository.save(orderdetail);
  }
}

export default OrdersDetailRepository;
