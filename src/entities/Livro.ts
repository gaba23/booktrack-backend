import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, JoinColumn, ManyToOne } from 'typeorm';
import { LivroStatus } from '../types/LivroStatus';
import { Length, Min, Max, ValidateIf } from 'class-validator';
import { User } from './User';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100, { message: 'O título deve ter entre 3 e 100 caracteres' })
  titulo!: string;

  @Column({ nullable: true })
  autor?: string;

  @Column({
    type: 'enum',
    enum: LivroStatus,
    default: LivroStatus.QueroLer
  })
  status!: LivroStatus;

  @Column({ nullable: true })
  @ValidateIf((o) => o.status === LivroStatus.Lido)
  @Min(1, { message: 'A avaliação deve ser no mínimo 1' })
  @Max(5, { message: 'A avaliação deve ser no máximo 5' })
  avaliacao?: number;

  @Column({ nullable: true })
  data_conclusao?: Date;

  @Column()
  id_leitor!: number;

  @BeforeUpdate()
  updateDataConclusao() {
    if (this.status === LivroStatus.Lido && !this.data_conclusao) {
      this.data_conclusao = new Date();
    }
  }

  @ManyToOne(() => User, (user: User) => user.livros, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'id_leitor' })
  leitor!: User;
}
