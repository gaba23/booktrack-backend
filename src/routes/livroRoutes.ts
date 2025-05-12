import express from 'express';
import { LivroRepository } from '../repositories/livroRepository';

const router = express.Router();

router.get('/meus-livros', async (req: any, res) => {
  try {
    const userId = req.user.id;
    const livros = await LivroRepository.findByUser(userId);
    res.json(livros);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
});

export default router;