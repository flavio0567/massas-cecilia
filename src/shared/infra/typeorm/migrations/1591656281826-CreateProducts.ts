import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1591656281826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'code',
            type: 'varchar'
          },
          {
            name: 'name',
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
            name: 'barcode',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'ncm',
            type: 'int',
            isNullable: true
          },
          {
            name: 'amount',
            type: 'int',
            isNullable: true,
            default: null
          },
          {
            name: 'product_family',
            type: 'smallint',
            isNullable: true,
            default: null
          },
          {
            name: 'category',
            type: 'smallint',
            isNullable: true,
            default: null
          },
          {
            name: 'sub_category',
            type: 'smallint',
            isNullable: true,
            default: null
          },
          {
            name: 'is_inactive',
            type: 'smallint',
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
