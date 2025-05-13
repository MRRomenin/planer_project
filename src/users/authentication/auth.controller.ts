import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './DTO/sign-in.dto';
import { AuthGuard } from './auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Вход пользователя (логин)' })
  @ApiResponse({ status: 200, description: 'Успешный вход. Возвращает токен.' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  signIn(@Body() signInDto: SignInDto) { //  Ideally, instead of using the 
  // Record<string, any> type, 
  // we should use a DTO class to define the shape of the request body. 
  // See the validation chapter for more information. 

    // console.log('Received SignInDto:', signInDto);
    return this.authService.signIn(signInDto);
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Получить профиль текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Данные пользователя' })
  @ApiResponse({ status: 401, description: 'Неавторизован' })
  getProfile(@Request() req) {
    // console.log('User data:', req.user); 
    return req.user;
  }
}
