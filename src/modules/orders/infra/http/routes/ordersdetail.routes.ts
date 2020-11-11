import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import OrdersDetailRepository from '@modules/orders/infra/typeorm/repositories/OrdersDetailRepository';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

const ordersDetailRouter = Router();

ordersDetailRouter.get(
  '/:id', ensureAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } }),
  async (req, res) => {
    const { id } = req.params;

    const ordersDetailRepository = new OrdersDetailRepository();
    const ordersDetail = await ordersDetailRepository.findById(id);
    console.log('name: ', ordersDetail)
    return res.json(ordersDetail);
  }
);

export default ordersDetailRouter;
