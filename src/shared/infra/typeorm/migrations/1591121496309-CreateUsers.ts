import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1591121496309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
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
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'is_admin',
            type: 'smallint',
            default: 0
          },
          {
            name: 'is_active',
            type: 'smallint',
            default: 1
          },
          {
            name: 'mobile',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password_hash',
            type: 'varchar'
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
    await queryRunner.dropTable('users');
  }
}
