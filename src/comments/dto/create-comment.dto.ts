import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCommentDto {
  @ApiProperty({
    example: 'Отличная идея!',
    description: 'Текст комментария',
  })
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  comment: string;


}