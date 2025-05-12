import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Livro } from './Livro';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @Column()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha!: string;

  @OneToMany(() => Livro, (livro: Livro) => livro.leitor)
  livros?: Livro[];
}
