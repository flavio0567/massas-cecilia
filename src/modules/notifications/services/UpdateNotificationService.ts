import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import INotificationsRepository from '../repositories/INotificationsRepository';

import Notification from '../infra/typeorm/schemas/Notification';

interface IRequest {
  id: string;
  read: boolean;
}

@injectable()
class UpdateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({ id, read }: IRequest): Promise<Notification> {
    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new AppError('Notification not found.');
    }

    notification.read = read;

    return this.notificationsRepository.save(notification);
  }
}

export default UpdateNotificationService;
