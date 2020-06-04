import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUserTokens1591121517442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'user_tokens',
          columns: [
            {
              name: 'id',
              type: 'uniqueidentifier',
              isPrimary: true,
              default: 'newid()',
            },
            {
              name: 'user_id',
              type: 'uniqueidentifier',
              default: 'newid()',
            },
            {
              name: 'token',
              type: 'uniqueidentifier',
              default: 'newid()',
            },
            {
              name: 'created_at',
              type: 'datetime2',
              default: 'sysdatetime()',
            },
            {
              name: 'updated_at',
              type: 'datetime2',
              default: 'sysdatetime()',
            },
          ],
          foreignKeys: [
            {
              name: 'TokenUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
          ],
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_tokens');
    }

}
