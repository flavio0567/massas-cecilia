import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterProductFieldSubCategory1592245738184
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'sub_category',
        type: 'int',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'sub_category');
  }
}
