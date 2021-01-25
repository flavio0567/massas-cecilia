import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findUsers(): Promise<User[] | undefined> {
    const findUsers = await this.ormRepository.find(
      {
      order: {
        name: 'ASC'
      }
    }
    );

    return findUsers;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByMobile(mobile: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { mobile }
    });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email }
    });

    return findUser;
  }

  public async create({
    name,
    email,
    mobile,
    password_hash,
    is_admin,
    is_active
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      mobile,
      password_hash,
      is_admin,
      is_active
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async update({
    name,
    email,
    mobile,
    password_hash,
    is_admin,
    is_active
  }: IUpdateUserDTO): Promise<any> {
    const updatedUser = this.ormRepository.update(
      { mobile },
      {
        name,
        email,
        mobile,
        password_hash,
        is_admin,
        is_active
      }
    );

    return updatedUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
