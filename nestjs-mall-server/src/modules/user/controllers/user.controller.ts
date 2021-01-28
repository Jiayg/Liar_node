import { PageOutDto } from './../../../common/dto/page_out.dto';
import { User } from 'src/modules/user/entities';
import { UserService } from '../services/user.service';
import { Controller, Get, HttpCode, HttpStatus, Body, Post, UseGuards, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../dto/sign_in.dto';
import { Logger } from "@nestjs/common";
import { AdminAccessGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiCustomResponse } from 'src/common/decorators/api-custom-response.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger("UserController");
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AdminAccessGuard)
  @Roles('superAdmin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '查询全部用户' })
  // @ApiCustomResponse(ForbiddenException)
  async getAll() {
    return this.userService.findAll();
  }

  @Post('getuser')
  @ApiOperation({ summary: '查询用户' })
  async getUser(@Body() signInDto: SignInDto) {
    return this.userService.findByUserName(signInDto.email);
  }

  @Get('env')
  @ApiOperation({ summary: '当前开发环境' })
  async getc() {
    this.logger.error('error');
    this.logger.log('log');
    this.logger.debug('debug');
    this.logger.warn('warn');
    return process.env.NODE_ENV;
  }
}
