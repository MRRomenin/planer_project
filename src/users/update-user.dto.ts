import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';



export class UpdateUserDto extends PartialType(CreateUserDto) {

   @ApiPropertyOptional({
    example: 'newuser@example.com',
    description: 'Новый email пользователя',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'newpassword',
    description: 'Новый пароль пользователя',
  })
  password?: string;

}