import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardEntity } from '../cards/cards.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comment: string;

  @ManyToOne(() => CardEntity, CardEntity => CardEntity.comments, { onDelete: 'CASCADE' })
  card: CardEntity;
}