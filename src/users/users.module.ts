
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ColumnEntity } from '../columns/columns.entity';
import { ColumnsService } from '../columns/columns.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ColumnEntity])],
  providers: [UsersService, ColumnsService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
