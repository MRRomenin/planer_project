import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './columns.entity';
import { CreateColumnsDto } from './dto/create-column.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Метод для создания колонки
  async create(userId: number, dto: CreateColumnsDto): Promise<ColumnEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');  // Если пользователь не найден, выбрасываем ошибку

    const column = this.columnRepository.create({
      title_colum: dto.title_colum,
      user: user,
    });

    return this.columnRepository.save(column);  // Сохраняем колонку и возвращаем её
  }

  // Метод для получения всех колонок пользователя
  async findAll(userId: number): Promise<ColumnEntity[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');  // Если пользователь не найден, выбрасываем ошибку

    return this.columnRepository.find({ where: { user: { id: userId } } });  // Находим все колонки, принадлежащие пользователю
  }

  // Метод для получения колонки по userId и columnId
  async findOne(userId: number, columnId: number): Promise<ColumnEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');  // Если пользователь не найден, выбрасываем ошибку

    const column = await this.columnRepository.findOne({ where: { id: columnId, user: { id: userId } } });
    if (!column) throw new NotFoundException('Column not found');  // Если колонка не найдена, выбрасываем ошибку

    return column;  // Возвращаем найденную колонку
  }

  // Метод для обновления колонки
  async update(userId: number, columnId: number, dto: CreateColumnsDto): Promise<ColumnEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');  // Если пользователь не найден, выбрасываем ошибку

    const column = await this.columnRepository.findOne({ where: { id: columnId, user: { id: userId } } });
    if (!column) throw new NotFoundException('Column not found');  // Если колонка не найдена, выбрасываем ошибку

    column.title_colum = dto.title_colum;  // Обновляем название колонки

    return this.columnRepository.save(column);  // Сохраняем обновленную колонку
  }

  // Метод для удаления колонки
  async remove(userId: number, columnId: number): Promise<void> {
    const column = await this.columnRepository.findOne({
      where: { id: columnId },
      relations: ['user'],
    });

    if (!column || column.user.id !== userId) {
      throw new NotFoundException('Column not found for this user');  // Если колонка не найдена для данного пользователя
    }

    await this.columnRepository.remove(column);  // Удаляем колонку
  }
}