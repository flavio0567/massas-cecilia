import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let faseHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    faseHashProvider = new FakeHashProvider();

    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository, faseHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password: "123456",
      is_admin: 1,
      is_active: 0,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a duplicated email address', async () => {
    await createUser.execute({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: "9254759191",
      password: "123456",
      is_admin: 1,
      is_active: 0,
    });

    await expect(
      createUser.execute({
        avatar: "123",
        name: "Flavio Rocha",
        email: "fmrocha@gmail.com",
        mobile: "9254759191",
        password: "123456",
        is_admin: 1,
        is_active: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
