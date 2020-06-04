import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  mobile: number;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ mobile, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByMobile(mobile);

    if (!user) {
      throw new AppError('Incorret credentials combination!', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password_hash
    );

    if (!passwordMatched) {
      throw new AppError('Incorret credentials combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) { throw new Error('Secret not found.')};

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
