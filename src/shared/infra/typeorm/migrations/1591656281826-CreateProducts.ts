import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1591656281826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'code',
            type: 'int'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'barcode',
            type: 'varchar'
          },
          {
            name: 'unit',
            type: 'varchar'
          },
          {
            name: 'sales_price',
            type: 'numeric(10,2)'
          },
          {
            name: 'ncm',
            type: 'int'
          },
          {
            name: 'product_family',
            type: 'int',
            isNullable: true
          },
          {
            name: 'category',
            type: 'int',
            isNullable: true
          },
          {
            name: 'sub_category',
            type: 'int',
            isNullable: true
          },
          {
            name: 'is_active',
            type: 'int',
            default: 1,
            isNullable: true
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            isNullable: true
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
    await queryRunner.dropTable('products');
  }
}
