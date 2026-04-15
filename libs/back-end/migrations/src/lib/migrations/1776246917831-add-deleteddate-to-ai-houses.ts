import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteddateToAiHouses1776246917831 implements MigrationInterface {
    name = 'AddDeleteddateToAiHouses1776246917831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "ai_houses"
            ADD "deletedDate" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "ai_houses" DROP COLUMN "deletedDate"
        `);
    }

}
