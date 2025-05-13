import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CommService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '../users/authentication/auth.guard';
import { OwnershipGuard } from '../users/ownership.guard';

import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Comments')
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')

@UseGuards(AuthGuard, OwnershipGuard)
export class CommentController {
  constructor(private readonly commService: CommService) {}

  @Post()
  @ApiOperation({ summary: 'Создать комментарий для карточки' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiResponse({ status: 201, description: 'Комментарий создан' })
  createComment(
    @Param('cardId') cardId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commService.create(+cardId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все комментарии карточки' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiResponse({ status: 200, description: 'Список комментариев' })
  getAllComments(
    @Param('cardId') cardId: string,
  ) {
    return this.commService.findAll(+cardId);
  }

  @Get(':commentId')
  @ApiOperation({ summary: 'Получить конкретный комментарий по ID' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiParam({ name: 'commentId', type: Number })
  @ApiResponse({ status: 200, description: 'Комментарий найден' })
  @ApiResponse({ status: 404, description: 'Комментарий не найден' })
  getCommentById(
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commService.findOne(+cardId, +commentId);
  }

  @Put(':commentId')
  @ApiOperation({ summary: 'Обновить комментарий по ID' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiParam({ name: 'commentId', type: Number })
  @ApiResponse({ status: 200, description: 'Комментарий обновлён' })
  updateComment(
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commService.update(+cardId, +commentId, dto);
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Удалить комментарий по ID' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'columnId', type: Number })
  @ApiParam({ name: 'cardId', type: Number })
  @ApiParam({ name: 'commentId', type: Number })
  @ApiResponse({ status: 200, description: 'Комментарий удалён' })
  @ApiResponse({ status: 404, description: 'Комментарий не найден' })
  deleteComment(
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commService.delete(+cardId, +commentId);
  }
}
