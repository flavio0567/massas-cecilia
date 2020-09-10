import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  avatar: string;
  name: string;
  email?: string;
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
    is_active
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByMobile(mobile);

    if (checkUserExists) {
      return checkUserExists;
    }

    let hashedPassword;

    if (password) {
      hashedPassword = await this.hashProvider.generateHash(password);
    } else {
      hashedPassword = '';
    }

    const user = await this.usersRepository.create({
      avatar,
      name,
      email,
      mobile,
      password_hash: hashedPassword,
      is_admin,
      is_active
    });

    return user;
  }
}

export default CreateUserService;
