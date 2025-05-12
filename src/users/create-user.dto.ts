import { IsString, IsEmail, MinLength, IsNotEmpty} from 'class-validator';

export class CreateUserDto {

  @IsEmail({}, { message: 'Never format email' })
  
  @IsNotEmpty({ message: 'The field email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'The field password cannot be empty' })
  @IsString()
  @MinLength(3)
  password: string;
}