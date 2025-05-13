import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiPropertyOptional({
    example: 'Обновлённое название задачи',
    description: 'Новое название карточки',
  })
  @IsOptional()
  @ApiProperty()
  @IsString()
  title_card?: string;

}