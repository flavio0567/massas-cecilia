import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import OrdersClosedController from '../controllers/OrdersClosedController';

const ordersClosedRouter = Router();

const ordersClosedController = new OrdersClosedController();

// ordersClosedRouter.use(ensureAuthenticated);

ordersClosedRouter.get('/', ordersClosedController.findOrdersClosed);

ordersClosedRouter.patch(
  '/:id',
  // celebrate({
  //   [Segments.PARAMS]: { id: Joi.string().required() },
  // }),
  ordersClosedController.update
);

export default ordersClosedRouter;
