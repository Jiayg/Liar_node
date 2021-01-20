import { MyLogger } from './../../logger/services/logger.service';
import { UserService } from '../services/user.service';
import { Controller, Get, HttpCode, HttpStatus, LoggerService } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '查询全部用户' })
    async getAll() {
        return this.userService.findAll();
    }

    @Get('env')
    @ApiOperation({ summary: '当前开发环境' })
    async getc() {
        MyLogger.error('env!!!');
        return process.env.NODE_ENV
    }
}
