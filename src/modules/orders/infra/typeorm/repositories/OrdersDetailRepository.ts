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
    const findOrderDetail = await this.ormRepository.findOne(
      {
      where: {
        id
      },
      relations: ['product']
    });

    return findOrderDetail;
  }

  public async create({
    order_id,
    product_id,
    sales_price,
    unit,
    amount,
    quantity
  }: ICreateOrderDetailDTO): Promise<Orderdetail> {
    const orderdetail = new Orderdetail();
    orderdetail.order_id = order_id;
    orderdetail.product_id = product_id;
    orderdetail.sales_price = sales_price;
    orderdetail.unit = unit;
    orderdetail.amount = amount;
    orderdetail.quantity = quantity;

    return this.ormRepository.save(orderdetail);
  }

  public async save(orderdetail: Orderdetail): Promise<Orderdetail> {
    return this.ormRepository.save(orderdetail);
  }
}

export default OrdersDetailRepository;
