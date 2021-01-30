
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserNotFoundException, WrongPasswordException } from '../user.error';
import { SignInDto } from '../dto/sign_in.dto';
import { ApiCustomResponse } from 'src/common/decorators/api-custom-response.decorator';
import { TokenService, UserService } from '../services';

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
