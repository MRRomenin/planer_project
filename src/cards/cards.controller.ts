import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CardService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
// import { CreateColumnsDto } from './dto/create-column.dto';
import { OwnershipGuard } from '../users/ownership.guard';
import { AuthGuard } from '../users/authentication/auth.guard'; 

import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Cards')
@Controller('/users/:userId/columns/:columnId/cards')
@UseGuards(AuthGuard, OwnershipGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // Создание карточки
  @Post()
  @ApiOperation({ summary: 'Создать карточку в колонке пользователя' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiResponse({ status: 201, description: 'Карточка успешно создана' })
  createCard(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Body() dto: CreateCardDto,
  ) {
    // console.log('Creating card with userId:', userId, 'columnId:', columnId, 'dto:', dto);
    return this.cardService.create(+userId, +columnId, dto); // Три аргумента
  }

  // Получение всех карточек в колонке пользователя
  @Get()
  @ApiOperation({ summary: 'Получить все карточки в колонке' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiResponse({ status: 200, description: 'Список карточек' })
  getCardsByUserAndColumn(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.cardService.getCards(+userId, +columnId);
  }

  // Получение одной карточки
  @Get(':cardId')
  @ApiOperation({ summary: 'Получить карточку по ID' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiResponse({ status: 200, description: 'Карточка найдена' })
  @ApiResponse({ status: 404, description: 'Карточка не найдена' })
  getCard(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.cardService.findOne(+userId, +columnId, +cardId);
  }

  // Обновление карточки
  @Put(':cardId')
  @ApiOperation({ summary: 'Обновить карточку' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiResponse({ status: 200, description: 'Карточка обновлена' })
  updateCard(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
    @Body() dto: UpdateCardDto,
  ) {
    return this.cardService.update(+userId, +columnId, +cardId, dto);
  }

  // Удаление карточки
  @Delete(':cardId')
  @ApiOperation({ summary: 'Удалить карточку' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiResponse({ status: 200, description: 'Карточка удалена' })
  @ApiResponse({ status: 404, description: 'Карточка не найдена' })
  deleteCard(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.cardService.delete(+userId, +columnId, +cardId);
  }

  // @Get(':cardId/comments')
  // getComments(
  //   @Param('cardId') cardId: string,
  // ) {
  //   return this.cardService.getComments(+cardId);
  // }
}