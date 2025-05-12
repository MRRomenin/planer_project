import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { CardEntity } from '../cards/cards.entity';


@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_colum: string;

  @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CardEntity, CardEntity => CardEntity.columns)
  CardEntity: CardEntity[];
}