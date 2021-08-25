import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn
} from 'typeorm';

@Entity('timeframes')
class Timeframe {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: true })
  start: string;

  @Column({ nullable: true })
  end: string;

  @Column()
  weekday: string;

  @Column({ default: 'true' })
  available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Timeframe;
