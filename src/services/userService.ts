import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
  private static userRepository = AppDataSource.getRepository(User);

  static async register(nome: string, email: string, senha: string) {
    const emailExistente = await this.userRepository.findOne({ where: { email } });
    if (emailExistente) {
      throw new Error('E-mail já está em uso');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = this.userRepository.create({
      nome,
      email,
      senha: hashedPassword
    });

    await this.userRepository.save(novoUsuario);

    const token = jwt.sign({ id: novoUsuario.id }, process.env.JWT_SECRET!, { 
      expiresIn: '1h' 
    });

    return { user: novoUsuario, token };
  }

  static async login(email: string, senha: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('E-mail não cadastrado');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    return { user, token };
  }
}