import { PageOutDto } from './../../../common/dto/page_out.dto';
import { User } from 'src/modules/user/entities';
import { MyLogger } from './../../logger/services/logger.service';
import { UserService } from '../services/user.service';
import { Controller, Get, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../dto/sign_in.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '查询全部用户' })
  async getAll() {
    var data = await this.userService.findAll();
    var ss = new PageOutDto<User>();
    ss.total = data.length;
    ss.rows = data;
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
    MyLogger.error('env!!!');
    return process.env.NODE_ENV;
  }
}
