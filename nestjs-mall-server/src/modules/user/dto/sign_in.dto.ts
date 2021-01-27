import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDto {

  @IsEmail({}, { message: '邮箱格式不正确' })
  @MaxLength(150)
  @ApiProperty({ title: '邮箱' })
  email: string;

  @MinLength(6,{message:'密码长度不能小于6位'})
  @MaxLength(24,{message:'密码长度不能大于24位'})
  @ApiProperty({ title: '密码' })
  password: string;
}
