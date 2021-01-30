import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { User } from '../entities';

export class UserTokenDto {
  @ApiProperty({ title: '登录令牌' })
  token: string;

  @ApiProperty({ title: 'refreshtoken' })
  refreshtoken: string;

  @Expose()
  @Type(() => User)
  @ApiProperty()
  user: User;
}
