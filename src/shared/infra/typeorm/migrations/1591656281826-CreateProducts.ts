import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1591656281826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            default: 'newid()'
          },
          {
            name: 'code',
            type: 'varchar'
            // isUnique: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'barcode',
            type: 'varchar'
            // isUnique: true
          },
          {
            name: 'unit',
            type: 'varchar'
          },
          {
            name: 'sales_price',
            type: 'decimal'
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
            type: 'varchar',
            default: 0
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'datetime2',
            default: 'sysdatetime()'
          },
          {
            name: 'updated_at',
            type: 'datetime2',
            default: 'sysdatetime()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
