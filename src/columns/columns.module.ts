import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './columns.entity';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { User } from '../users/user.entity';
import { OwnershipGuard } from '../users/ownership.guard';

import { CardEntity } from '../cards/cards.entity';
import { CommentEntity } from '../comments/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, User, CardEntity, CommentEntity])],
  providers: [ColumnsService, OwnershipGuard],
  controllers: [ColumnsController],
})

export class ColumModule {}