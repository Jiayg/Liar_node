
import { ApiCustomResponse } from '@/common/decorators/api-custom-response.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignInDto } from '../dto';
import { TokenService } from '../services';
import {
  UserNotFoundException,
  WrongPasswordException
} from '../user.error';

@ApiTags('管理员')
@Controller('admin_sign')
export class AdminSignController {
  constructor(
    private readonly tokenService: TokenService,
  ) { }

  @Post('signin')
  @ApiOperation({ summary: '管理员登录' })
  @ApiCustomResponse(WrongPasswordException)
  @ApiCustomResponse(UserNotFoundException)
  async signIn(@Body() signInDto: SignInDto) {
    // const token = await this.userService.login(req.user);
    // return plainToClass(UserTokenDto, { token, user: req.user });
    return await this.tokenService.login(signInDto);
  }

}
