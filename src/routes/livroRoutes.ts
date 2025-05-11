import { Router } from 'express';
import { checkLivroOwner, authMiddleware } from '../middlewares';

const router = Router();

// Todas as rotas precisam de autenticação
router.use(authMiddleware);

// Rotas que precisam verificar se o usuário é dono do livro
router.put('/livros/:id', checkLivroOwner, async (req, res) => {
  // Lógica para atualizar o livro
});

router.delete('/livros/:id', checkLivroOwner, async (req, res) => {
  // Lógica para deletar o livro
});

// Rotas que não precisam verificar o dono
router.get('/livros', async (req, res) => {
  // Lógica para listar livros
});

router.post('/livros', async (req, res) => {
  // Lógica para criar livro
});

export default router; 