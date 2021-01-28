import { ApiProperty } from '@nestjs/swagger';

export class PageOutDto {
  @ApiProperty()
  total?: number;

  @ApiProperty()
  rows?: any;
}
