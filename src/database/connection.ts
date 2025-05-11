import { Client } from 'pg';
import { config } from 'dotenv';

config();

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((err: Error) => console.error('Erro ao conectar ao banco de dados', err));

export default client;
