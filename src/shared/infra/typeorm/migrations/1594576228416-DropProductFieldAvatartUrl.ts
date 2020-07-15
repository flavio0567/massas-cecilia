import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DropProductFieldAvatartUrl1594576228416
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'avatar_url');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true
      })
    );
  }
}
