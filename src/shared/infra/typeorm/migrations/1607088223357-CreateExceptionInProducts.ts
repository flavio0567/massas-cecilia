import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class CreateExceptionInProducts1607088223357 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'exception',
        type: 'smallint',
        isNullable: true
      }));
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'exception');
    }

}
