import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

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
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
