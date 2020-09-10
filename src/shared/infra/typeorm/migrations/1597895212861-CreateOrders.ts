import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrders1597895212861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'delivery_name',
            type: 'varchar'
          },
          {
            name: 'delivery_mobile',
            type: 'varchar'
          },
          {
            name: 'is_order_delivering',
            type: 'smallint',
            default: 0
          },
          {
            name: 'delivery_address1',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'delivery_address2',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'delivery_city',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'delivery_state',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'delivery_zip_code',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'delivery_date',
            type: 'timestamp'
          },
          {
            name: 'delivery_time',
            type: 'varchar'
          },
          {
            name: 'order_total',
            type: 'money'
          },
          {
            name: 'is_delivered',
            type: 'smallint',
            default: 0
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
