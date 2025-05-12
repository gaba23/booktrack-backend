import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Livro } from '../entities/Livro';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: true,
  logging: true,
  entities: [User, Livro],
  migrations: [],
  subscribers: [],
  
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000
  },
  
  poolSize: 10
});