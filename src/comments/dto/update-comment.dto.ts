import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateCommentDto {
  @ApiPropertyOptional({
    example: 'Комментарий обновлён',
    description: 'Новый текст комментария',
  })
  @IsOptional()
  @ApiProperty()
  @IsString()
  comment?: string;

}