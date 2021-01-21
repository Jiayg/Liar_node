import { plainToClass } from 'class-transformer';
import { SignInDto } from '../dto/sign_in.dto';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../services';
import { UserTokenDto } from '../dto/user-token.dto';
import { UserTokenService } from '../services/user-token.service';

@ApiTags('admin_sign')
@Controller('auth')
export class SignController {
  constructor(
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
  ) {}

  @Post('signin')
  @ApiOperation({ summary: '管理员登录' })
  async signIn(@Req() req, @Body() signInDto: SignInDto) {
    const token = this.userTokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }
}
