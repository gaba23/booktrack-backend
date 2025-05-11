import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../database/data-source';
import { Livro } from '../entities/Livro';

export const checkLivroOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const livroId = parseInt(req.params.id);
    const userId = req.user?.id;

    const livroRepo = AppDataSource.getRepository(Livro);
    const livro = await livroRepo.findOneBy({ id: livroId });

    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    if (livro.id_leitor !== userId) {
      return res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar permissão' });
  }
}; 