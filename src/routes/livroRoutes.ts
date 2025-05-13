import express from 'express';
import { LivroRepository } from '../repositories/livroRepository';
import { Livro } from '../entities/Livro';
import { validate } from 'class-validator';
import { LivroStatus } from '../types/LivroStatus';

const router = express.Router();

router.get('/meus-livros', async (req: any, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const userId = req.user.id;
    const livros = await LivroRepository.findByUser(userId);
    res.json(livros);
  } catch (error: any) {
    res.status(500).json({ message: `Erro ao buscar livros: ${error.message}` });
  }
});

router.post('/adicionar', async (req: any, res) => {
  try {
    const userId = req.user.id;
    const livroData = new Livro();
    Object.assign(livroData, req.body);
    livroData.id_leitor = userId;

    const errors = await validate(livroData);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const livro = await LivroRepository.save(livroData);
    res.status(201).json(livro);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao adicionar livro' });
  }
});

router.put('/editar/:id', async (req: any, res) => {
  try {
    const userId = req.user.id;
    const livroId = parseInt(req.params.id);
    
    const livroExistente = await LivroRepository.findOne({ where: { id: livroId, id_leitor: userId } });
    if (!livroExistente) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    if (livroExistente.status === LivroStatus.Lido) {
      return res.status(403).json({ message: 'Livros com status "Lido" não podem ser editados' });
    }

    Object.assign(livroExistente, req.body);
    const errors = await validate(livroExistente);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const livroAtualizado = await LivroRepository.save(livroExistente);
    res.json(livroAtualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao editar livro' });
  }
});

router.delete('/excluir/:id', async (req: any, res) => {
  try {
    const userId = req.user.id;
    const livroId = parseInt(req.params.id);
    
    const livroExistente = await LivroRepository.findOne({ where: { id: livroId, id_leitor: userId } });
    if (!livroExistente) {
      return res.status(404).json({ message: 'Livro não foi encontrado' });
    }

    await LivroRepository.remove(livroExistente);
    res.json({ message: 'Livro excluído com sucesso' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao excluir livro' });
  }
});

export default router;