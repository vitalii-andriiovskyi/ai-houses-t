# be-migrations

This library was generated with [Nx](https://nx.dev).

Migrations implementations follows this guide [Nx + TypeORM + NestJS + Migrations](https://dev.to/kasir-barati/nx-typeorm-nestjs-migrations-53an)
The GitHub repository for the original implementation can be found [nestjs-materials_typeorm](https://github.com/kasir-barati/nestjs-materials/tree/main/typeorm)
[CLI settings](https://github.com/kasir-barati/nestjs-materials/blob/main/typeorm/apps/botprobe-nest/project.json)

To automatically generate a new migration, run:

```bash
yarn nx run be-migrations:migration:generate --name MigrationName

# Example:
yarn nx run be-migrations:migration:gen --name initial-migration
```

To manually create a new migration, run:

```bash
yarn nx run be-migrations:migration:create --name MigrationName

# Example:
yarn nx run be-migrations:migration:create --name add-users-table
```

To run migrations, run:

```bash
yarn nx run be-migrations:migration:run
```

To revert migrations, run:

```bash
yarn nx run be-migrations:migration:revert
```
