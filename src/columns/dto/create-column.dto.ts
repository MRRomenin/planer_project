import { IsString, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateColumnsDto {
  @ApiProperty({
    example: 'Список задач',
    description: 'Заголовок колонки',
  })
  @IsString()
  title_colum: string;

  @ApiProperty({
    example: 1,
    description: 'ID пользователя, которому принадлежит колонка',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  userId: number;
 }