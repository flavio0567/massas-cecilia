import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class CreatePackingInOrderDetail1605538892700 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('ordersdetail',
      new TableColumn({
        name: 'packing',
        type: 'varchar',
        isNullable: true,
      }));
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ordersdetail', 'packing');
    }

}
