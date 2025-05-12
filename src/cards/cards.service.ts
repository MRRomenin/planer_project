import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './cards.entity';

import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
// import { CreateColumnsDto } from './dto/create-column.dto';
import { ColumnEntity } from '../columns/columns.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,

    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, columnId: number, dto: CreateCardDto) {
    const column = await this.columnRepository.findOne({
      where: { id: columnId, user: { id: userId } },
      relations: ['user'],
    });
    if (!column) throw new NotFoundException('Column not found for this user');

    const card = this.cardRepository.create({ ...dto, columns: column });
    return this.cardRepository.save(card);
  }

  async getCards(userId: number, columnId: number) {
    return this.cardRepository.find({
      where: {
        columns: { id: columnId, user: { id: userId } },
      },
      relations: ['columns', 'columns.user'],
    });
  }

  async findOne(userId: number, columnId: number, cardId: number) {
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
        columns: {
          id: columnId,
          user: { id: userId },
        },
      },
      relations: ['columns', 'columns.user', 'comments'],
    });
    if (!card) throw new NotFoundException('Card not found for this user/column');
    return card;
  }

  async update(userId: number, columnId: number, cardId: number, dto: UpdateCardDto) {
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
        columns: { id: columnId, user: { id: userId } },
      },
      relations: ['columns', 'columns.user'],
    });
    if (!card) throw new NotFoundException('Card not found for this user/column');

    Object.assign(card, dto);
    return this.cardRepository.save(card);
  }

  async delete(userId: number, columnId: number, cardId: number) {
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
        columns: { id: columnId, user: { id: userId } },
      },
      relations: ['columns', 'columns.user'],
    });
    if (!card) throw new NotFoundException('Card not found for this user/column');

    return this.cardRepository.remove(card);
  }
}