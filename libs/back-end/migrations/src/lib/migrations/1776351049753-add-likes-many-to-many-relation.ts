import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLikesManyToManyRelation1776351049753 implements MigrationInterface {
    name = 'AddLikesManyToManyRelation1776351049753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "ai_houses_likes_users" (
                "aiHousesId" uuid NOT NULL,
                "usersId" uuid NOT NULL,
                CONSTRAINT "PK_283364afd4059001d639196838b" PRIMARY KEY ("aiHousesId", "usersId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2ab33165b2bc3d204d1950fbd" ON "ai_houses_likes_users" ("aiHousesId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_796c6b2380aa9d46659605b8b6" ON "ai_houses_likes_users" ("usersId")
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses" DROP COLUMN "likes"
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses_likes_users"
            ADD CONSTRAINT "FK_b2ab33165b2bc3d204d1950fbd9" FOREIGN KEY ("aiHousesId") REFERENCES "ai_houses"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses_likes_users"
            ADD CONSTRAINT "FK_796c6b2380aa9d46659605b8b6b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "ai_houses_likes_users" DROP CONSTRAINT "FK_796c6b2380aa9d46659605b8b6b"
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses_likes_users" DROP CONSTRAINT "FK_b2ab33165b2bc3d204d1950fbd9"
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses"
            ADD "likes" text
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_796c6b2380aa9d46659605b8b6"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b2ab33165b2bc3d204d1950fbd"
        `);
        await queryRunner.query(`
            DROP TABLE "ai_houses_likes_users"
        `);
    }

}
