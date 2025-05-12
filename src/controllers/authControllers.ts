import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import { hashPassword, comparePassword } from '../services/authService';
import jwt from 'jsonwebtoken';

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;
  try {
    const exists = await userRepo.findOneBy({ email });
    if (exists) return res.status(400).json({ message: 'Email já cadastrado.' });

    const hashed = await hashPassword(senha);
    const user = userRepo.create({ nome, email, senha: hashed });
    await userRepo.save(user);

    res.status(201).json({ message: 'Usuário criado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  try {
    const user = await userRepo.findOneBy({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const valid = await comparePassword(senha, user.senha);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: 'Erro ao fazer login.', details: err.message });
  }
};
