import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to Authenticate a user', async () => {
    const user = await createUser.execute({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: 9254759191,
      password: "123456",
      is_admin: 1,
      is_active: 0,
    });

    const response = await authenticateUser.execute({
      mobile: 9254759191,
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to Authenticate with a non-existing user', async () => {
    await expect(
      authenticateUser.execute({
        mobile: 9999999999,
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to Authenticate with incorrect password', async () => {
    await createUser.execute({
      avatar: "123",
      name: "Flavio Rocha",
      email: "fmrocha@gmail.com",
      mobile: 9254759191,
      password: "123456",
      is_admin: 1,
      is_active: 0,
    });

    await expect(
      authenticateUser.execute({
        mobile:  9254759191,
        password: '654321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
