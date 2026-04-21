import { MigrationInterface, QueryRunner } from "typeorm";

export class AiHousesRelations1776192517726 implements MigrationInterface {
    name = 'AiHousesRelations1776192517726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."images_type_enum"
            RENAME TO "images_type_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."images_type_enum" AS ENUM(
                'HeroImage',
                'PreviewImage',
                'ThumbnailImage',
                'OpenGraphImage',
                'TwitterImage',
                'RegularImage'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "images"
            ALTER COLUMN "type" TYPE "public"."images_type_enum" USING "type"::"text"::"public"."images_type_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."images_type_enum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."images_type_enum_old" AS ENUM(
                'HeroImage',
                'PreviewImage',
                'ThumbnailImage',
                'OpenGraphImage',
                'TwitterImage'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "images"
            ALTER COLUMN "type" TYPE "public"."images_type_enum_old" USING "type"::"text"::"public"."images_type_enum_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."images_type_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."images_type_enum_old"
            RENAME TO "images_type_enum"
        `);
    }

}
