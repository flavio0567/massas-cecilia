import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFiles1591659076658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            default: 'newid()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'path',
            type: 'varchar',
            isUnique: true
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
    await queryRunner.dropTable('files');
  }
}
