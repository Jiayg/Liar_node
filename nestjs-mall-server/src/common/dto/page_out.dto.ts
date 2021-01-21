import { ApiProperty } from '@nestjs/swagger';

export class PageOutDto<T> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  rows: T[];
}
