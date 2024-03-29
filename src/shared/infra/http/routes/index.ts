import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import userAddressRouter from '@modules/users/infra/http/routes/address.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import productsRouter from '@modules/products/infra/http/routes/products.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import ordersDetailRouter from '@modules/orders/infra/http/routes/ordersdetail.routes';
import ordersClosedRouter from '@modules/orders/infra/http/routes/ordersclosed.routes';
import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';
import timeframesRouter from '@modules/timeframes/infra/http/routes/timeframes.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/address', userAddressRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);
routes.use('/ordersdetail', ordersDetailRouter);
routes.use('/ordersclosed', ordersClosedRouter);
routes.use('/notifications', notificationsRouter);
routes.use('/timeframes', timeframesRouter);

export default routes;
