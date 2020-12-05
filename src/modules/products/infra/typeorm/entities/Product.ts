import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import uploadConfig from '../../../../../config/upload';

import Orderdetail from '../../../../orders/infra/typeorm/entities/Orderdetail';

import { Expose } from 'class-transformer';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  sales_price: number;

  @Column()
  unit: string;

  @Column()
  barcode: number;

  @Column()
  ncm: number;

  @Column()
  amount: number;

  @Column()
  product_family: number;

  @Column()
  category: number;

  @Column()
  sub_category: number;

  @Column()
  is_inactive: number;

  @Column()
  exception: number;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }

  @OneToMany(
    () => Orderdetail,
    ordersdetail => ordersdetail.product
  )
  ordersdetail: Orderdetail[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
