import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import OrdersDetailRepository from '@modules/orders/infra/typeorm/repositories/OrdersDetailRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class OrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, mobile, deliveryLocalization } = req.body;

    const {
      cep,
      state,
      city,
      neighborhood,
      street,
      numberAddress,
      complementAddress
    } = deliveryLocalization;

    // User

    const createUser = container.resolve(CreateUserService);

    await createUser.execute({
      name,
      mobile,
      avatar: '',
      email: '',
      password: '',
      is_admin: 0,
      is_active: 1
    });

    // Order

    let address;

    if (street) {
      address = `${street}, ${numberAddress} ${complementAddress}`;
    } else {
      address = null;
    }

    const { order_total, isOrderDelivering, deliveryDateTime } = req.body;

    const { deliveryDate, deliveryTime } = deliveryDateTime;

    const orderRepository = new OrdersRepository();

    const createOrder = await orderRepository.create({
      delivery_name: name,
      delivery_mobile: mobile,
      is_order_delivering: isOrderDelivering,
      delivery_address1: address,
      delivery_address2: neighborhood,
      delivery_city: city,
      delivery_state: state,
      delivery_zip_code: cep,
      delivery_date: deliveryDate,
      delivery_time: deliveryTime,
      order_total
    });

    // Detail

    const { orderDetail } = req.body;

    const ordersDetailRepository = new OrdersDetailRepository();

    try {
      orderDetail.forEach(
        (element: {
          id: string;
          sales_price: number;
          unit: string;
          amount: number;
          quantity: number;
        }) => {
          ordersDetailRepository.create({
            order_id: createOrder.id,
            product_id: element.id,
            sales_price: Number(element.sales_price),
            unit: element.unit,
            amount: element.amount,
            quantity: element.quantity
          });
        }
      );
    } catch (err) {
      throw new AppError('Error creating order details.', err);
    }

    return res.json(createOrder);
  }
}
