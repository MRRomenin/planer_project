
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ColumnEntity } from '../columns/columns.entity';
import { ColumnsService } from '../columns/columns.service';
import { User } from './user.entity';
import { OwnershipGuard } from '../users/ownership.guard';
import { CardEntity } from '../cards/cards.entity';
import { CommentEntity } from '../comments/comments.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, ColumnEntity, ColumnEntity, CardEntity, CommentEntity])],
  providers: [UsersService, ColumnsService, OwnershipGuard],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
