import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersDetailRepository from '../repositories/IOrdersDetailRepository';

import OrderDetail from '../infra/typeorm/entities/Orderdetail';

interface IRequest {
  id: string;
  order_id: string;
  product_id: string;
  sales_price: number;
  unit: string;
  amount: number;
  quantity: number;
  product_name: string;
}

@injectable()
class UpdateOrderDetailService {
  constructor(
    @inject('OrdersDetailRepository')
    private ordersDetailRepository: IOrdersDetailRepository
  ) {}

  public async execute({
    id,
    sales_price,
    quantity,
  }: IRequest): Promise<OrderDetail> {
    const orderDetail = await this.ordersDetailRepository.findById(id);

    if (!orderDetail) {
      throw new AppError('Order detail not found.', 401);
    }

    orderDetail.sales_price = sales_price;
    orderDetail.quantity = quantity;

    await this.ordersDetailRepository.save(orderDetail);

    return orderDetail;
  }
}

export default UpdateOrderDetailService;
