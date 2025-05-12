import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { CardEntity } from '../cards/cards.entity';
import { CommService } from './comments.service';
import { CommentController } from './comments.controller';
import { User } from '../users/user.entity';
import { OwnershipGuard } from '../users/ownership.guard';
import { ColumnEntity } from '../columns/columns.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CardEntity, ColumnEntity])],
  providers: [CommService, OwnershipGuard],
  controllers: [CommentController],
  exports: [TypeOrmModule], // 
})
export class CommentModule {}