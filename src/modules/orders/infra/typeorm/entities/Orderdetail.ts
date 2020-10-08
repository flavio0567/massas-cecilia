import { DecimalDataType } from 'sequelize/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Order from './Order';
import Product from '../../../../products/infra/typeorm/entities/Product';

@Entity('ordersdetail')
class Orderdetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  sales_price: number;

  @Column()
  unit: string;

  @Column()
  amount: number;

  @Column()
  quantity: number;

  @ManyToOne(
    () => Order,
    order => order.ordersdetail
  )
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(
    () => Product,
    product => product.ordersdetail
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Orderdetail;
