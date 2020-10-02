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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Orderdetail;
