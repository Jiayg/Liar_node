import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PageInDto {
  @IsNumber()
  @ApiProperty()
  offset: number;

  @IsNumber()
  @ApiProperty()
  limit: number;
}
