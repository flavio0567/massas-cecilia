import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class CreateProductNameInOrderDetail1604588756855 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('ordersdetail',
      new TableColumn({
        name: 'product_name',
        type: 'varchar',
        isNullable: true,
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ordersdetail', 'product_name');
    }

}
