// import { registerAs } from '@nestjs/config';
// import { config as dotenvConfig } from 'dotenv';
// import { DataSource, DataSourceOptions } from 'typeorm';

// dotenvConfig({ path: '.env' });

// const config = {
//   type: 'postgres',
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   autoLoadEntities: true,
//   synchronize: true,
//   logging: true,
//   dropSchema: false,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migrations/*{.js,.ts}']
// };

// export default registerAs('typeorm', () => config);

// export const connectionSource = new DataSource(config as DataSourceOptions);

import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  dropSchema: false,
  migrations: ['dist/migrations/*{.js,.ts}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  ssl: { rejectUnauthorized: false }
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
