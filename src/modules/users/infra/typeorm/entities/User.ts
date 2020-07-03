import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Address from './Address';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  @Exclude()
  password_hash: string;

  @Column()
  is_admin: number;

  @Column()
  is_active: number;

  @Column()
  avatar: string;

  @Column()
  avatar_url: string;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
