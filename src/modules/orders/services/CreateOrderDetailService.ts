import { injectable, inject } from 'tsyringe';

import IOrdersDetailRepository from '../repositories/IOrdersDetailRepository';

import Orderdetail from '../infra/typeorm/entities/Orderdetail';

interface IRequest {
  order_id: string;
  product_id: string;
  sales_price: number;
  unit: string;
  amount: number;
  quantity: number;
}

@injectable()
class CreateOrderDetailService {
  constructor(
    @inject('OrdersDetailRepository')
    private ordersDetailRepository: IOrdersDetailRepository
  ) {}

  public async execute({
    order_id,
    product_id,
    sales_price,
    unit,
    amount,
    quantity
  }: IRequest): Promise<Orderdetail> {
    const orderdetail = await this.ordersDetailRepository.create({
      order_id,
      product_id,
      sales_price,
      unit,
      amount,
      quantity
    });

    return orderdetail;
  }
}

export default CreateOrderDetailService;
