import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateNotificationService from '@modules/notifications/services/UpdateNotificationService';

export default class NotificationsController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { notification_id } = req.params;
    const { read } = req.body;

    const updateNotification = container.resolve(UpdateNotificationService);

    const notification = await updateNotification.execute({
      id: notification_id,
      read
    });

    return res.json(notification);
  }
}
