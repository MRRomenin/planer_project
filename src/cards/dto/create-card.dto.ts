import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCardDto {
  @ApiProperty({
    example: 'Сделать домашнее задание',
    description: 'Название карточки',
  })
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  title_card: string;

}