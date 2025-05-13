import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Livro } from './Livro';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  nome!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @Column()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha!: string;

  @OneToMany(() => Livro, (livro: Livro) => livro.leitor, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  livros?: Livro[];
}

// Coloquei o modo de deletar o usuário em cascata para que todos os livros do usuário sejam deletados quando o usuário for deletado
