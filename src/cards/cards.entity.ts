import { Entity, PrimaryGeneratedColumn, Column as ORMColumn, ManyToOne, OneToMany } from 'typeorm';
import { ColumnEntity } from '../columns/columns.entity';
import { CommentEntity } from '../comments/comments.entity';


@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ORMColumn()
  title_card: string;

  @ManyToOne(() => ColumnEntity, columns => columns.CardEntity, { onDelete: 'CASCADE' })
  columns: ColumnEntity;

  @OneToMany(() => CommentEntity, CommentEntity => CommentEntity.card)
  comments: Comment[];
}