import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateOrderDetailService from '@modules/orders/services/CreateOrderDetailService';

export default class OrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    console.log(req.body);

    const {
      user,
      total,
      cart,
      deliveryDateTime,
      deliveryLocalization
    } = req.body;

    const { name, mobile } = user;

    const { id, sales_price, unit, amount, quantity } = cart;

    const { deliveryDate, deliveryTime } = deliveryDateTime;

    const order_total = Number(total.replace('R$ ', ''));

    const {
      cep,
      state,
      city,
      neighborhood,
      street,
      numberAddress,
      complementAddress
    } = deliveryLocalization;

    let userId;

    if (!user.id) {
      const createUser = container.resolve(CreateUserService);

      const newUser = await createUser.execute({
        avatar: '',
        name,
        email: '',
        mobile,
        password: '',
        is_admin: 0,
        is_active: 1
      });

      userId = newUser.id;
    } else {
      userId = user.id;
    }

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      user_id: userId,
      delivery_name: name,
      delivery_address1: String({ street, numberAddress, complementAddress }),
      delivery_address2: String({ neighborhood }),
      delivery_city: city,
      delivery_state: state,
      delivery_zip_code: cep,
      delivery_date: deliveryDate,
      delivery_time: deliveryTime
    });

    // const createOrderDetail = container.resolve(CreateOrderDetailService);

    // cart.forEach(
    //   (element: {
    //     id: string;
    //     sales_price: number;
    //     unit: string;
    //     amount: number;
    //     quantity: number;
    //   }) => {
    //     createOrderDetail.execute({
    //       order_id: order.id,
    //       product_id: element.id,
    //       sales_price: element.sales_price,
    //       unit: element.unit,
    //       amount: element.amount,
    //       quantity: element.quantity
    //     });
    //   }
    // );

    return res.json({ order: classToClass(order) });
  }
}
