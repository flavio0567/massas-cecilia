import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import OrdersClosedController from '../controllers/OrdersClosedController';
import OrdersClosedRepository from '@modules/orders/infra/typeorm/repositories/OrdersClosedRepository';

const ordersClosedRouter = Router();

const ordersClosedController = new OrdersClosedController();

// ordersClosedRouter.use(ensureAuthenticated);

ordersClosedRouter.get('/', ordersClosedController.findOrdersClosed);

ordersClosedRouter.get(
  '/mobile/:delivery_mobile',
  celebrate({ [Segments.PARAMS]: { delivery_mobile: Joi.number().required() } }),
  async (req, res) => {
    const { delivery_mobile } = req.params;

    const ordersClosedRepository = new OrdersClosedRepository();

    const orders = await ordersClosedRepository.findByMobile(Number(delivery_mobile))

    return res.json(orders);
  }
);


ordersClosedRouter.patch(
  '/:id',
  // celebrate({
  //   [Segments.PARAMS]: { id: Joi.string().required() },
  // }),
  ordersClosedController.update
);

export default ordersClosedRouter;
