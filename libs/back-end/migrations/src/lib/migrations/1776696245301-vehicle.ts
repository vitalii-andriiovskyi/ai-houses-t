import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicle1776696245301 implements MigrationInterface {
    name = 'Vehicle1776696245301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "vehicles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "description" character varying(1000) NOT NULL,
                "url" character varying(255) NOT NULL,
                "doors" integer NOT NULL,
                "seats" integer NOT NULL,
                "year" integer NOT NULL,
                "mileage" integer,
                "color" character varying(255) NOT NULL,
                "model" character varying(255) NOT NULL,
                "price" integer NOT NULL,
                "available" boolean NOT NULL DEFAULT true,
                "deletedDate" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "previewImageId" uuid,
                "ownerId" uuid,
                "seoId" uuid,
                CONSTRAINT "UQ_5355e93a3aeb7ca9456a5a9dc39" UNIQUE ("url"),
                CONSTRAINT "REL_2bef212e9e4374c6c543cf1d94" UNIQUE ("seoId"),
                CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "vehicles_images_images" (
                "vehiclesId" uuid NOT NULL,
                "imagesId" uuid NOT NULL,
                CONSTRAINT "PK_0319442b1312ea20c4cba26990f" PRIMARY KEY ("vehiclesId", "imagesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9fb7f61efd2824f333df86e113" ON "vehicles_images_images" ("vehiclesId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a85e6727b692801fa3e9fe4f33" ON "vehicles_images_images" ("imagesId")
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles"
            ADD CONSTRAINT "FK_25cf2a11c08e09a4f37a83772cc" FOREIGN KEY ("previewImageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles"
            ADD CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles"
            ADD CONSTRAINT "FK_2bef212e9e4374c6c543cf1d942" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles_images_images"
            ADD CONSTRAINT "FK_9fb7f61efd2824f333df86e113e" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles_images_images"
            ADD CONSTRAINT "FK_a85e6727b692801fa3e9fe4f339" FOREIGN KEY ("imagesId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "vehicles_images_images" DROP CONSTRAINT "FK_a85e6727b692801fa3e9fe4f339"
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles_images_images" DROP CONSTRAINT "FK_9fb7f61efd2824f333df86e113e"
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles" DROP CONSTRAINT "FK_2bef212e9e4374c6c543cf1d942"
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles" DROP CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80"
        `);
        await queryRunner.query(`
            ALTER TABLE "vehicles" DROP CONSTRAINT "FK_25cf2a11c08e09a4f37a83772cc"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a85e6727b692801fa3e9fe4f33"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9fb7f61efd2824f333df86e113"
        `);
        await queryRunner.query(`
            DROP TABLE "vehicles_images_images"
        `);
        await queryRunner.query(`
            DROP TABLE "vehicles"
        `);
    }

}
