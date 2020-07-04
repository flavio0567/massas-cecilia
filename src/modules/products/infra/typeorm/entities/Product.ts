import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  barcode: number;

  @Column()
  unit: string;

  @Column()
  sales_price: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
