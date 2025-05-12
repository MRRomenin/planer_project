import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { User } from './users/user.entity';
import { ColumnEntity } from './columns/columns.entity';
import { CardEntity } from './cards/cards.entity';
import { CommentEntity } from './comments/comments.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/authentication/auth.module';
import { ColumModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentModule } from './comments/comments.module';
import { GuardModule } from './users/guard.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'roman',
    password: '12345',
    database: 'db_dependence',
    entities: [User, ColumnEntity, CardEntity, CommentEntity],
    synchronize: true,
  }),
  UsersModule, AuthModule, ColumModule, CardsModule, CommentModule, GuardModule
  ],
})

export class AppModule {}
