import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
// import { UsersService } from '../users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
   imports: [
      UsersModule,
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
      }),
    ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}