import { Router } from 'express';

import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
// import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';

import NotificationsController from '../controllers/NotificationsController';

const notificationsRouter = Router();

const notificationsController = new NotificationsController();

notificationsRouter.get('/', async (req, res) => {
  const notificaitonsRepository = new NotificationRepository();

  const notification = await notificaitonsRepository.findNotifications();

  return res.json(notification);
});

notificationsRouter.patch(
  '/:notification_id',
  // ensureAuthenticated,
  notificationsController.update
);

export default notificationsRouter;
