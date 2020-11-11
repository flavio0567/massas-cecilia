import { getRepository, Repository } from 'typeorm';

import IOrdersDetailRepository from '@modules/orders/repositories/IOrdersDetailRepository';
import ICreateOrderDetailDTO from '@modules/orders/dtos/ICreateOrderDetailDTO';
import IUpdateOrderDetailDTO from '@modules/orders/dtos/IUpdateOrderDetailDTO';

import Orderdetail from '../entities/Orderdetail';

class OrdersDetailRepository implements IOrdersDetailRepository {
  execute(arg0: { id: string; order_id: string; product_id: string; sales_price: number; unit: string; amount: number; quantity: number; product_name: string; }) {
    throw new Error('Method not implemented.');
  }
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
    quantity,
    product_name
  }: ICreateOrderDetailDTO): Promise<Orderdetail> {
    const orderdetail = new Orderdetail();
    orderdetail.order_id = order_id;
    orderdetail.product_id = product_id;
    orderdetail.sales_price = sales_price;
    orderdetail.unit = unit;
    orderdetail.amount = amount;
    orderdetail.quantity = quantity;
    orderdetail.product_name = product_name;

    return this.ormRepository.save(orderdetail);
  }

  public async update(orderdetail: IUpdateOrderDetailDTO): Promise<void> {
    await this.ormRepository.save(orderdetail);

    return;
  }

  public async save(orderdetail: Orderdetail): Promise<Orderdetail> {
    return this.ormRepository.save(orderdetail);
  }
}

export default OrdersDetailRepository;
