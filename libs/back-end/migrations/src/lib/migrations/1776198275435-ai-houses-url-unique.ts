import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiHousesUrlUnique1776198275435 implements MigrationInterface {
  name = 'AiHousesUrlUnique1776198275435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "ai_houses" ALTER COLUMN "description" TYPE character varying(1000);
        `);
    await queryRunner.query(`
            ALTER TABLE "ai_houses"
            ADD CONSTRAINT "UQ_f4bdd354c4c2cf513a0b72a8df4" UNIQUE ("url")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "ai_houses" DROP CONSTRAINT "UQ_f4bdd354c4c2cf513a0b72a8df4"
        `);
    await queryRunner.query(`
            ALTER TABLE "ai_houses" ALTER COLUMN "description" TYPE character varying(255);
        `);
  }
}
