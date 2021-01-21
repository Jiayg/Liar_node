import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({ title: '邮箱' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  @ApiProperty({ title: '密码' })
  password: string;
}
