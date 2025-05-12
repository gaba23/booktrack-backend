import express from 'express';
import { UserService } from '../services/userService';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const result = await UserService.register(nome, email, senha);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const result = await UserService.login(email, senha);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;