import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersAddressRepository from '@modules/users/repositories/IUsersAddressRepository';
import UsersAddressRepository from '@modules/users/infra/typeorm/repositories/UsersAddressRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IOrdersDetailRepository from '@modules/orders/repositories/IOrdersDetailRepository';
import OrdersDetailRepository from '@modules/orders/infra/typeorm/repositories/OrdersDetailRepository';

import IOrdersClosedRepository from '@modules/orders/repositories/IOrdersClosedRepository';
import OrdersClosedRepository from '@modules/orders/infra/typeorm/repositories/OrdersClosedRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersAddressRepository>(
  'UsersAddressRepository',
  UsersAddressRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
);

container.registerSingleton<IOrdersDetailRepository>(
  'OrdersDetailRepository',
  OrdersDetailRepository
);

container.registerSingleton<IOrdersClosedRepository>(
  'OrdersClosedRepository',
  OrdersClosedRepository
);


container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);
