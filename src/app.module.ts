import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/authentication/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'roman',
    password: '12345',
    database: 'db_dependence',
    entities: [User],
    synchronize: true,
  }),
  UsersModule, AuthModule
  ],
})



export class AppModule {}
