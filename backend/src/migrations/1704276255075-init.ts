import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1704276255075 implements MigrationInterface {
  name = 'Init1704276255075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "some_entity" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                CONSTRAINT "PK_aa9e03817553873454c37ac7cf6" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "some_entity"
        `);
  }
}
