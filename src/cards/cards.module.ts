import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './cards.entity';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { ColumnEntity } from '../columns/columns.entity';
import { CommentModule } from '../comments/comments.module'; // 👈 добавь импорт
import { OwnershipGuard } from '../users/ownership.guard';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, User, ColumnEntity]), CommentModule],
  providers: [CardService, OwnershipGuard],
  controllers: [CardController],
})
export class CardsModule {}