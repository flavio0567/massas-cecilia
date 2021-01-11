import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import Orderdetail from './Orderdetail';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  delivery_name: string;

  @Column()
  delivery_mobile: string;

  @Column()
  is_order_delivering: number;

  @Column()
  delivery_address1: string;

  @Column()
  delivery_address2: string;

  @Column()
  delivery_city: string;

  @Column()
  delivery_state: string;

  @Column()
  delivery_zip_code: string;

  @Column()
  delivery_date: Date;

  @Column()
  delivery_time: string;

  @Column()
  order_total: number;

  @Column()
  is_delivered: number;

  @Column()
  payment_method: number;

  @OneToMany(
    () => Orderdetail,
    orderdetail => orderdetail.order
  )
  ordersdetail: Orderdetail[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
