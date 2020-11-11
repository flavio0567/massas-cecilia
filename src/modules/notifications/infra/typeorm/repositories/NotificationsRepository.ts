import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import IUpdateNotificationDTO from '@modules/notifications/dtos/IUpdateNotificationDTO';

import Notification from '../schemas/Notification';
// import Orderdetail from '@modules/orders/infra/typeorm/entities/Orderdetail';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async findNotifications(): Promise<Notification[]> {
    const findNotification = await this.ormRepository.find({
      order: {
        created_at: 'DESC'
      }
    });

    return findNotification;
  }

  public async findById(id: string): Promise<Notification | undefined> {
    const findNotification = await this.ormRepository.findOne(id);

    return findNotification;
  }

  public async create({
    content,
    order_id,
    read
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      order_id,
      read
    });

    await this.ormRepository.save(notification);

    return notification;
  }

  public async update(notification: IUpdateNotificationDTO): Promise<any> {
    const { id, read } = notification;

    const updatedNotification = this.ormRepository.update({ id }, { read });

    return updatedNotification;
  }

  public async save(notification: Notification): Promise<Notification> {
    return this.ormRepository.save(notification);
  }
}

export default NotificationsRepository;
