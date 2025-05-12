import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import authRoutes from './routes/authRoutes';
import livroRoutes from './routes/livroRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware para processar JSON
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/livros', authMiddleware, livroRoutes);

// Tratamento de erros global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: err.message
  });
});

AppDataSource.initialize().then(() => {
  app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
  });
}).catch((err: Error) => {
  console.error('Erro ao conectar com o banco:', err);
});
