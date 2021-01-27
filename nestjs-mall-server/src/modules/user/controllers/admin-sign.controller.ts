import { plainToClass } from 'class-transformer';
import { SignInDto } from '../dto/sign_in.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services';
import { UserTokenDto } from '../dto/user-token.dto';
import { UserTokenService } from '../services/user-token.service';
import { ForbiddenException, UserNotFoundException, WrongPasswordException } from '../user.error';
import { ApiCustomResponse } from 'src/common/decorators/api-custom-response.decorator';
import { AdminAccessGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('admin_sign')
@Controller('admin_sign')
export class SignController {
  constructor(
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
  ) { }

  @Post('signin')
  @ApiOperation({ summary: '管理员登录' })
  @ApiCustomResponse(WrongPasswordException)
  @ApiCustomResponse(UserNotFoundException)
  async signIn(@Req() req) {
    const token = await this.userTokenService.create(req.user);
    return plainToClass(UserTokenDto, { token, user: req.user });
  }

  @ApiBearerAuth()
  @UseGuards(AdminAccessGuard)
  @Roles('superAdmin')
  @Get("all-admin")
  @ApiOperation({ summary: '查询所有管理员' })
  @ApiCustomResponse(ForbiddenException)
  async getAll() {
    return await this.userService.findAll();
  }

}
