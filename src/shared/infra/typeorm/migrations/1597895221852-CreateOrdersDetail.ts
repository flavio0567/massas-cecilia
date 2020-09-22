import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export default class CreateOrdersDetail1597895221852
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ordersdetail',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'order_id',
            type: 'varchar'
          },
          {
            name: 'product_id',
            type: 'varchar'
          },
          {
            name: 'sales_price',
            type: 'money'
          },
          {
            name: 'unit',
            type: 'varchar(100)'
          },
          {
            name: 'amount',
            type: 'int'
          },
          {
            name: 'quantity',
            type: 'decimal'
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

    await queryRunner.createForeignKey(
      'ordersdetail',
      new TableForeignKey({
        name: 'DetailOrder',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ordersdetail', 'DetailOrder');

    await queryRunner.dropTable('ordersdetail');
  }
}
