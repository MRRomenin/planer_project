import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'yan@yan.yan',
    description: 'Электронная почта пользователя',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345',
    description: 'Пароль пользователя',
  })
  @IsString()
  password: string;
}