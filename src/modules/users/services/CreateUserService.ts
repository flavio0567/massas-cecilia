import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  avatar: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  is_admin: number;
  is_active: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    avatar,
    name,
    email,
    mobile,
    password,
    is_admin,
    is_active,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail address already used.', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      avatar,
      name,
      email,
      mobile,
      password_hash: hashedPassword,
      is_admin,
      is_active,
    });

    return user;
  }
}

export default CreateUserService;
