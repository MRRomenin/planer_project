import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CommService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '../users/authentication/auth.guard';
import { OwnershipGuard } from '../users/ownership.guard';

import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')

@UseGuards(AuthGuard, OwnershipGuard)
export class CommentController {
  constructor(private readonly commService: CommService) {}

  @Post()
  createComment(
    @Param('cardId') cardId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commService.create(+cardId, dto);
  }

  @Get()
  getAllComments(
    @Param('cardId') cardId: string,
  ) {
    return this.commService.findAll(+cardId);
  }

  @Get(':commentId')
  getCommentById(
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commService.findOne(+cardId, +commentId);
  }

  @Put(':commentId')
  updateComment(
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commService.update(+cardId, +commentId, dto);
  }

  @Delete(':commentId')
  deleteComment(
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commService.delete(+cardId, +commentId);
  }
}
