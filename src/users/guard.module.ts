import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnershipGuard } from './ownership.guard';
import { ColumnEntity } from '../columns/columns.entity';
import { CardEntity } from '../cards/cards.entity';
import { CommentEntity } from '../comments/comments.entity';

@Global() // 👈 делает модуль глобальным
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColumnEntity,
      CardEntity,
      CommentEntity,
    ]),
  ],
  providers: [OwnershipGuard],
  exports: [OwnershipGuard], // экспортируем для использования в других модулях
})
export class GuardModule {}