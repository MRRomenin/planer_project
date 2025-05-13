import { IsString, IsEmail, MinLength, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsEmail({}, { message: 'Неверный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  email: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'Пароль пользователя (не менее 3 символов)',
  })
  @IsNotEmpty({ message: 'Поле password не может быть пустым' })
  @IsString()
  @MinLength(3)
  password: string;
}