import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber} from 'class-validator';


export class CreateColumnsDto {
  @IsString()
  title_colum: string;

  @IsNumber({}, {message: 'Must be a number'} )
  userId: number;
 }