import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class CreatePaymentMethodInOrder1608067861920 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('orders',
      new TableColumn({
        name: 'payment_method',
        type: 'smallint',
        isNullable: true
      }));
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'payment_method');
    }

}
