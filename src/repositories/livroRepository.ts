import { AppDataSource } from '../database/data-source';
import { Livro } from '../entities/Livro';

export class LivroRepository {
  static async findByUser(userId: number): Promise<Livro[]> {
    return AppDataSource.getRepository(Livro).find({
      where: { leitor: { id: userId } },
      relations: ['leitor']
    });
  }
}