import { Controller, Get, HttpCode, HttpStatus, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../dto/sign_in.dto';
import { Logger } from "@nestjs/common";
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  private readonly logger = new Logger("UserController");
  constructor(private readonly userService: UserService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '查询全部用户' })
  async getAll() {
    return this.userService.findAll();
  }

  @Post('getuser')
  @ApiOperation({ summary: '查询用户' })
  async getUser(@Body() signInDto: SignInDto) {
    return this.userService.findOneByUserName(signInDto.email);
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
