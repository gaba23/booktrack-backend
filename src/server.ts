import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './database/data-source';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}).catch((err: Error) => console.error('Erro ao conectar com o banco:', err));
