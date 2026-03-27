import { DataSource } from 'typeorm';
// import * as glob from "glob";
// import { resolve } from "path";

// import { ImageEntity } from '@be/image';
// import { AddressEntity } from '@be/address';
// import { SeoEntity } from '@be/seo';
// import { UserEntity } from '@be/user';
// import { AiHouseEntity } from '@be/ai-house';

// function getEntities(): string[] {
//   const entityFiles = glob.sync("../features/**/*.entity.ts");
//   console.log('entityFiles', entityFiles)

//   return entityFiles.map(file => {
//     // Dynamically require the file
//     const module = require(resolve(file));
//     // Return the exported class (assumes 'export class ...')
//     return Object.values(module)[0] as string; // Cast to string, as TypeORM expects entity paths as strings
//   });
// }

const DataSourceConfig = new DataSource({
  type: 'postgres',
  host: process.env['DATABASE_HOST'],
  port: Number(process.env['DATABASE_PORT']),
  username: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
  migrations: ['src/lib/migrations/**/*.ts'],
  // entities: [ImageEntity, AddressEntity, SeoEntity, UserEntity, AiHouseEntity],
  // entities: getEntities(), // Use the function to get entity paths dynamically
  entities: ['../**/*.entity{.ts,.js}'], // it's not totally clear how it finds all entities, but it works
  synchronize: false,
  migrationsTableName: 'migrations',
});

export default DataSourceConfig;