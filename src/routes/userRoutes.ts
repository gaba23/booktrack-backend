import { Router } from 'express';
import { addUser, getUsers } from '../services/userService';

const router = Router();

// Rota para adicionar um usuário
router.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await addUser(name, email);
  res.status(201).json(user);
});

// Rota para listar usuários
router.get('/users', async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

export default router;
