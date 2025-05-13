import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';

const router = Router();

// Rota para listar usuários
router.get('/listar', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para deletar usuário
router.delete('/deletar/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await userRepository.remove(user);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
