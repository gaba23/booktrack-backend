import { AppDataSource } from '../database/data-source';
import { Livro } from '../entities/Livro';

export class LivroRepository {
  static async findByUser(userId: number): Promise<Livro[]> {
    return AppDataSource.getRepository(Livro).find({
      where: { leitor: { id: userId } },
      relations: ['leitor']
    });
  }

  static async save(livro: Livro): Promise<Livro> {
    return AppDataSource.getRepository(Livro).save(livro);
  }

  static async findOne(options: any): Promise<Livro | null> {
    return AppDataSource.getRepository(Livro).findOne(options);
  }

  static async remove(livro: Livro): Promise<void> {
    await AppDataSource.getRepository(Livro).remove(livro);
  }
}