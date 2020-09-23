import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
  is_admin: number;
  is_active: number;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    mobile,
    password,
    is_admin,
    is_active
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByMobile(mobile);

    if (!user) {
      throw new AppError('User not found.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    user.name = name;
    user.email = email;
    user.mobile = mobile;
    user.password_hash = hashedPassword;
    is_admin = is_admin;
    is_active = is_active;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
