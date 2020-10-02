import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import IUpdateNotificationDTO from '../dtos/IUpdateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  findById(id: string): Promise<Notification | undefined>;
  create(data: ICreateNotificationDTO): Promise<Notification>;
  update(data: IUpdateNotificationDTO): Promise<Notification>;
  save(data: Notification): Promise<Notification>;
}
