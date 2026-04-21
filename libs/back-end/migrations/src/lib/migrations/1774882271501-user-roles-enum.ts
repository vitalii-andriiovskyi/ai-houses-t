import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRolesEnum1774882271501 implements MigrationInterface {
    name = 'UserRolesEnum1774882271501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."users_role_enum"
            RENAME TO "users_roles_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "roles"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."users_roles_enum"
            RENAME TO "users_role_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'
        `);
    }

}
