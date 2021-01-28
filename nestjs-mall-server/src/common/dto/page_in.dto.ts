import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { InputDto } from './input.dto';

// 分页
export class PageInDto extends InputDto {

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ title: '页码 默认为0' })
  offset?: number = 0;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ title: '条数 默认为10' })
  limit?: number = 10;
}
