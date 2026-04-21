import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1774619587242 implements MigrationInterface {
    name = 'Initial1774619587242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "seo" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(255) NOT NULL,
                "headline" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "url" character varying(255),
                "keywords" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "imageId" uuid,
                CONSTRAINT "REL_855ffed0346c63b77f86b945b8" UNIQUE ("imageId"),
                CONSTRAINT "PK_1f4d901235e446a56be49bde191" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."images_type_enum" AS ENUM(
                'HeroImage',
                'PreviewImage',
                'ThumbnailImage',
                'OpenGraphImage',
                'TwitterImage'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "images" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "src" character varying(255) NOT NULL,
                "alt" character varying(255) NOT NULL,
                "title" character varying(255),
                "width" integer,
                "height" integer,
                "type" "public"."images_type_enum",
                "caption" character varying(255),
                "description" character varying(255),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ai_houses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "rooms" integer NOT NULL,
                "area" integer NOT NULL,
                "price" integer NOT NULL,
                "available" boolean NOT NULL,
                "features" text,
                "builtYear" TIMESTAMP NOT NULL,
                "lastRenovation" TIMESTAMP,
                "rating" integer NOT NULL,
                "metadata" json,
                "likes" text,
                "url" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "addressId" uuid,
                "ownerId" uuid,
                "seoId" uuid,
                CONSTRAINT "REL_e9b02ee8f7359353b04f208106" UNIQUE ("seoId"),
                CONSTRAINT "PK_d9dd9845d3407f7131c89a7ae3d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "addresses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "address1" character varying(255) NOT NULL,
                "address2" character varying(255),
                "city" character varying(255) NOT NULL,
                "state" character varying(255) NOT NULL,
                "zip" character varying(20) NOT NULL,
                "country" character varying(255) NOT NULL,
                "apt" character varying(255) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(320) NOT NULL,
                "password" character varying(255) NOT NULL,
                "isTemporaryPassword" boolean NOT NULL DEFAULT false,
                "firstName" character varying(255) NOT NULL,
                "lastName" character varying(255) NOT NULL,
                "phone" character varying(20),
                "description" character varying(255),
                "verificationToken" character varying(100),
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
                "recovery" character varying(255),
                "isRecovered" boolean NOT NULL DEFAULT false,
                "emailVerified" TIMESTAMP,
                "blockBefore" bigint,
                "attempts" json NOT NULL DEFAULT '[]',
                "deletedDate" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "addressId" uuid,
                "imageId" uuid,
                "aiHousesId" uuid,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ai_houses_images_images" (
                "aiHousesId" uuid NOT NULL,
                "imagesId" uuid NOT NULL,
                CONSTRAINT "PK_a79d7c6cc855a59dc5183dc113b" PRIMARY KEY ("aiHousesId", "imagesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5b34d84267411f3a7e436a9e5a" ON "ai_houses_images_images" ("aiHousesId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f46117121f65ab2549a2556d74" ON "ai_houses_images_images" ("imagesId")
        `);
        await queryRunner.query(`
            ALTER TABLE "seo"
            ADD CONSTRAINT "FK_855ffed0346c63b77f86b945b8a" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses"
            ADD CONSTRAINT "FK_f8c59e2f301abc6c71e271d2381" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses"
            ADD CONSTRAINT "FK_c6ffff82e294ccae7d78212ae22" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses"
            ADD CONSTRAINT "FK_e9b02ee8f7359353b04f2081063" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_8d4cda1e3867b1090f35e5463d6" FOREIGN KEY ("aiHousesId") REFERENCES "ai_houses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses_images_images"
            ADD CONSTRAINT "FK_5b34d84267411f3a7e436a9e5ab" FOREIGN KEY ("aiHousesId") REFERENCES "ai_houses"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses_images_images"
            ADD CONSTRAINT "FK_f46117121f65ab2549a2556d74d" FOREIGN KEY ("imagesId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "ai_houses_images_images" DROP CONSTRAINT "FK_f46117121f65ab2549a2556d74d"
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses_images_images" DROP CONSTRAINT "FK_5b34d84267411f3a7e436a9e5ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_8d4cda1e3867b1090f35e5463d6"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses" DROP CONSTRAINT "FK_e9b02ee8f7359353b04f2081063"
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses" DROP CONSTRAINT "FK_c6ffff82e294ccae7d78212ae22"
        `);
        await queryRunner.query(`
            ALTER TABLE "ai_houses" DROP CONSTRAINT "FK_f8c59e2f301abc6c71e271d2381"
        `);
        await queryRunner.query(`
            ALTER TABLE "seo" DROP CONSTRAINT "FK_855ffed0346c63b77f86b945b8a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f46117121f65ab2549a2556d74"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_5b34d84267411f3a7e436a9e5a"
        `);
        await queryRunner.query(`
            DROP TABLE "ai_houses_images_images"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "addresses"
        `);
        await queryRunner.query(`
            DROP TABLE "ai_houses"
        `);
        await queryRunner.query(`
            DROP TABLE "images"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."images_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "seo"
        `);
    }

}
