import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comments.entity';
// import { CreateColumnsDto } from './dto/create-column.dto';
import { ColumnEntity } from '../columns/columns.entity';
import { CardEntity} from '../cards/cards.entity';
// import { User } from '../users/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';



@Injectable()
export class CommService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(cardId: number, dto: CreateCommentDto) {
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) throw new NotFoundException('Card not found');

    const comment = this.commentRepository.create({ ...dto, card });
    return this.commentRepository.save(comment);
  }

  async findAll(cardId: number) {
    return this.commentRepository.find({
      where: { card: { id: cardId } },
      relations: ['card'],
    });
  }

  async findOne(cardId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        card: { id: cardId },
      },
      relations: ['card'],
    });
    if (!comment) throw new NotFoundException('Comment not found for this card');
    return comment;
  }

  async update(cardId: number, commentId: number, dto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
      relations: ['card'],
    });
    if (!comment) throw new NotFoundException('Comment not found for this card');

    Object.assign(comment, dto);
    return this.commentRepository.save(comment);
  }

  async delete(cardId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
    });
    if (!comment) throw new NotFoundException('Comment not found for this card');

    return this.commentRepository.remove(comment);
  }
}